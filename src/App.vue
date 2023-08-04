<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
</script>

<template>
  <v-app>
    <v-layout>
      <NavBar />
      <v-container class="content-layout">
        <RouterView />
      </v-container>
    </v-layout>
  </v-app>
</template>

<style scoped>
.content-layout {
  margin-top: 100px;
}
</style>
