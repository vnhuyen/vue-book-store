import type {BookItem, CartItem} from "@/constants/types";
import {defineStore} from "pinia";

export const useCartStore  = defineStore('cart', {
    state: () => ({
        items: [] as CartItem[]
    }),
    actions: {
        addItem(cartItem: CartItem) {
            this.items.push(cartItem)
        },
        removeItem(id: number){
            this.items.filter(item => item.book.id === id)
        },
        removeAllItems(){
            this.items = []
        }
    }
})

