<template>
  <div class="cart-header">
    <div class="container">
      <div class="cart-header__wrapper">
        <div class="cart-header__logo">
          <NuxtLink to="/" class="cart-header__link">
            <h2>Магазин</h2>
          </NuxtLink>
        </div>
        <div class="cart-header__info">
          <NuxtLink to="/" class="cart-header__cart-link">
            <div class="cart-header__item">
              <!-- Иконка корзины 32x32 -->
                <img class="cart-header__icon" src="../../assets/imagines/cartIcon.png">
              <div class="cart-header__text">
                <div class="cart-header__label">Ваша корзина</div>
                <div class="cart-header__values">
                  <span class="cart-header__count">{{ cartStore.totalItems }} товара</span>
                  <span class="cart-header__total">{{ cartStore.totalPrice.toLocaleString() }} ₽</span>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()
</script>

<style scoped>
.cart-header {
  background: white;
  padding: 15px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.cart-header__wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cart-header__logo h2 {
  margin: 0;
  color: #333;
}

.cart-header__link {
  text-decoration: none;
}

.cart-header__cart-link {
  text-decoration: none;
}

.cart-header__info {
  display: flex;
  gap: 20px;
}

.cart-header__item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.cart-header__icon {
  width: 32px;
  height: 32px;
  color: #4caf50;
  display: flex;
  align-items: center;
}

.cart-header__icon svg {
  width: 32px;
  height: 32px;
}

.cart-header__text {
  display: flex;
  flex-direction: column;
}

/* Стиль для "Ваша корзина" */
.cart-header__label {
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #333;
  background: transparent;
}

.cart-header__values {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.cart-header__count {
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  font-size: 12px;
  color: #797B86;
  border-radius: 4px;
  display: inline-block;
}

.cart-header__total {
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  font-size: 12px;
  color: #1F2432;
  border-radius: 4px;
  display: inline-block;
}
</style>