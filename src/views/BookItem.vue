<script setup lang="ts">
import { BookCategory } from '@/constants/data'
import type { BookItem, CardProps, CartItem } from '@/constants/types'
import { useCartStore } from '@/stores/cart'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const props = defineProps<CardProps>()
const router = useRouter()
const bookCategories = ref(Object.values(BookCategory))
const isHovering = ref(false)
const cartStore = useCartStore()
const onAddToCart = (bookItem: BookItem) => {
  const currentSelectedCartItem: CartItem | undefined = cartStore.items.find((item) => item.book.id === bookItem.id)
  const cartItem = {
    book: bookItem,
    quantity: currentSelectedCartItem ? currentSelectedCartItem.quantity++ : 0
  }
  cartStore.addItem(cartItem)
}
</script>
<template>
  <v-col cols="12" sm="5" md="4" lg="3" xl="2" :key="props.book.id">
    <v-card
      border
      class="mb-2 rounded-lg"
      density="compact"
      variant="text"
      @click="router.push(`/book/${props.book.id}`)"
    >
      <v-img :src="props.book.coverUrl" height="275" cover></v-img>

      <v-card-title class="text-subtitle-1 font-weight-bold mb-0">{{ props.book.title }}</v-card-title>
      <v-card-text class="text-center"
        ><v-chip color="primary" text-color="white" size="small">
          {{ bookCategories[props.book.category] }}
        </v-chip></v-card-text
      >

      <v-card-title class="text-h6 font-weight-bold text-primary text-center">
        <span class="mr-2">$</span>{{ props.book.price }}
      </v-card-title>
      <template v-slot:actions>
        <v-btn
          color="primary"
          block
          prepend-icon="mdi-cart"
          :variant="isHovering ? 'flat' : 'text'"
          @mouseover="isHovering = true"
          @mouseleave="isHovering = false"
          @click.stop="onAddToCart(props.book)"
          >Add to Cart</v-btn
        >
      </template>
    </v-card>
  </v-col>
</template>

<style scoped>
@media (max-width: 1024px) {
}
</style>
