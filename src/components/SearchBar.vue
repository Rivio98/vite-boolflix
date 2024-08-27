<script>
import { store } from '../store.js';

export default {
    data() {
        return {
            searchQuery: '',
            store
        };
    },

    methods: {
        searchContent() {
            if (this.searchQuery.toLowerCase) {
                store.searchMovie(this.searchQuery)
                    .then(movieResults => {
                        return store.searchSeries(this.searchQuery)
                            .then(seriesResults => {
                                this.store.resultsMovies = [...movieResults];
                                this.store.resultsSeries = [...seriesResults];
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
    </div>
</template>

<style scoped></style>
