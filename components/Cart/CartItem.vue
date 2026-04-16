<template>
  <div class="cart-item">
    <div class="cart-item__info">
      <h4 class="cart-item__title">{{ item.name }}</h4>
      <div class="cart-item__price">{{ item.price }} ₽ × {{ item.quantity }}</div>
      <div class="cart-item__subtotal">{{ item.price * item.quantity }} ₽</div>
    </div>

    <div class="cart-item__controls">
      <div class="cart-item__quantity">
        <button class="cart-item__quantity-btn" @click="cartStore.decreaseQuantity(item.id)">-</button>
        <span class="cart-item__quantity-value">{{ item.quantity }}</span>
        <button class="cart-item__quantity-btn" @click="cartStore.increaseQuantity(item.id)">+</button>
      </div>

      <label class="cart-item__checkbox">
        <input
            type="checkbox"
            :checked="item.hasInstallation"
            @change="cartStore.toggleAllInstallations(item.id)"
        >
        <span>Установка (+{{ item.installationPrice }} ₽)</span>
      </label>

      <button class="cart-item__delete" @click="cartStore.removeItem(item.id)">
        Удалить
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'

defineProps({
  item: {
    type: Object,
    required: true
  }
})

const cartStore = useCartStore()
</script>

<style scoped>
.cart-item {
  padding: 15px 0;
  border-bottom: 1px solid #f0f0f0;
}

.cart-item__info {
  margin-bottom: 10px;
}

.cart-item__title {
  margin: 0 0 5px 0;
  font-size: 16px;
}

.cart-item__price {
  color: #666;
  font-size: 14px;
}

.cart-item__subtotal {
  font-weight: bold;
  margin-top: 5px;
}

.cart-item__controls {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.cart-item__quantity {
  display: flex;
  align-items: center;
  gap: 10px;
}

.cart-item__quantity-btn {
  width: 30px;
  height: 30px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  border-radius: 4px;
}

.cart-item__quantity-btn:hover {
  background: #f5f5f5;
}

.cart-item__checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.cart-item__delete {
  background: none;
  border: none;
  color: #f44336;
  cursor: pointer;
  text-align: left;
  padding: 0;
}

.cart-item__delete:hover {
  text-decoration: underline;
}
</style>