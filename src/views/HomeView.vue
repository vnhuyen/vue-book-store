<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import BookList from './BookList.vue'
import FilterBox from './FilterBox.vue'
import type { FilterOptions } from '@/constants/types'
import bookService from '@/services/BookService'
import type { BookItem } from '@/constants/types'
import { BookCategory } from '@/constants/data'
const bookCategoriesSelected = ref()

const books = ref<BookItem[]>([])
const page = ref<number>(0)
const isLoading = ref(false)
onMounted(async () => {
  isLoading.value = true
  getBooks()
})

const getBooks = () => {
  bookService
    .getAllBooks()
    .then((response) => {
      books.value = response.data
      isLoading.value = false
    })
    .catch((error) => {
      console.log(error)
      isLoading.value = false
    })
}

const onFilterBook = (options: FilterOptions) => {
  console.log('called', options?.categoryCheckedList)
  let allfilteredBooks = books.value.filter(
    (book) => options.categoryCheckedList?.includes(Object.values(BookCategory)[book.category])
  )

  options?.categoryCheckedList?.length > 0 ? (books.value = allfilteredBooks) : books.value
}
const onResetFilterBook = () => {
  getBooks()
  bookCategoriesSelected.value = []
}
</script>

<template>
  <main>
    {{ console.log('dsd', books) }}
    <v-row>
      <v-col cols="12" md="3"
        ><FilterBox
          v-on:onFilterBook="onFilterBook"
          v-on:onResetFilterBook="onResetFilterBook"
          :bookCategoriesSelected="bookCategoriesSelected"
      /></v-col>
      <v-col cols="12" md="9"><BookList :books="books" :isLoading="isLoading" /></v-col>
    </v-row>
  </main>
</template>
