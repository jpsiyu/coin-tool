import Vue from 'vue'
import axios from 'axios'

const instance = axios.create({})
instance.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    switch (error.response.status) {
    }
  })

Vue.prototype.$axios = instance