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
        <div v-for="item in store.resultsMovies" :key="item.id" class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img :src="item.poster_path ? `https://image.tmdb.org/t/p/w342/${item.poster_path}` : `https://placehold.co/342x513?text=${item.title}`"
                        class="img-fluid rounded-start">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">{{ item.title }}</h5> ({{ item.original_title }}) <span
                            :class="getFlagClass(item.original_language)"></span>
                        <p class="card-text">{{ item.overview }}</p>
                        <span v-for="n in 5" :key="n">
                            <i :class="getStarClass(item.vote_average, n)"></i>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-if="store.resultsSeries.length > 0">
        <h2>Risultati Serie TV:</h2>
        <div v-for="item in store.resultsSeries" :key="item.id" class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img :src="item.poster_path ? `https://image.tmdb.org/t/p/w342/${item.poster_path}` : `https://placehold.co/342x513?text=${item.name}`"
                        class="img-fluid rounded-start">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">{{ item.name }}</h5> ({{ item.original_title }}) <span
                            :class="getFlagClass(item.original_language)"></span>
                        <p class="card-text">{{ item.overview }}</p>
                        <span v-for="n in 5" :key="n">
                            <i :class="getStarClass(item.vote_average, n)"></i>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="">
</style>
