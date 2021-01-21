<template>
  <div>
    <v-data-table :loading="status" :hide-default-header="status" :headers="headers" :items="list" item-key="id">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-btn color="primary" dark class="mb-2" @click="newItem()">New Offer</v-btn>
        </v-toolbar>
      </template>

      <template v-slot:[`item.status`]="{ item }">
        <v-chip color="primary">
          {{statusVal(item.status)}}
        </v-chip>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item.id)">
          mdi-pencil
        </v-icon>
        <v-icon small class="mr-2" @click="dialogDestroyItem(item.id)">
          mdi-delete
        </v-icon>
        <v-btn
          depressed
          color="primary"
          @click="swithStatus(item)">
            {{statusVal(item.status)}}
        </v-btn>

      </template>
    </v-data-table>

    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Exclude item</v-card-title>

        <v-card-text>
          Do you want to exclude this item?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="blue darken-1" text @click="dialog = false">
            No
          </v-btn>

          <v-btn color="primary" @click="destroyItem(itemCurrent)">
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'OffersIndex',
  created() {
    this.index('')
  },
  computed: {
    ...mapGetters({
      list: 'offers/index',
      status: 'offers/status'
    })
  },
  data: () => ({
    dialog: false,
    headers: [
      { text: 'ID', align: 'start', value: 'id' },
      { text: 'Name', value: 'advertiser' },
      { text: 'Url', value: 'url' },
      { text: 'Status', value: 'status' },
      { text: 'Actions', value: 'actions' }
    ]
  }),
  methods: {
    ...mapActions({
      index: 'offers/index',
      unique: 'offers/unique',
      destroy: 'offers/destroy'
    }),
    ...mapMutations({
      statusSet: 'offers/UNIQUE'
    }),
    newItem() {
      this.$router.push('/dashboard/new')
    },
    editItem(id) {
      this.$router.push(`/dashboard/edit/${id}`)
    },
    statusVal(val) {
      return (val == true) ? 'Enable' : 'Disable'
    },
    swithStatus(item) {
      const editedIndex = this.list.indexOf(item)
      const status = !item.status
      const obj = {
        id: editedIndex,
        status: status
      }
      this.unique({ id: item.id, status })
      this.statusSet(obj)
    },
    dialogDestroyItem(id) {
      this.dialog = true
      this.itemCurrent = id
    },
    destroyItem(id) {
      this.dialog = false
      this.destroy(id)
    }
  }
}
</script>
