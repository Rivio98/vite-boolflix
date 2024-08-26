import { reactive } from 'vue'
import axios from 'axios';

export const store = reactive({
    apiUrlmovie: "https://api.themoviedb.org/3/discover/movie",
    apiUrlseries: "https://api.themoviedb.org/3/discover/tv",
    apiKey: '6a6afbe4a45c3a0d643a9ae389aba2d0',

    async searchMovie(movieName) {
        try {
            const response = await axios.get(`${this.apiUrlmovie}?api_key=${this.apiKey}&query
            = ${movieName}`);
            return response.data.results
        }

        catch (error) {
            console.error("Errore nella ricerca del film:", error);
            return null;
        }

    },
    async searchSeries(seriesName) {
        try {
            const response = await axios.get(`${this.apiUrlseries}?api_key=${this.apiKey}&query
         = ${seriesName}`);
            return response.data.results
        }

        catch (error) {
            console.error("Errore nella ricerca della serie:", error);
            return null;
        }

    }

});
