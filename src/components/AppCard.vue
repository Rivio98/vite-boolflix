<script>
import { store } from '../store.js';
import "/node_modules/flag-icons/css/flag-icons.min.css";

const languageToCountryMap = {
    en: 'us', // English -> United States
    it: 'it', // Italian -> Italy
    fr: 'fr', // French -> France
    es: 'es', // Spanish -> Spain
    de: 'de', // German -> Germany
    ja: 'jp', // Japanese -> Japan
    zh: 'cn', // Chinese -> China
    ko: 'kr', // Korean -> South Korea
    ru: 'ru', // Russian -> Russia
    pt: 'pt', // Portuguese -> Portugal
    ar: 'sa', // Arabic -> Saudi Arabia
};

export default {
    data() {
        return {
            store,
        };
    },
    methods: {
        getCountryName(countryCode) {
            const country = this.store.countries.find(country => country.alpha2Code === countryCode);
            return country ? country.name : '';
        },
        getFlagClass(languageCode) {
            const countryCode = languageToCountryMap[languageCode] || languageCode;
            return `fi fi-${countryCode}`;
        },
    },
};
</script>

<template>
    <div v-if="store.results.length > 0">
        <h2>Risultati della ricerca:</h2>
        <ul>
            <li v-for="item in store.results" :key="item.id">
                {{ item.title || item.name }} ({{ item.vote_average }})
                ({{ item.original_title }}) <span :class="getFlagClass(item.original_language)"></span>
            </li>
        </ul>
    </div>
</template>

<style lang="">
</style>
