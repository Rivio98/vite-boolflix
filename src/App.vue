<script>
import axios from 'axios';
import AppHeader from './components/AppHeader.vue';
import AppMain from './components/AppMain.vue';
import SearchBar from './components/SearchBar.vue';
import { store } from './store.js';

export default {
  data() {
    return {
      store,
      axios
    }
  },
  components: {
    AppHeader,
    AppMain,
    SearchBar
  },
  created() {
  },
  methods: {

  }
}
</script>

<template>
  <SearchBar />
</template>

<style lang="scss">
@use './style/generals.scss'
</style>
