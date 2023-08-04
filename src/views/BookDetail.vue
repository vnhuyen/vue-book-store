<script lang="ts" setup>
import { BookCategory } from '@/constants/data'
import type { BookItem } from '@/constants/types'
import bookService from '@/services/BookService'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const bookItemId = parseInt(route.params.id as string)
const bookDetail = ref<BookItem>()
const bookCategories = ref(Object.values(BookCategory))
const quantity = ref(0)
onMounted(async () => {
  await bookService.getBook(bookItemId).then((book) => {
    bookDetail.value = book.data
  })
})
</script>

<template>
  <v-container class="w-50">
    <v-row>
      <v-col cols="12" xs="12" md="4" xl="4"
        ><v-img :src="bookDetail?.coverUrl" height="auto" contain
      /></v-col>
      <v-col cols="12" xs="12" md="8" xl="8">
        <v-card-title>{{ bookDetail?.title }}</v-card-title>
        <v-card-text class="text-subtitle-1">{{ bookDetail?.author }}</v-card-text>
        <v-card-text>
          {{ bookDetail?.description }}
        </v-card-text>
        <v-card-text>
          <v-chip color="primary" text-color="white" size="small">
            {{ bookCategories[bookDetail?.category || 0] }}
          </v-chip>
        </v-card-text>
        <v-card-title class="text-h5 font-weight-bold text-primary">
          <span class="mr-2">$</span>{{ bookDetail?.price }}
        </v-card-title>
        <div class="d-flex flex-column">
          <v-btn-group color="default" density="compact">
            <v-btn icon="mdi-minus" @click="quantity <= 0 ? quantity === 0 : quantity--"></v-btn>
            <v-text-field
              type="number"
              v-model="quantity"
              class="quantity-input"
              density="compact"
              hide-spin-buttons
            />
            <v-btn icon="mdi-plus" @click="quantity++"></v-btn>
          </v-btn-group>
          <v-btn color="primary" prepend-icon="mdi-cart" variant="flat" class="ml-2"
            >Add to Cart</v-btn
          >
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.v-btn-group--density-default.v-btn-group {
  height: 38px;
}

.quantity-input {
  width: 80px;
}

.quantity-input input::-webkit-outer-spin-button,
.quantity-input input::-webkit-inner-spin-button {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}
</style>
