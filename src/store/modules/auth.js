import Vue from 'vue'
import router from '@/router'

const state = {
  status: false,
  jwt: null,
  data: {
    dataUser: {
      id: null,
      name: null
    }
  }
}

const getters = {
  status: state => state.status,
  jwt: state => state.jwt,
  data: state => state.data
}

const mutations = {
  STATUS: (state, request) => {
    state.status = request
  },
  JWT: (state, jwt) => {
    state.jwt = jwt
  },
  DATA: (state, data) => {
    state.data = data
  }
}

const actions = {

  // Login
  signIn({ commit }, userInfo) {

    const { email, password } = userInfo

    commit('STATUS', true)

    Vue.axios.post('session', { email, password }).then(response => {

      // jwt
      const { jwt, data } = response.data

      commit('JWT', jwt)
      commit('DATA', data)

      // Mostra o toast de login bem sucedido
      Vue.$toast.success('Login efetuado com sucesso!')

      router.push('/dashboard')

    }).catch(() => {

      // Mostra o toast de senha incorreta
      Vue.$toast.error('Usuário ou senha incorretos.')

    }).finally(() => {

      // Executa ao finalizar as solicitações
      commit('STATUS', false)

    })
  }

}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
