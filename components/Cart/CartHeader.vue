<template>
  <header class="header">
    <div class="container">
      <div class="header__wrapper">
        <div class="header__logo">
          <h1>Магазин</h1>
        </div>
        <div class="header__cart">
          <NuxtLink to="/pages" class="header__cart-link">
            🛒 Корзина
            <span class="header__cart-count">{{ cartStore.totalItems }}</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()
</script>

<style scoped>
.header {
  background: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.header__wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
}

.header__logo h1 {
  margin: 0;
  font-size: 24px;
  color: #333;
}

.header__cart-link {
  text-decoration: none;
  color: #333;
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.header__cart-count {
  background: #4caf50;
  color: white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
}
</style>