import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: []
    }),

    getters: {
        totalItems: (state) => {
            return state.items.reduce((sum, item) => sum + item.quantity, 0)
        },

        totalPrice: (state) => {
            return state.items.reduce((sum, item) => {
                const itemTotal = item.price * item.quantity
                const installationTotal = item.hasInstallation ? item.installationPrice : 0
                return sum + itemTotal + installationTotal
            }, 0)
        },

        hasAnyInstallation: (state) => {
            return state.items.some(item => item.hasInstallation)
        },

        cartItems: (state) => state.items
    },

    actions: {
        addToCart(product) {
            const existingItem = this.items.find(item => item.id === product.id)

            if (existingItem) {
                existingItem.quantity++
            } else {
                this.items.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: 1,
                    hasInstallation: false,
                    installationPrice: product.installationPrice || 1500,
                    image: product.image,
                    description: product.description,
                    article: product.article || `${product.name}${Math.floor(Math.random() * 1000)}`
                })
            }
        },

        increaseQuantity(itemId) {
            const item = this.items.find(i => i.id === itemId)
            if (item) item.quantity++
        },

        decreaseQuantity(itemId) {
            const item = this.items.find(i => i.id === itemId)
            if (item && item.quantity > 1) {
                item.quantity--
            } else if (item && item.quantity === 1) {
                this.removeItem(itemId)
            }
        },

        removeItem(itemId) {
            this.items = this.items.filter(i => i.id !== itemId)
        },

        toggleInstallation(itemId) {
            const item = this.items.find(i => i.id === itemId)
            if (item) item.hasInstallation = !item.hasInstallation
        },

        toggleAllInstallations(value) {
            this.items.forEach(item => {
                item.hasInstallation = value
            })
        },

        async submitOrder() {
            if (this.items.length === 0) {
                alert('Корзина пуста!')
                return false
            }

            const orderData = {
                items: this.items,
                totalPrice: this.totalPrice,
                totalItems: this.totalItems,
                orderDate: new Date().toISOString()
            }

            try {
                const response = await $fetch('/api/order', {
                    method: 'POST',
                    body: orderData
                })

                if (response.success) {
                    alert(`Заказ №${response.orderId} успешно оформлен на сумму ${this.totalPrice.toLocaleString()} ₽!`)
                    this.items = []
                    return true
                }
            } catch (error) {
                console.error('Ошибка при оформлении заказа:', error)
                alert('Ошибка при оформлении заказа')
                return false
            }
        }
    }
})