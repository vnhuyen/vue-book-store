import type {BookItem, CartItem} from "@/constants/types";
import {defineStore} from "pinia";

export const useCartStore  = defineStore('cart', {
    state: () => ({
        items: [] as CartItem[]
    }),
    actions: {
        addItem(bookItem: BookItem) {
            let addItem = {book: bookItem, quantity: 1}
            const existingItemIndex = this.items.findIndex(item => item.book.id === addItem.book.id)
            if(existingItemIndex !== -1) {
                this.items[existingItemIndex].quantity++
            } else{
                this.items.push(addItem)
            }
        },
        removeItem(id: number) {
            this.items = this.items.filter(item => item.book.id !== id)
        },
        removeAllItems() {
            this.items = []
        }
    }
})

