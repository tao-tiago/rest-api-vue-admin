<template>
  <v-main>

    <!-- Barra no Topo -->
    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" dark>

      <v-spacer></v-spacer>

      <div text-h6>
        {{user.dataUser.name}}
      </div>

      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>

    </v-app-bar>

    <!-- Container Princial -->
    <v-container class="custom-body">

      <!-- Sidebar -->
      <v-navigation-drawer v-model="statusbar" :clipped="$vuetify.breakpoint.lgAndUp" app>

        <v-list dense>
          <template v-for="item in items">

            <router-link :key="item.text" :to="item.to" style="text-decoration: none">
              <v-list-item link>

                <v-list-item-action>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-action>

                <v-list-item-content>
                  <v-list-item-title>
                    {{ item.text }}
                  </v-list-item-title>
                </v-list-item-content>

              </v-list-item>
            </router-link>

          </template>
        </v-list>

      </v-navigation-drawer>

      <!-- Conteúdo Dinâmico -->
      <router-view />

    </v-container>

  </v-main>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters({
      user: 'auth/data'
    })
  },
  data: () => ({
    statusbar: false,
    items: []
  })
}
</script>

<style>
.custom-body{
  background: #f5f6f8;
  height: 100%;
}
</style>
