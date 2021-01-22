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
        md="8"
      >
        <h2>Envois des tournois</h2>
        <EventCalendar />
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
      type: 'month',
      weekday: [1, 2, 3, 4, 5, 6, 0],
      events: [
        {
          name: 'test',
          start: '2021-01-26'
        }
      ],
      colors: [
        'blue',
        'indigo',
        'deep-purple',
        'cyan',
        'green',
        'orange',
        'grey darken-1'
      ]
    }
  }
}
</script>
<style>
</style>
