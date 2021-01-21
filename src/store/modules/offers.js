import Vue from 'vue'
import router from '@/router'

const state = {
  status: false,
  index: [],
  offer: {
    advertiser: '',
    url: '',
    description: '',
    starts: '',
    ends: '',
    premium: false
  }
}

const getters = {
  status: state => state.status,
  index: state => state.index,
  advertiser: state => state.offer.advertiser,
  url: state => state.offer.url,
  description: state => state.offer.description,
  starts: state => state.offer.starts,
  ends: state => state.offer.ends,
  premium: state => state.offer.premium
}

const mutations = {
  STATUS: (state, request) => {
    state.status = request
  },
  INDEX: (state, request) => {
    state.index = request
  },
  UNIQUE: (state, request) => {
    state.index[request.id].status = request.status
  },
  DATA: (state, request) => {
    state.offer = request
  },
  advertiser: (state, request) => {
    state.offer.advertiser = request
  },
  url: (state, request) => {
    state.offer.url = request
  },
  description: (state, request) => {
    state.offer.description = request
  },
  startsAt: (state, request) => {
    state.offer.starts = request
  },
  endAt: (state, request) => {
    state.offer.ends = request
  },
  premium: (state, request) => {
    state.offer.premium = request
  }
}

const actions = {

  index({ commit }, payload) {
    commit('STATUS', true)

    Vue.axios.get(`offers${payload}`).then(response => {
      commit('INDEX', response.data)
    }).catch(() => {
      Vue.$toast.error('Error when listing the pages')
    }).finally(() => {
      // Executa ao finalizar as solicitações
      commit('STATUS', false)
    })
  },

  store(context, payload) {
    Vue.axios.post('offers', payload).then(() => {
      router.push('/dashboard/')
      Vue.$toast.success('Content created successfully')
    })
  },

  show({ commit }, id) {
    commit('STATUS', true)

    Vue.axios.get(`offers/${id}`).then(response => {
      commit('DATA', response.data)
      commit('STATUS', false)
    })
  },

  update({ commit }, payload) {
    const { id } = payload

    Vue.axios.put(`offers/${id}`, payload).then(response => {
      commit('DATA', response.data)
      router.push('/dashboard/')
      Vue.$toast.success('Content updated successfully')
    })
  },

  unique({ commit }, payload) {
    console.log(payload)
    const { id } = payload

    commit('STATUS', true)

    Vue.axios.put(`offers/${id}`, payload).then(() => {
      commit('STATUS', false)
    })
  },

  destroy({ dispatch, commit }, id) {
    Vue.axios.delete(`offers/${id}`)
    commit('STATUS', true)

    setTimeout(() => {
      Vue.$toast.success('Content deleted successfully')
      dispatch('index')
      commit('STATUS', false)
    }, 750)
  }

}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
