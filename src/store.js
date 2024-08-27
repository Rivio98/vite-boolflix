import { reactive } from 'vue';
import axios from 'axios';

export const store = reactive({
    apiUrlmovie: "https://api.themoviedb.org/3/search/movie",
    apiUrlseries: "https://api.themoviedb.org/3/search/tv",
    apiKey: '6a6afbe4a45c3a0d643a9ae389aba2d0',
    resultsMovies: [],
    resultsSeries: [],

    searchMovie(movieName) {
        return axios.get(`${this.apiUrlmovie}?api_key=${this.apiKey}&query=${movieName}`)
            .then(response => {
                return response.data.results;
            })
            .catch(error => {
                console.error("Errore nella ricerca del film:", error);
                return null;
            });
    },

    searchSeries(seriesName) {
        return axios.get(`${this.apiUrlseries}?api_key=${this.apiKey}&query=${seriesName}`)
            .then(response => {
                return response.data.results;
            })
            .catch(error => {
                console.error("Errore nella ricerca della serie:", error);
                return null;
            });
    }
});



