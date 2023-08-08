<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import { USER_AUTH } from './constants/data'
const router = useRouter()
onMounted(() => {
  const user = localStorage.getItem(USER_AUTH)
  if (!user) {
    router.push('/login')
  }
})
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
