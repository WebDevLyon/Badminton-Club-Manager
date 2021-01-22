<template>
  <v-container>
    <v-select
      :items="listTournois.Retrieved"
      item-text="name"
      item-value="id"
      label="Sélectionner le tournoi"
      @change="checkTournoi"
    />
    <TournoiView :tournoi="this.$store.state.tournoiSelected" />
  </v-container>
</template>

<script>
const axios = require('axios').default

export default {
  middleware: ['auth'],
  asyncData () {
    return axios.get('http://badapi.lani9094.odns.fr/allrecord', {
      params:
    {
      base: 'Tournois'
    }
    }).then((response) => {
      const listTournois = response.data
      return { listTournois }
    })
  },
  data () {
    return {
      HTMLgenere: ''
    }
  },
  methods: {
    checkTournoi (id) {
      this.$store.commit('checkTournoi', id)
      this.$store.dispatch('infoTournoi', id)
    }
  }
}
</script>

<style>

</style>
