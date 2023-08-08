import { userStore } from './vuex/user';

import { createStore } from 'vuex'

export const vuexStore = createStore({
  modules: {
    userStore
  }
})