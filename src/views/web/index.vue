<template>
  <v-row>
    <v-col cols="12" md="6" v-for="card in list" :key="card.id">
      <v-card>
        <v-chip class="premium ma-2" color="primary" v-if="card.premium">
          premium
        </v-chip>

        <v-card-title class="d-flex justify-center">
          {{card.advertiser}}
        </v-card-title>

        <v-card-text>
          <div>{{card.description}}</div>
        </v-card-text>

        <v-divider class="mx-4"></v-divider>

        <v-card-actions class="d-flex justify-center">
          <v-btn :color="getColor(card.premium)" @click="reserve(card.url)">
            Shop Now
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'WebIndex',
  created() {
    this.index('?web=true')
  },
  computed: {
    ...mapGetters({
      list: 'offers/index'
    })
  },
  methods: {
    ...mapActions({
      index: 'offers/index'
    }),
    reserve(url) {
      window.open(url, '_blank')
    },
    getColor(premium) {
      return (premium) ? 'green lighten-2' : 'white lighten-2'
    }
  }
}
</script>

<style lang="scss">
  .premium {
    position: absolute;
    top: -15px;
    right: -10px;
    z-index: 99999;
  }
</style>
