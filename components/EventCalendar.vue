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
      :events="this.$store.state.eventsAndSending"
      event-overlap-mode="stack"
      event-overlap-threshold="30"
      :weekdays="weekday"
      @click:event="showEvent"
    />
    <v-menu
      v-model="selectedOpen"
      :close-on-content-click="false"
      :activator="selectedElement"
      offset-x
    >
      <v-card
        color="grey lighten-4"
        min-width="350px"
        flat
      >
        <v-toolbar
          :color="selectedEvent.color"
          dark
        >
          <v-btn v-if="!selectedEvent.envoi" icon>
            <NuxtLink class="text-decoration-none white--text" :to="{name:'Tournois', params:{id:selectedEvent.id}}">
              <v-icon>
                mdi-pencil
              </v-icon>
            </NuxtLink>
          </v-btn>
          <v-toolbar-title v-html="selectedEvent.name" />
          <v-spacer />
        </v-toolbar>
        <v-card-text>
          <div class="mb-3">
            <span v-if="!selectedEvent.envoi">Du </span><span v-if="selectedEvent.start">{{ selectedEvent.start }}</span><span v-if="selectedEvent.end"> au {{ selectedEvent.end }}</span>
          </div>
          <div v-if="selectedEvent.envoi">
            <p>
              Lien Badiste : <a v-if="selectedEvent.linkBadiste" :href="selectedEvent.linkBadiste" target="_blank">{{ selectedEvent.linkBadiste }}</a><strong v-else class="red--text">Non communiqué</strong>
            </p>
            <p>
              Etablir le chèque à l'ordre de : <strong v-if="selectedEvent.order">{{ selectedEvent.order }}</strong><strong v-else class="red--text">Non communiqué</strong>
            </p>
            <p>
              Envoyer l'inscription à : <strong v-if="selectedEvent.contact">{{ selectedEvent.contact }}</strong><strong v-else class="red--text">Non communiqué</strong>
            </p>
          </div>
          <div v-else>
            <p>
              Lien Badiste : <a v-if="selectedEvent.linkBadiste" :href="selectedEvent.linkBadiste" target="_blank">{{ selectedEvent.linkBadiste }}</a><strong v-else class="red--text">Non communiqué</strong>
            </p>
            <p>
              Adresse du tournoi : <a v-if="selectedEvent.adresse" :href="'https://www.google.com/maps/dir/'+selectedEvent.adresse">{{ selectedEvent.adresse }}</a><strong v-else class="red--text">Non communiqué</strong>
            </p>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn
            text
            color="secondary"
            @click="selectedOpen = false"
          >
            Cancel
          </v-btn>
          <v-spacer />
          <v-btn
            v-if="selectedEvent.envoi"
            text
            color="green"
            @click="sendDone"
          >
            FAIT
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
const axios = require('axios').default

export default {
  data () {
    return {
      focus: '',
      value: '',
      type: 'month',
      weekday: [1, 2, 3, 4, 5, 6, 0],
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false
    }
  },
  methods: {
    sendDone () {
      // Création de la propriété de l'objet à envoyer
      let proprieteObject = ''
      const decomposition = this.selectedEvent.name.split(' ')
      for (let i = 0; i < 2; i++) {
        proprieteObject += decomposition[i] + '_'
      }
      proprieteObject += 'Fait'
      const dataSend = {
        id: this.selectedEvent.id,
        data: {
        // dataSend.data.[e.getAttribute('id')]
          [proprieteObject]: true
        }
      }
      console.log(dataSend)
      axios.put('http://localhost:8000/tournoi', dataSend)
        .then((response) => {
          console.log(response)
        })
        .catch(err => console.log(err))
      document.location.reload()
    },
    setToday () {
      this.focus = ''
    },
    prev () {
      this.$refs.calendar.prev()
    },
    next () {
      this.$refs.calendar.next()
    },
    showEvent ({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        setTimeout(() => {
          this.selectedOpen = true
        }, 10)
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        setTimeout(open, 10)
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    }
  }
}
</script>

<style>

</style>
