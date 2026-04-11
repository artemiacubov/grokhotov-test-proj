<template>
  <div class="cart-item-list">
    <div v-for="item in cartStore.cartItems" :key="item.id" class="cart-item-list__item">
      <div class="cart-item">
        <div class="cart-item__image">
          <img :src="item.image" :alt="item.name">
        </div>

        <div class="cart-item__info">
          <h4 class="cart-item__title">{{ item.name }}</h4>
          <p class="cart-item__description">{{ item.description }}</p>
          <div class="cart-item__article">Артикул: {{ item.article }}</div>
        </div>

        <div class="cart-item__controls">
          <div class="cart-item__quantity">
            <button class="cart-item__quantity-btn" @click="cartStore.decreaseQuantity(item.id)">-</button>
            <span class="cart-item__quantity-value">{{ item.quantity }}</span>
            <button class="cart-item__quantity-btn" @click="cartStore.increaseQuantity(item.id)">+</button>
          </div>

          <div class="cart-item__price">
            <div class="cart-item__total">{{ (item.price * item.quantity).toLocaleString() }} ₽</div>
            <div class="cart-item__unit-price">{{ item.price.toLocaleString() }} ₽ / шт</div>
          </div>

          <button class="cart-item__delete" @click="cartStore.removeItem(item.id)">
            Удалить
          </button>
        </div>
      </div>

      <div class="cart-item__installation">
        <label class="cart-item__checkbox">
          <input
              type="checkbox"
              :checked="item.hasInstallation"
              @change="cartStore.toggleInstallation(item.id)"
          >
          <span>Установка (+{{ item.installationPrice.toLocaleString() }} ₽)</span>
        </label>
      </div>
    </div>

    <div v-if="cartStore.cartItems.length === 0" class="cart-item-list__empty">
      🛒 Корзина пуста. Добавьте товары из слайдера ниже!
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()
</script>

<style scoped>
.cart-item-list__item {
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e0e0e0;
}

.cart-item-list__item:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.cart-item {
  display: grid;
  grid-template-columns: 80px 1fr auto;
  gap: 20px;
  margin-bottom: 12px;
}

.cart-item__image img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}

.cart-item__title {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: #333;
}

.cart-item__description {
  font-size: 13px;
  color: #666;
  margin: 0 0 5px 0;
  line-height: 1.4;
}

.cart-item__article {
  font-size: 12px;
  color: #999;
}

.cart-item__controls {
  text-align: right;
}

.cart-item__quantity {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  justify-content: flex-end;
}

.cart-item__quantity-btn {
  width: 28px;
  height: 28px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  border-radius: 4px;
  font-size: 16px;
  transition: all 0.2s;
}

.cart-item__quantity-btn:hover {
  background: #f5f5f5;
  border-color: #4caf50;
}

.cart-item__quantity-value {
  min-width: 30px;
  text-align: center;
  font-weight: 500;
}

.cart-item__total {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.cart-item__unit-price {
  font-size: 12px;
  color: #999;
}

.cart-item__delete {
  background: none;
  border: none;
  color: #f44336;
  cursor: pointer;
  font-size: 13px;
  margin-top: 8px;
  transition: color 0.2s;
}

.cart-item__delete:hover {
  text-decoration: underline;
  color: #d32f2f;
}

.cart-item__installation {
  padding-left: 100px;
}

.cart-item__checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #666;
}

.cart-item__checkbox input {
  cursor: pointer;
  width: 16px;
  height: 16px;
}

.cart-item-list__empty {
  text-align: center;
  padding: 60px 20px;
  color: #999;
  font-size: 16px;
}

@media (max-width: 768px) {
  .cart-item {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .cart-item__controls {
    text-align: left;
  }

  .cart-item__quantity {
    justify-content: flex-start;
  }

  .cart-item__installation {
    padding-left: 0;
  }
}
</style>