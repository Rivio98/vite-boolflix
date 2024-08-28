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
    <div class="contain">
        <div class="row">
            <div class="col-12">
                <div v-if="store.resultsMovies.length > 0">
                    <h2 class="text-light mt-5">Risultati Film:</h2>
                    <div class="row row-cols-3 justify-content-center">
                        <div v-for="item in store.resultsMovies" :key="item.id" class="card p-0 m-3 movie-card">
                            <img :src="item.poster_path ? `https://image.tmdb.org/t/p/w342/${item.poster_path}` : `https://placehold.co/342x513?text=${item.title}`"
                                class="img-fluid movie-poster">
                            <div class="card-body movie-info">
                                <div class="d-flex">
                                    <h5 class="card-title pe-2">{{ item.title }}</h5>
                                </div>
                                <p v-if="item.original_title !== item.title" class="original-title">
                                    ({{ item.original_title }})</p>
                                <p class="card-text">{{ item.overview }}</p>
                                <div class="rating ">
                                    <span v-for="n in 5" :key="n">
                                        <i :class="getStarClass(item.vote_average, n)"></i>
                                    </span>
                                    <p class="mt-4">Lingua Originale: <span
                                            :class="getFlagClass(item.original_language)"></span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="store.resultsSeries.length > 0">
                <h2 class="text-light mt-5">Risultati Serie TV:</h2>
                <div class="row row-cols-3 justify-content-center">
                    <div v-for="item in store.resultsSeries" :key="item.id" class="card p-0 m-3 movie-card">
                        <img :src="item.poster_path ? `https://image.tmdb.org/t/p/w342/${item.poster_path}` : `https://placehold.co/342x513?text=${item.name}`"
                            class="img-fluid movie-poster">
                        <div class="card-body movie-info">
                            <div class="d-flex">
                                <h5 class="card-title pe-2">{{ item.name }}</h5>
                                <span :class="getFlagClass(item.original_language)"></span>
                            </div>
                            <p v-if="item.original_name !== item.name" class="original-title">
                                ({{ item.original_name }})
                            </p>
                            <p class="card-text">{{ item.overview }}</p>
                            <div class="rating ">
                                <span v-for="n in 5" :key="n">
                                    <i :class="getStarClass(item.vote_average, n)"></i>
                                </span>
                                <p class="mt-4">Lingua Originale: <span
                                        :class="getFlagClass(item.original_language)"></span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.contain {
    margin: 0 auto;
    background-color: #333;
    padding: 20px;
}

.movie-card {
    width: 200px;
    height: 300px;
    position: relative;
    overflow: hidden;
    border-radius: 10px;
    transition: transform 0.3s ease-in-out;
    background-color: #222;
}

.movie-card:hover {
    transform: scale(1.05);
}

.movie-poster {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
}

.movie-info {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    overflow-y: auto;
}

.movie-card:hover .movie-info {
    opacity: 1;
}

.card-title,
.original-title {
    margin-bottom: 5px;
    font-size: 16px;
    text-align: center;
}

.card-text {
    font-size: 14px;
    margin-bottom: 10px;
    text-align: center;
    max-height: 100px;
    overflow-y: auto;
    padding-right: 10px;
}

.card-text::-webkit-scrollbar {
    width: 8px;
}

.card-text::-webkit-scrollbar-track {
    background: #333;
    border-radius: 10px;
}

.card-text::-webkit-scrollbar-thumb {
    background: #666;
    border-radius: 10px;
}

.card-text::-webkit-scrollbar-thumb:hover {
    background: #888;
}

.card-text {
    scrollbar-width: thin;
    scrollbar-color: #666 #333;
}
</style>
