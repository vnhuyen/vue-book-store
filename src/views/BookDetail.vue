<script lang="ts" setup>
import { BookCategory } from '@/constants/data'
import type { BookItem } from '@/constants/types'
import { ToastType } from '@/constants/data'
import bookService from '@/services/BookService'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { showToast } from '@/helpers/getToast'
import { useCartStore } from '@/stores/cart'
const cartStore = useCartStore()
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

const handleAddToCart = () => {
  if (quantity.value <= 0) {
    showToast({ message: 'Please enter quantity', type: ToastType.Error })
  }
  if (bookDetail.value) {
    cartStore.addItem(bookDetail.value)
  }
}
</script>

<template>
  <v-container class="w-50">
    <v-row>
      <v-col cols="12" xs="12" md="4" xl="4"><v-img :src="bookDetail?.coverUrl" height="auto" contain /></v-col>
      <v-col cols="12" xs="12" md="8" xl="8">
        <v-card-title>{{ bookDetail?.title }}</v-card-title>
        <v-card-text class="text-subtitle-1">{{ bookDetail?.author }}</v-card-text>
        <v-card-text class="text-h5 font-weight-bold text-primary py-0">
          <span class="mr-2">$</span>{{ bookDetail?.price }}
        </v-card-text>
        <v-card-text>
          {{ bookDetail?.description }}
        </v-card-text>
        <v-card-text class="pt-0 mb-3">
          <v-chip color="primary" text-color="white" size="small">
            {{ bookCategories[bookDetail?.category || 0] }}
          </v-chip>
        </v-card-text>

        <div class="d-inline pl-4">
          <v-btn-group color="default" density="compact">
            <v-btn icon="mdi-minus" @click="quantity <= 0 ? quantity === 0 : quantity--" color="#e1e1e1"></v-btn>
            <input type="number" v-model="quantity" class="quantity-input" />
            <v-btn icon="mdi-plus" @click="quantity++" color="#e1e1e1"></v-btn>
          </v-btn-group>
          <v-btn color="primary" prepend-icon="mdi-cart" variant="flat" class="ml-5" @click="handleAddToCart"
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
  width: 50px;
  text-align: center;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
