<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        md="8"
      >
        <v-row>
          <v-col
            cols="12"
            md="4"
          >
            <BlokSmall />
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <BlokSmall />
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <BlokSmall />
          </v-col>
        </v-row>
      </v-col>
      <v-col
        cols="12"
        md="4"
      >
        <BlokSmall />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        md="12"
      >
        <h2>Envois des tournois</h2>
        <EventCalendar />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        md="8"
      >
        <v-row>
          <v-col
            cols="12"
            md="8"
          >
            <BlokSmall />
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <BlokSmall />
          </v-col>
        </v-row>
      </v-col>
      <v-col
        cols="12"
        md="4"
      >
        <BlokSmall />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  auth: false,
  data () {
    return {
    }
  }
}
</script>
<style>
</style>
