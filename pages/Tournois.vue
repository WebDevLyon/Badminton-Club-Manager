<template>
  <v-container>
    <v-select
      :items="this.$store.state.events"
      item-text="name"
      item-value="id"
      label="Sélectionner le tournoi"
      @change="checkTournoi"
    />
    <TournoiView :tournoi="this.$store.state.tournoiSelected" />
  </v-container>
</template>

<script>
export default {
  middleware: ['auth'],
  props: {
    // defaultSelected: { type: Object, default () { return {} } }
  },
  data () {
    return {
      HTMLgenere: ''
    }
  },
  beforeMount () {
    this.$store.commit('checkTournoi', this.$route.params.id)
    this.$store.dispatch('infoTournoi', this.$route.params.id)
  },
  beforeRouteLeave (to, from, next) {
    this.$destroy()
    next()
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
