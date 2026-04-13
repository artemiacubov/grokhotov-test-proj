import { defineStore } from 'pinia'
import type { CartItem, Product, OrderResponse } from '~/type/type.ts'


export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [] as CartItem[],
        hasInstallation: false
    }),

    getters: {
        totalItems: (state): number => {
            return state.items.reduce((sum, item) => sum + item.quantity, 0)
        },

        totalPrice: (state): number => {
            return state.items.reduce((sum, item) => {
                return sum + (item.price * item.quantity)
            }, 0)
        },

        hasAnyInstallation: (state): boolean => {
            return state.hasInstallation
        },

        cartItems: (state): CartItem[] => state.items
    },

    actions: {
        addToCart(product: Product): void {
            const existingItem = this.items.find(item => item.id === product.id)

            if (existingItem) {
                existingItem.quantity++
            } else {
                this.items.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: 1,
                    image: product.image,
                    description: product.description,
                    shortDescription: product.shortDescription,
                    article: product.article || `${product.name}${Math.floor(Math.random() * 1000)}`
                })
            }
        },

        increaseQuantity(itemId: number): void {
            const item = this.items.find(i => i.id === itemId)
            if (item) item.quantity++
        },

        decreaseQuantity(itemId: number): void {
            const item = this.items.find(i => i.id === itemId)
            if (item && item.quantity > 1) {
                item.quantity--
            } else if (item && item.quantity === 1) {
                this.removeItem(itemId)
            }
        },

        removeItem(itemId: number): void {
            this.items = this.items.filter(i => i.id !== itemId)
        },

        clearCart(): void {
            this.items = []
            this.hasInstallation = false
        },

        toggleAllInstallations(value: boolean): void {
            this.hasInstallation = value
        },

        async submitOrder(): Promise<boolean> {
            if (this.items.length === 0) {
                alert('Корзина пуста!')
                return false
            }

            const orderData = {
                items: this.items,
                totalPrice: this.totalPrice,
                totalItems: this.totalItems,
                hasInstallation: this.hasInstallation,
                orderDate: new Date().toISOString()
            }

            try {
                const response = await $fetch<OrderResponse>('/api/order', {
                    method: 'POST',
                    body: orderData
                })

                if (response.success) {
                    alert(`Заказ №${response.orderId} успешно оформлен на сумму ${this.totalPrice.toLocaleString()} ₽!`)
                    this.items = []
                    this.hasInstallation = false
                    return true
                }
                return false
            } catch (error) {
                console.error('Ошибка при оформлении заказа:', error)
                alert('Ошибка при оформлении заказа')
                return false
            }
        }
    }
})