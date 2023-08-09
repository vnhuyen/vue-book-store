<script lang="ts" setup>
import { useCartStore } from '@/stores/cart'
import { computed } from 'vue'

const cartStore = useCartStore()

const handleClearCart = () => {
  cartStore.removeAllItems()
}
const handleRemoveItem = (id: number) => {
  cartStore.removeItem(id)
}

const cartTotalPrice = computed(() => {
  let total = 0
  cartStore.items.forEach((item) => {
    const itemTotalPrice = item.book.price * item.quantity
    total += itemTotalPrice
  })
  return Number(total).toFixed(2)
})
</script>

<template>
  <div class="d-flex justify-space-between">
    <div class="text-h5 font-weight-bold mb-4">Shopping Cart</div>
    <v-btn flat color="red-accent-1" @click="handleClearCart">Remove All </v-btn>
  </div>
  <v-table>
    <tbody>
      <template v-if="cartStore.items.length === 0">
        <tr>
          Shopping cart is empty
        </tr>
      </template>
      <template v-else>
        <tr v-for="item in cartStore.items" :key="item.book.id">
          <td><v-img :src="item.book.coverUrl" height="150" width="100" contain /></td>
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
          <td class="font-weight-bold">${{ Number(item.quantity * item.book.price).toFixed(2) }}</td>
          <td class="text-right"><v-btn icon="mdi-close" flat @click="handleRemoveItem(item.book.id)" /></td>
        </tr>
        <tr class="pt-3">
          <td></td>
          <td></td>
          <td class="text-right text-h6 font-weight-bold">Total</td>
          <td class="text-h6 font-weight-bold">
            $
            {{ cartTotalPrice }}
          </td>
          <td class="text-right"><v-btn flat color="primary">Checkout</v-btn></td>
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
.v-img__img {
  padding: 10px 0;
}
</style>
