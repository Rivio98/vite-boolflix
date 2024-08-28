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

<template lang="">
    <div class="search-container justify-content-between">
        <div class="brand-name">
            <h1 class="title">BOOLFLIX</h1>
        </div>
        <div class="search-wrapper">
            <input v-model="searchQuery" placeholder="Cerca un film o una serie..." />
            <button @click="searchContent">Cerca</button>
        </div>
    </div>
</template>

<style scoped>
.search-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    background-color: #111010;
    padding: 20px;
}

.search-wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
}

.search-container input {
    padding: 10px;
    border: 2px solid #444;
    border-radius: 5px;
    background-color: #222;
    color: #fff;
    width: 250px;
}

.search-container button {
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    background-color: #ff5a5f;
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.search-container button:hover {
    background-color: #e03e3e;
}

.brand-name {
    margin-left: 20px;
    font-size: 24px;
    font-weight: bold;
    color: #fff;
}

.title {
    color: red;
}
</style>
