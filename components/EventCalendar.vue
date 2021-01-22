<template>
  <div>
    <v-sheet
      tile
      height="54"
      class="d-flex"
    >
      <v-btn
        icon
        class="ma-2"
        @click="prev"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>

      <v-btn
        outlined
        class="mr-4"
        color="grey darken-2"
        @click="setToday"
      >
        Today
      </v-btn>
      <v-toolbar-title v-if="$refs.calendar">
        {{ $refs.calendar.title }}
      </v-toolbar-title>

      <v-spacer />
      <v-btn
        icon
        class="ma-2"
        @click="next"
      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-sheet>
    <v-calendar
      ref="calendar"
      v-model="focus"
      :type="type"
      :events="this.$store.state.events"
      event-overlap-mode="stack"
      event-overlap-threshold="30"
      :weekdays="weekday"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      focus: '',
      value: '',
      type: 'month',
      weekday: [1, 2, 3, 4, 5, 6, 0],
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1']
    }
  },
  methods: {
    setToday () {
      this.focus = ''
    },
    prev () {
      this.$refs.calendar.prev()
    },
    next () {
      this.$refs.calendar.next()
    }
  }
}
</script>

<style>

</style>
