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
const getStarClass = (voteAverage, starIndex) => {
    const ratingOutOfFive = (voteAverage / 2);
    const fullStars = Math.floor(ratingOutOfFive);

    if (starIndex <= fullStars) {
        return 'bi bi-star-fill text-warning';
    } else {
        return 'bi bi-star';
    }
};

export default {
    data() {
        return {
            store,
            getStarClass
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
    <div v-if="store.resultsMovies.length > 0">
        <h2>Risultati Film:</h2>
        <ul class="list-unstyled">
            <li v-for="item in store.resultsMovies" :key="item.id">
                <img
                    :src="item.poster_path ? `https://image.tmdb.org/t/p/w342/${item.poster_path}` : `https://placehold.co/342x513?text=${item.title}`">

                <h1>{{ item.title }}</h1>
                ({{ item.original_title }}) <span :class="getFlagClass(item.original_language)"></span>
                <div class="rating">
                    <span v-for="n in 5" :key="n">
                        <i :class="getStarClass(item.vote_average, n)"></i>
                    </span>
                </div>
            </li>
        </ul>
    </div>
    <div v-if="store.resultsSeries.length > 0">
        <h2>Risultati delle Serie TV:</h2>
        <ul class="list-unstyled">
            <li v-for="item in store.resultsSeries" :key="item.id">
                <img
                    :src="item.poster_path ? `https://image.tmdb.org/t/p/w342/${item.poster_path}` : `https://placehold.co/342x513?text=${item.name}`">
                <h1>{{ item.name }}</h1>
                ({{ item.original_title }}) <span :class="getFlagClass(item.original_language)"></span>
                <div class="rating">
                    <span v-for="n in 5" :key="n">
                        <i :class="getStarClass(item.vote_average, n)"></i>
                    </span>
                </div>
            </li>
        </ul>
    </div>
</template>

<style lang="">
</style>
