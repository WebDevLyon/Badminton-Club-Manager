<template>
  <v-container>
    <v-card>
      <v-card-title>
        Joueurs du club
        <v-spacer />
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Rechercher"
          single-line
          hide-details
        />
      </v-card-title>
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="desserts"
        item-key="name"
        :items-per-page="15"
        multi-sort
        show-select
        :single-select="singleSelect"
        class="table-players"
        :search="search"
      />
    </v-card>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      singleSelect: false,
      selected: [],
      search: '',
      headers: [
        {
          text: 'Nom Prénom',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        { text: 'En-tete 1', value: 'calories' },
        { text: 'En-tete 2', value: 'fat' },
        { text: 'En-tete 3', value: 'carbs' },
        { text: 'En-tete 4', value: 'protein' },
        { text: 'En-tete 5', value: 'iron' }
      ],
      desserts: [
        {
          name: 'Player 1',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%'
        },
        {
          name: 'Player 2',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%'
        },
        {
          name: 'Player 3',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: '7%'
        }
      ]
    }
  }
}
</script>

<style>

</style>
