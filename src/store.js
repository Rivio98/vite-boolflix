import { reactive } from 'vue'

export const store = reactive({
    apiUrlmovie: "https://api.themoviedb.org/3/discover/movie",
    apiUrlseries: "https://api.themoviedb.org/3/discover/tv"
});
