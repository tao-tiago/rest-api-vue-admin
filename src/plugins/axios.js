'use strict'

import Vue from 'vue'
import axios from 'axios'
import store from '@/store'

const URL_API = (process.env.NODE_ENV === 'production')
  ? 'https://lemoney-api.bindigital.com.br'
  : 'http://localhost:3333'

const config = {
  baseURL: URL_API,
  timeout: 60 * 1000
}

const _axios = axios.create(config)

_axios.interceptors.request.use(
  async config => {
    const jwt = store.getters['auth/jwt']

    if (jwt) {

      config.headers = {
        'Authorization': `Bearer ${jwt.token}`
      }

    }

    return config
  },
  error => {
    Promise.reject(error)
  }
)

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {

    return response
  },
  function(error) {

    const {
      // config,
      response: { status, data }
    } = error

    if (status === 401 && data.message === 'token-invalid') {

      store.dispatch('auth/refreshToken')

    }

    return Promise.reject(error)
  }
)

Plugin.install = function(Vue) {
  Vue.axios = _axios
  window.axios = _axios
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios
      }
    },
    $axios: {
      get() {
        return _axios
      }
    }
  })
}

Vue.use(Plugin)

export default Plugin
