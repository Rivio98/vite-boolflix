<script>
import { store } from '../store.js';

export default {
    data() {
        return {
            searchQuery: '',
            results: []
        };
    },

    methods: {
        async searchContent() {
            if (this.searchQuery.toLowerCase) {
                let movieResults = await store.searchMovie(this.searchQuery)
                let seriesResults = await store.searchSeries(this.searchQuery);
                this.results = [...movieResults, ...seriesResults];
            }
        }
    }
};
</script>

<template>
    <div>
        <input v-model="searchQuery" placeholder="Cerca un film o una serie..." />
        <button @click="searchContent">Cerca</button>

        <div v-if="results.length > 0">
            <h2>Risultati della ricerca:</h2>
            <ul>
                <li v-for="item in results" :key="item.id">
                    {{ item.title || item.name }} ({{ item.media_type }})
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped></style>
