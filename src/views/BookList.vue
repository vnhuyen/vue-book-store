<script lang="ts" setup>
import { ref, computed } from 'vue'
import type { BookItem } from '@/constants/types'
import BookItemView from '@/views/BookItem.vue'
const currentPage = ref<number>(1)
const itemsPerPage = ref<number>(8)
const props = defineProps<{
  books?: BookItem[]
  isLoading: boolean
}>()

const totalPages = computed(() => {
  return props.books ? Math.ceil(props.books?.length / itemsPerPage.value) : 0
})

const displayedItems = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value
  const endIndex = startIndex + itemsPerPage.value
  return props.books?.slice(startIndex, endIndex)
})
</script>

<template>
  <div class="book-list">
    <div class="text-h5 font-weight-bold mb-4">Books</div>
    <template v-if="props.isLoading">
      <v-text-field color="success" loading disabled></v-text-field>
    </template>
    <template v-else>
      <v-row>
        <template v-if="props.books && props.books?.length > 0">
          <BookItemView v-for="book in displayedItems" :key="book.id" :book="book" />
        </template>
        <template v-else>
          <v-col cols="12">No Book Found.</v-col>
        </template>
      </v-row>
    </template>
    <div class="text-center">
      <v-container>
        <v-row justify="center">
          <v-col cols="8">
            <v-container class="max-width">
              <v-pagination
                v-model="currentPage"
                class="my-4"
                :length="totalPages"
                active-color="primary"
                total-visible="12"
              ></v-pagination>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<style></style>
