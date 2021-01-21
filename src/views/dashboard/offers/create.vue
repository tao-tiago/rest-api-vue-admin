<template>
  <v-row>
    <v-col cols="8">
      <v-card class="mx-auto">
        <v-card-title class="mb-1">
          <v-text-field v-model="advertiser" label="Advertiser Name" :rules="[rules.required]" />
        </v-card-title>

        <v-card-subtitle class="mb-1">
          <v-text-field v-model="url" label="URL" :rules="[rules.required]" />
        </v-card-subtitle>

        <v-card-text class="mb-1">
          <p>Description</p>
          <v-textarea
            v-model="description"
            counter="500"
            maxlength = "500"
            :rules="[rules.required]"></v-textarea>
        </v-card-text>

        <v-card-subtitle class="mb-1">

          <v-menu
            v-model="menuStart"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="startsAt"
                label="Start At"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                :rules="[rules.required]"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="startsAt"
              @input="menuStart = false"
            ></v-date-picker>
          </v-menu>

        </v-card-subtitle>

        <v-card-subtitle class="mb-1">

          <v-menu
            v-model="menuEnd"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="endAt"
                label="End At"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="endAt"
              @input="menuEnd = false"
            ></v-date-picker>
          </v-menu>

        </v-card-subtitle>

        <v-card-subtitle class="mb-1">
          <v-switch v-model="switched" flat label="Premium"></v-switch>
        </v-card-subtitle>
      </v-card>
    </v-col>

    <v-col cols="4">

      <v-card class="mx-auto">
        <v-card-text class="mb-1">

          <v-card-actions>
            <v-btn color="primary" @click="publish()">
              Publish
            </v-btn>
          </v-card-actions>

        </v-card-text>
      </v-card>

    </v-col>
  </v-row>
</template>

<script>
import Vue from 'vue'
import { mapActions } from 'vuex'

const slugify = require('slugify')

export default {
  name: 'PagePublishItem',
  data: () => ({
    advertiser: '',
    url: '',
    description: '',
    startsAt: '',
    endAt: '',
    switched: false,
    rules: {
      required: v => !!v || 'This field is required'
    },
    menuStart: false,
    menuEnd: false
  }),
  watch: {
    advertiser(val) {
      this.advertiser = slugify(val, {
        replacement: '-',
        lower: true
      })
    }
  },
  methods: {
    ...mapActions({
      store: 'offers/store'
    }),
    urlVerify(url) {
      const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i') // fragment locator

      return !!pattern.test(url)
    },
    publish() {
      const advertiser = this.advertiser
      const url = this.url
      const description = this.description
      const starts = this.startsAt
      const ends = this.startsEnd
      const premium = this.switched

      if (!this.urlVerify(url)) {
        Vue.$toast.error('Insert a valid URL!')
        return
      }

      if (advertiser.length > 0 && url.length > 0 && description.length > 0 && starts.length > 0) {
        this.store({ advertiser, url, description, starts, ends, premium })
      } else {
        Vue.$toast.error('Error when saving. Verify all fields!')
      }
    }
  }
}
</script>
