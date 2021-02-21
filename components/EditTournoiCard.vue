<template>
  <v-card>
    <v-card-title class="headline grey lighten-2">
      Modifier un tournoi
    </v-card-title>

    <v-card-text>
      <v-form
        ref="form"
        v-model="valid"
      >
        <h3>Informations générales</h3>
        <v-text-field
          placeholder="Nom du tournoi"
        />

        <div class="row">
          <v-text-field
            class="col-6"
            label="Date du début du tournoi"
            type="date"
          /><v-text-field
            class="col-6"
            label="Date de fin du tournoi"
            type="date"
          />
        </div>
        <v-text-field
          placeholder="Adresse"
        />
        <h3>Catégories jouées</h3>
        <v-simple-table>
          <thead>
            <tr>
              <th>Tableau</th>
              <th>Jour de match</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="serie in series"
              :key="serie.name"
            >
              <td>{{ serie.name }}</td>
              <td>
                <v-select
                  :items="items1"

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
          <v-text-field
            class="col-md-4"
            label="Envoi n°1"
            type="date"
          />
          <v-text-field
            class="col-md-4"
            label="Envoi n°2"
            type="date"
          />
          <v-text-field
            class="col-md-4"
            label="Envoi n°3"
            type="date"
          />
        </div>
      </v-form>
    </v-card-text>

    <v-divider />

    <div class="mx-2 my-3 py-3 text-center text-md-right">
      <v-btn
        class="mr-4"
        @click="emitDialogOpening"
      >
        Retour
      </v-btn>
      <v-btn
        color="warning"
        class="mr-4 my-2"
        @click="reset"
      >
        Reset modifications
      </v-btn>
      <v-btn
        color="success"
        class="mr-4"
        @click="validate"
      >
        Valider
      </v-btn>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'EditTournoiCard',
  data () {
    return {
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
      items: [
        { jour: 'x' },
        { jour: 'x1' },
        { jour: 'x2' }
      ],
      items1: [
        'x', 'x1', 'x2'
      ]
    }
  },
  methods: {
    emitDialogOpening () {
      this.$emit('dialog')
    },
    reset () {
      console.log('reset form')
    },
    validate () {
      console.log('validate form')
    }
  }
}
</script>

<style>

</style>
