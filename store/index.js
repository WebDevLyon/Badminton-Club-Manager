import axios from 'axios'

export const state = () => ({
  idTournoi: 'test',
  tournoiSelected: { Nom: 'Nom du tournoi' }
})

export const mutations = {
  checkTournoi (state, idTournoi) {
    state.idTournoi = idTournoi
  },
  majTournoi (state, info) {
    state.tournoiSelected = info
  }
}

export const actions = {
  infoTournoi (context, id) {
    axios.get('http://localhost:8000/onerecord', {
      params:
  {
    base: 'Tournois',
    id
  }
    }).then((response) => {
      context.commit('majTournoi', response.data.Retrieved)
    })
  }
}
