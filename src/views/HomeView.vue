<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import BookList from './BookList.vue'
import FilterBox from './FilterBox.vue'
import type { FilterOptions } from '@/constants/types'
import bookService from '@/services/BookService'
import type { BookItem } from '@/constants/types'
import { BookCategory } from '@/constants/data'
const filterOptions = reactive<FilterOptions>({
  searchString: '',
  categoryCheckedList: []
})
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
  const { categoryCheckedList, searchString } = options;
  let filteredBooks = [...books.value];
  if (searchString) {
    filteredBooks = filteredBooks.filter((book) =>
      book.title.toLowerCase().includes(searchString.toLowerCase())
    );
  }

  if (categoryCheckedList && categoryCheckedList.length > 0) {
    filteredBooks = filteredBooks.filter((book) =>
    categoryCheckedList.includes(Object.values(BookCategory)[book.category])
    );
  }

  books.value = filteredBooks;
}

const onResetFilterBook = () => {
  getBooks()
  filterOptions.categoryCheckedList = []
  filterOptions.searchString = ""
}
</script>

<template>
  <main>
    <v-row>
      <v-col cols="12" md="3"
        ><FilterBox
          v-on:onFilterBook="onFilterBook(filterOptions)"
          v-on:onResetFilterBook="onResetFilterBook"
          :filterOptions="filterOptions"
      /></v-col>
      <v-col cols="12" md="9"><BookList :books="books" :isLoading="isLoading" /></v-col>
    </v-row>
  </main>
</template>
