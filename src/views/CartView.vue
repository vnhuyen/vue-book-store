<script lang="ts" setup>
import { useCartStore } from '@/stores/cart'
import { computed } from 'vue'

const cartStore = useCartStore()

const handleClearCart = () => {
  cartStore.removeAllItems()
}

const shoppingCart = computed(() => {
  return cartStore
})
</script>

<template>
  <div class="d-flex justify-space-between">
    <div class="text-h5 font-weight-bold mb-4">Shopping Cart</div>
    <v-btn flat color="red-accent-1" @click="handleClearCart">Remove All </v-btn>
  </div>
  <v-table>
    <tbody>
      <template v-if="shoppingCart.items.length === 0">
        <tr>
          Shopping cart is empty
        </tr>
      </template>
      <template v-else>
        <tr v-for="item in shoppingCart.items" :key="item.book.id">
          <td><v-img :src="item.book.coverUrl" height="250" contain /></td>
          <td>{{ item.book.title }}</td>
          <td>
            <v-btn-group color="default" density="compact">
              <v-btn
                icon="mdi-minus"
                @click="item.quantity <= 0 ? item.quantity === 0 : item.quantity--"
                color="#e1e1e1"
              ></v-btn>
              <input type="number" v-model="item.quantity" class="quantity-input" disabled />
              <v-btn icon="mdi-plus" @click="item.quantity++" color="#e1e1e1"></v-btn>
            </v-btn-group>
          </td>
          <td><v-btn icon="mdi-close" flat> </v-btn></td>
        </tr>
      </template>
    </tbody>
  </v-table>
</template>

<style>
.quantity-input {
  width: 50px;
  text-align: center;
}
</style>
