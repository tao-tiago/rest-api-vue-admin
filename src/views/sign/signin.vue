<template>
  <v-card>
    <v-toolbar color="primary" dark flat>
      <v-toolbar-title>Login</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-card-text class="pb-0">
        <v-text-field v-model="email" :disabled="status" type="email" label="E-mail" prepend-inner-icon="mdi-email" outlined />
        <v-text-field v-model="password" :disabled="status" type="password" label="Password" prepend-inner-icon="mdi-lock" outlined />
    </v-card-text>

    <div class="actions">
      <v-btn v-on:click="submit" :loading="status" :disabled="status" min-height="48px" color="primary" block>Login</v-btn>
    </div>
  </v-card>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Login',
  data: () => ({
    email: '',
    password: ''
  }),
  computed: {
    ...mapGetters({
      status: 'auth/status'
    })
  },
  methods: {
    ...mapActions({
      signin: 'auth/signIn'
    }),
    submit() {
      const { email, password } = this

      if (email == '' || password == '') {
        Vue.$toast.error('Preencha todos os campos')
      } else {
        this.email = ''
        this.password = ''
        this.signin({ email, password })
      }
    }
  }
}
</script>

<style lang="scss">
  .actions{
    padding: 0 15px 25px;

    .link{
      text-align: center;
      padding-top: 15px;

      a{
        font-size: 15px;
        color: #383838;
        opacity: 0.8;

        &:hover {
          opacity: 1;
        }
      }

    }
  }
</style>
