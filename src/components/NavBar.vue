<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import type { UserInfo } from '@/constants/types'
import { useCartStore } from '@/stores/cart'
const vuexStore = useStore()

const userInfo = computed<UserInfo>(() => {
  return JSON.parse(vuexStore.state.userStore.user)
})

const handleLogout = () => {
  vuexStore.dispatch('handleLogout')
}
const cartStore = useCartStore()
</script>

<template>
  <v-app-bar color="primary" prominent>
    <v-container fluid>
      <div class="d-flex align-center justify-space-between w-100">
        <div class="d-flex align-center">
          <RouterLink class="d-flex align-center text-white" to="/">
            <v-icon icon="$vuetify"></v-icon>
            <div class="text-h5 mr-5">Vue Book Store</div>
          </RouterLink>
        </div>
        <template v-if="userInfo">
          <div class="d-flex align-center">
            <v-card-title
              >Hello <span class="font-weight-bold">{{ userInfo?.name }}</span></v-card-title
            >
            <v-btn to="/cart" class="buttonCart">
              <v-badge :content="cartStore.items.length" color="error">
                <v-icon icon="mdi-cart" size="x-large"></v-icon>
              </v-badge>
            </v-btn>

            <v-btn variant="outlined" @click="handleLogout"> Logout </v-btn>
          </div>
        </template>
        <template v-else>
          <v-btn variant="outlined" to="/login" class="ml-5"> Login </v-btn>
        </template>
      </div>
    </v-container>
  </v-app-bar>
</template>

<style>
.router-link-active {
  color: white;
}
nav a {
  color: #8c9eff;
}
.buttonCart:hover,
.buttonCart:hover .v-btn__overlay,
.buttonCart.v-btn--active,
.buttonCart.v-btn--active .v-btn__overlay {
  background-color: transparent;
}
</style>
