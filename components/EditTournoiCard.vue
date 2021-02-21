<template>
  <v-card class="mod-tournoi-modal">
    <v-card-title class="headline grey lighten-2">
      Modifier le tournoi : {{ this.$store.state.tournoiSelected.Nom }}
    </v-card-title>

    <v-card-text class="pt-2">
      <v-form ref="form" v-model="valid">
        <h3>Informations générales</h3>
        <v-text-field id="Nom" placeholder="Nom du tournoi" />

        <div class="row">
          <v-text-field
            id="Date_debut"
            class="col-6"
            label="Date du début du tournoi"
            type="date"
          /><v-text-field
            id="Date_Fin"
            class="col-6"
            label="Date de fin du tournoi"
            type="date"
          />
        </div>
        <v-text-field id="Adresse" placeholder="Adresse" />
        <h3>Catégories jouées</h3>
        <v-simple-table>
          <thead>
            <tr>
              <th>Tableau</th>
              <th>Jour de match</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="serie in series" :key="serie.name">
              <td>{{ serie.name }}</td>
              <td>
                <v-select
                  :items="joursSemaine"
                  return-object
                  single-line
                  persistent-hint
                />
              </td>
            </tr>
          </tbody>
        </v-simple-table>
        <h3>Envoi des inscriptions</h3>
        <div class="row mt-4">
          <v-text-field id="Envoi_1" class="col-md-4" label="Envoi n°1" type="date" />
          <v-text-field id="Envoi_2" class="col-md-4" label="Envoi n°2" type="date" />
          <v-text-field id="Envoi_3" class="col-md-4" label="Envoi n°3" type="date" />
        </div>
      </v-form>
    </v-card-text>

    <v-divider />

    <div class="mx-2 my-3 py-3 text-center text-md-right">
      <v-btn class="mr-4" @click="emitDialogOpening">
        Retour
      </v-btn>
      <v-btn color="warning" class="mr-4 my-2" @click="reset">
        Reset modifications
      </v-btn>
      <v-btn color="success" class="mr-4" @click="validate">
        Valider
      </v-btn>
      <div id="responseServer" class="text-center">
        {{ responseServer }}
      </div>
    </div>
  </v-card>
</template>

<script>
const axios = require('axios').default

export default {
  name: 'EditTournoiCard',
  props: {
    tournoi: { type: Object, default () { return {} } }
  },
  data () {
    return {
      responseServer: '',
      valid: true,
      series: [
        {
          name: 'Simples'
        },
        {
          name: 'Doubles'
        },
        {
          name: 'Doubles Mixtes'
        }
      ],
      joursSemaine: [
        'Samedi',
        'Dimache',
        'Lundi',
        'Mardi',
        'Mercredi',
        'Jeudi',
        'Vendredi'
      ]
    }
  },
  methods: {
    emitDialogOpening () {
      this.$emit('dialog')
    },
    reset () {
      this.$refs.form.reset()
    },
    validate () {
      let formEmpty = true
      const inputsUser = this.$refs.form.$el
      // Vérification que le formulaire ne soit pas vide
      inputsUser.forEach((input) => {
        if (input._value) {
          console.log(input._value)
          formEmpty = false
        }
      })
      /*
      TODO: Validation des données à faire
      */
      // Si le formulaire n'est pas vide
      if (!formEmpty) {
        /*
       TODO: Recupérer l'id du tournoi à modifier et les infos qui ne sont pas vide des imputs
      */
        const dataSend = { id: this.$store.state.idTournoi, data: {} }
        /*
      TODO: Récupéré les value des inputs non vide
      */
        const test = document.querySelectorAll('.mod-tournoi-modal input')
        test.forEach((e) => {
          if (e.value) {
            dataSend.data.[e.getAttribute('id')] = e.value
          }
        })
        console.log('validate form', dataSend)
        axios.put('http://localhost:8000/tournoi', dataSend)
          .then((response) => {
            document.getElementById('responseServer').classList.remove('red--text')
            document.getElementById('responseServer').classList.add('green--text')
            this.responseServer = response
          })
          .catch(err => console.log(err))
      } else {
        document.getElementById('responseServer').classList.remove('green--text')
        document.getElementById('responseServer').classList.add('red--text')
        this.responseServer = 'Aucune modification n\'a été demandée'
      }
    }
  }
}
</script>

<style>
</style>
