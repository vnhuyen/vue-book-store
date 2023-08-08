<script setup lang="ts">
import { onMounted, ref, watchEffect, onUpdated, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import type { UserInfo } from '@/constants/types'
import { useCartStore } from '@/stores/cart'
const router = useRouter()
const vuexStore = useStore()
const userInfo = ref<{ user: UserInfo }>()
const ripple = ref(false)
const userItem = computed(() => {
  const userState = JSON.parse(vuexStore.state.userStore.user)
  userState ? (userInfo.value = userState) : null
  if (!userInfo.value?.user) {
    router.replace('/login')
  }
})
onMounted(() => {
  const userState = JSON.parse(vuexStore.state.userStore.user)
  userState ? (userInfo.value = userState) : null
  if (!userInfo.value?.user) {
    router.replace('/login')
  }
})

const handleLogout = () => {
  vuexStore.dispatch('handleLogout')
}

const cartStore = useCartStore()
console.log(cartStore.items.length)
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
          <div>
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
