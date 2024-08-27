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
        searchContent() {
            if (this.searchQuery.toLowerCase) {
                store.searchMovie(this.searchQuery)
                    .then(movieResults => {
                        return store.searchSeries(this.searchQuery)
                            .then(seriesResults => {
                                this.results = [...movieResults, ...seriesResults];
                            });
                    })
                    .catch(error => {
                        console.error("Errore nella ricerca:", error);
                    });
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
                    {{ item.title || item.name }} ({{ item.vote_average }})
                    ({{ item.original_title }}) ({{ item.original_language }})
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped></style>
