<template>
  <v-card>
    <v-card-title>
      {{ tournoi.Nom }}
      <v-spacer />
      <v-dialog
        v-if="tournoi.Nom"
        v-model="dialog"
        width="1500"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            v-bind="attrs"
            v-on="on"
          >
            mdi-pencil
          </v-icon>
        </template>
        <EditTournoiCard :tournoi="tournoi" @dialog="test" />
      </v-dialog>
    </v-card-title>
    <v-card-subtitle>
      Du {{ tournoi.Date_debut }} au {{ tournoi.Date_Fin }}
    </v-card-subtitle>
    <v-card-text class="card-text">
      <div>Date limite d'inscription : {{ tournoi.Date_limite_inscription }}</div>
      <div>
        <p
          class="text-center"
        >
          Dates des envois
        </p>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-center">
                  Envoi 1
                </th>

                <th class="text-center">
                  Envoi 2
                </th>

                <th class="text-center">
                  Envoi 3
                </th>
              </tr>
            </thead>
            <tbody>
              <td class="text-center">
                <span v-if="tournoi.Envoi_1_Fait===true" class="text-decoration-line-through">{{ tournoi.Envoi_1 }}</span>
                <span v-else-if="new Date(tournoi.Envoi_1)<new Date()" class="red--text">{{ tournoi.Envoi_1 }}</span>
                <span v-else>{{ tournoi.Envoi_1 }}</span>
              </td>
              <td class="text-center">
                <span v-if="new Date(tournoi.Envoi_2)<new Date()" class="red--text">{{ tournoi.Envoi_2 }}</span>
                <span v-else>{{ tournoi.Envoi_2 }}</span>
              </td>
              <td class="text-center">
                <span v-if="new Date(tournoi.Envoi_3)<new Date()" class="red--text">{{ tournoi.Envoi_3 }}</span>
                <span v-else>{{ tournoi.Envoi_3 }}</span>
              </td>
            </tbody>
          </template>
        </v-simple-table>
        <p class="legende">
          Légende : <span class="text-decoration-line-through">date barrée</span> => Envoi effectué  /  <span class="red--text">date rouge</span> => envoi en retard
        </p>
      </div>
      <div>
        Adresse : <br>
        {{ tournoi.Adresse }}
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="genHTML">
        Générer HTML/CSS
      </v-btn>
      <v-btn v-if="HTMLgenere" @click="copyClipboard">
        Copier le code
      </v-btn>
    </v-card-actions>
    <Result><div v-html="HTMLgenere" /></Result>
  </v-card>
</template>

<script>
export default {
  props: {
    tournoi: { type: Object, default () { return {} } }
  },
  data () {
    return {
      HTMLgenere: '',
      dialog: false
    }
  },
  methods: {
    test () {
      this.dialog = false
    },
    // !A refactorer
    genHTML () {
      // Controle qu'au moins un tournois a été sélectionné
      if (this.$store.state.tournoiSelected.Nom === 'Nom du tournoi') {
        alert('Sélectionnez un tournoi')
      } else {
      // Controle des valeurs pouvant être null pour ne pas bloquer le code
      // Initialisation des valeurs de des envois
        const envois = {
          envoi1: this.$store.state.tournoiSelected.Envoi_1 ? this.$store.state.tournoiSelected.Envoi_1 : '',
          envoi2: this.$store.state.tournoiSelected.Envoi_2 ? this.$store.state.tournoiSelected.Envoi_2 : '',
          envoi3: this.$store.state.tournoiSelected.Envoi_3 ? this.$store.state.tournoiSelected.Envoi_3 : ''
        }
        for (const valeur in envois) {
          if (envois[valeur] == null) {
            envois[valeur] = 'pas d\'envoi'
          }
        }
        const infoTournoi = {
          nom: this.$store.state.tournoiSelected.Nom,
          lien: this.$store.state.tournoiSelected.Lien_Badiste,
          date: {
            dateD:
          this.$store.state.tournoiSelected.Date_debut ? this.$store.state.tournoiSelected.Date_debut.split('-')[2] : '',
            dateF:
            this.$store.state.tournoiSelected.Date_Fin ? this.$store.state.tournoiSelected.Date_Fin.split('-')[2] : ''
          },
          // TODO: ajouter le mois
          //! Attention au changement de mois => function à faire
          envoi1: envois.envoi1.split('-').reverse().join('-'),
          envoi2: envois.envoi2.split('-').reverse().join('-'),
          envoi3: envois.envoi3.split('-').reverse().join('-'),
          infoSup: this.$store.state.tournoiSelected.infoSup
        // TODO:Mise en forme par une function
        }
        const htmlcss = {
          h3: '<h3>',
          h3End: '</h3>',
          a: '<a href="',
          aStyle:
          ' style="color: #a500a8; font-weight: bold; text-decoration: underline; font-size: 18px;">',
          aEnd: '</a>',
          table:
          '<table style="border-collapse: collapse; width: 313px; font-size: 13px;"><tbody>',
          tableFin: '</tbody></table>',
          tableL1:
          '<tr><td style="border: 1px dashed black; font-family: Arial; color: #f98714; padding: 3px;">1er envoi :</td><td style="border: 1px dashed black; font-family: Arial; color: #f98714; padding: 3px;">',
          tableL2:
          '</td></tr><tr><td style="border: 1px dashed black; font-family: Arial; color: #f98714; padding: 3px;">2eme envoi :</td><td style="border: 1px dashed black; font-family: Arial; color: #f98714; padding: 3px;">',
          tableL3:
          '</td></tr><tr><td style="border: 1px dashed black; font-family: Arial; color: #f98714; padding: 3px;">3eme envoi :</td><td style="border: 1px dashed black; font-family: Arial; color: #f98714; padding: 3px;">',
          finLigne: '</td></tr>',
          divInfo:
          '<div style="color: #737373; font-family: "Trebuchet MS"; font-size: 13px; font-style: italic;"><p>Type de tournoi : <span style="font-weight: 700; color: #000000;">',
          divInfoSuite:
          '</span></p><p>L\'info en + : <span style="font-weight: 700; color: #000000;">',
          divInfoEnd: '</span></p></div><hr />'
        }
        this.HTMLgenere =
        htmlcss.h3 +
        htmlcss.a +
        infoTournoi.lien +
        '"' +
        htmlcss.aStyle +
        'du ' + infoTournoi.date.dateD + ' au ' + infoTournoi.date.dateF +
        ': ' +
        infoTournoi.nom +
        htmlcss.aEnd +
        htmlcss.h3End +
        "<!-- Date d'envoi -->" +
        htmlcss.table +
        htmlcss.tableL1 +
        infoTournoi.envoi1 +
        htmlcss.finLigne +
        htmlcss.tableL2 +
        infoTournoi.envoi2 +
        htmlcss.finLigne +
        htmlcss.tableL3 +
        infoTournoi.envoi3 +
        htmlcss.finLigne +
        htmlcss.tableFin +
        htmlcss.divInfo +
        // TODO: Function permettant de fiabiliser cela à créer
        'Simples / Mixtes / Doubles ?' +
        htmlcss.divInfoSuite +
        infoTournoi.infoSup +
        htmlcss.divInfoEnd
      }
    },
    copyClipboard () {
      const searchTerm = this.tournoi.Nom
      if (!this.HTMLgenere.includes(searchTerm)) {
        alert('Veuillez générer le code HTML avant de copier')
      } else if (this.HTMLgenere) {
        navigator.clipboard.writeText(this.HTMLgenere).then(function () {
          /* presse-papiers modifié avec succès */
        }, function () {
          /* échec de l’écriture dans le presse-papiers */
        })
      } else {
        alert('Un problème est survenu')
      }
    }
  }
}
</script>

<style lang='scss'>
.card-text{
  & div{
    margin : 0 0 1rem 0;
  }
}
.legende{
  margin: 2rem 0 0 0;
  font-weight: bold;
}
</style>
