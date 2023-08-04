<script lang="ts" setup>
import { ref } from 'vue'
import type { BookItem } from '@/constants/types'
import BookItemView from '@/views/BookItem.vue'
const page = ref<number>(0)

const props = defineProps<{
  books?: BookItem[]
  isLoading: boolean
}>()
</script>

<template>
  <div class="book-list">
    <div class="text-h5 font-weight-bold mb-4">Books</div>
    <template v-if="props.isLoading">
      <v-text-field color="success" loading disabled></v-text-field>
    </template>
    <template v-else>
      <v-row>
        <BookItemView v-for="book in props.books" :key="book.id" :book="book" />
      </v-row>
    </template>
    <div class="text-center">
      <v-container>
        <v-row justify="center">
          <v-col cols="8">
            <v-container class="max-width">
              <v-pagination
                v-model="page"
                class="my-4"
                :length="props.books?.length"
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
