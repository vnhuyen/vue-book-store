<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
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
        <div>
          <v-btn variant="text" icon="mdi-cart" to="/cart" />
          <v-btn variant="outlined" to="/login" class="ml-5"> Login </v-btn>
        </div>
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
</style>
