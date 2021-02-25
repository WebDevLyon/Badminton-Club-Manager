import axios from 'axios'

export const state = () => ({
  idTournoi: 'test',
  tournoiSelected: { },
  events: [],
  eventsAndSending: []
})

export const mutations = {
  checkTournoi (state, idTournoi) {
    state.idTournoi = idTournoi
  },
  majTournoi (state, info) {
    state.tournoiSelected = info
  },
  setEvents (state, events) {
    state.events = events
  },
  AddEnvois (state) {
    state.events.forEach((event) => {
      if (event.Envoi_1 /* && !event.Envoi_1_Fait */) {
        const envoi = {
          id: event.id,
          envoi: true,
          name: `Envoi 1 : ${event.name}`,
          start: event.Envoi_1 ? event.Envoi_1 : '2021-01-01',
          color: 'green',
          linkBadiste: event.linkBadiste,
          order: event.order,
          contact: '',
          fait: event.Envoi_1_Fait
        }
        state.eventsAndSending.push(envoi)
      }
      if (event.Envoi_2 && !event.Envoi_2_Fait) {
        const envoi = {
          id: event.id,
          envoi: true,
          name: `Envoi 2 : ${event.name}`,
          start: event.Envoi_2 ? event.Envoi_2 : '2021-01-01',
          color: '#00796B',
          linkBadiste: event.linkBadiste,
          order: event.order,
          contact: ''
        }
        state.eventsAndSending.push(envoi)
      }
      if (event.Envoi_3 && !event.Envoi_3_Fait) {
        const envoi = {
          id: event.id,
          envoi: true,
          name: `Envoi 3 : ${event.name}`,
          start: event.Envoi_3 ? event.Envoi_3 : '2021-01-01',
          color: 'orange',
          linkBadiste: event.linkBadiste,
          order: event.order,
          contact: ''
        }
        state.eventsAndSending.push(envoi)
      }
    })
    state.events.forEach((event) => {
      state.eventsAndSending.push(event)
    })
  }
}

export const actions = {
  infoTournoi (context, id) {
    axios.get(// 'http://badapi.lani9094.odns.fr/onerecord',
      'http://localhost:8000/onerecord',
      {
        params:
  {
    base: 'Tournois',
    id
  }
      }).then((response) => {
      context.commit('majTournoi', response.data.Retrieved)
    })
  },
  setEvents  (context) {
    axios.get(// 'http://badapi.lani9094.odns.fr/allrecord',
      'http://localhost:8000/allrecord',
      {
        params:
    {
      base: 'Tournois'
    }
      }).then((response) => {
      context.commit('setEvents', response.data.Retrieved)
      context.commit('AddEnvois')
    })
  }
}
