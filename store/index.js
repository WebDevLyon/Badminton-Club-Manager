import axios from 'axios'

export const state = () => ({
  idTournoi: 'test',
  tournoiSelected: { Nom: 'Nom du tournoi' },
  events: [{
    name: 'Date test => erreur chargement',
    start: new Date()
  }]
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
  }
}

export const actions = {
  infoTournoi (context, id) {
    axios.get('http://badapi.lani9094.odns.fr/onerecord', {
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
    axios.get('http://badapi.lani9094.odns.fr/allrecord', {
      params:
    {
      base: 'Tournois'
    }
    }).then((response) => {
      context.commit('setEvents', response.data.Retrieved)
    })
  }
}
