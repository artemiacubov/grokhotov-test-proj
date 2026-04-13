<template>
  <div class="cart-item-list">
    <div v-for="item in cartStore.cartItems" :key="item.id" class="cart-item-list__item">
      <div class="cart-item">
        <!-- Крестик удаления сверху справа -->
        <button class="cart-item__delete" @click="cartStore.removeItem(item.id)">
          ×
        </button>

        <div class="cart-item__main">
          <!-- Колонка 1: Картинка -->
          <div class="cart-item__image">
            <img :src="item.image" :alt="item.name">
          </div>

          <!-- Колонка 2: Информация о товаре -->
          <div class="cart-item__info">
            <h4 class="cart-item__title">{{ item.name }}</h4>
            <!-- В корзине показываем shortDescription (краткие характеристики) -->
            <p class="cart-item__description">{{ item.shortDescription }}</p>
            <div class="cart-item__article">Артикул: {{ item.article }}</div>
          </div>

          <!-- Колонка 3: Количество (+/-) и цена за 1 шт -->
          <div class="cart-item__quantity-block">
            <div class="cart-item__quantity">
              <button class="cart-item__quantity-btn cart-item__quantity-btn_minus" @click="cartStore.decreaseQuantity(item.id)">-</button>
              <div class="cart-item__quantity-value">{{ item.quantity }}</div>
              <button class="cart-item__quantity-btn cart-item__quantity-btn_plus" @click="cartStore.increaseQuantity(item.id)">+</button>
            </div>
            <div v-if="item.quantity > 1" class="cart-item__unit-price">
              {{ item.price.toLocaleString() }} ₽ / шт.
            </div>
          </div>

          <!-- Колонка 4: Цена -->
          <div class="cart-item__price-block">
            <div class="cart-item__price">
              {{ (item.price * item.quantity).toLocaleString() }} ₽
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="cartStore.cartItems.length === 0" class="cart-item-list__empty">
      Корзина пуста. Добавьте товары из слайдера ниже!
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()
</script>

<style scoped>
.cart-item-list {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.cart-item-list__item {
  position: relative;
}

.cart-item {
  position: relative;
  padding: 20px 0;
  border-bottom: 1px solid #e0e0e0;
}

.cart-item-list__item:first-child .cart-item {
  padding-top: 0;
}

.cart-item-list__item:last-child .cart-item {
  border-bottom: none;
}

/* Крестик удаления сверху справа */
.cart-item__delete {
  position: absolute;
  top: 20px;
  right: 0;
  background: none;
  border: none;
  font-size: 28px;
  color: #999;
  cursor: pointer;
  transition: color 0.2s;
  line-height: 1;
  padding: 0 8px;
  z-index: 10;
}

.cart-item-list__item:first-child .cart-item__delete {
  top: 0;
}

.cart-item__delete:hover {
  color: #f44336;
}

/* Основная сетка: 4 колонки */
.cart-item__main {
  display: grid;
  grid-template-columns: 100px 1fr auto auto;
  gap: 20px;
  align-items: center;
  padding-right: 40px;
}

/* Колонка 1: Картинка */
.cart-item__image {
  flex-shrink: 0;
  width: 100px;
  height: 100px;
  border-radius: 8px;
  overflow: hidden;
  background: #f5f5f5;
}

.cart-item__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Колонка 2: Информация о товаре */
.cart-item__info {
  flex: 1;
}

.cart-item__title {
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.cart-item__description {
  font-size: 13px;
  color: #0069B4;
  margin: 0 0 5px 0;
  line-height: 1.4;
  font-weight: 500;
}

.cart-item__article {
  font-size: 12px;
  color: #999;
}

/* Колонка 3: Количество (+/-) */
.cart-item__quantity-block {
  min-width: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.cart-item__quantity {
  display: flex;
  align-items: center;
  border-radius: 6px;
  width: fit-content;
  gap: 2px;
}

.cart-item__quantity-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: #F6F8FA;
  cursor: pointer;
  font-size: 18px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cart-item__quantity-btn_minus {
  border-radius: 6px 0 0 6px;
}

.cart-item__quantity-btn_plus {
  border-radius: 0 6px 6px 0;
}

.cart-item__quantity-btn:hover {
  background: #efefef;
}

.cart-item__quantity-value {
  min-width: 30px;
  background: #F6F8FA;
  width: 32px;
  height: 32px;
  display: flex;
  font-size: 16px;
  font-weight: 500;
  align-items: center;
  justify-content: center;
}

.cart-item__unit-price {
  font-size: 12px;
  color: #8F919B;
  line-height: 145%;
  white-space: nowrap;
}

/* Колонка 4: Цена */
.cart-item__price-block {
  min-width: 120px;
  text-align: right;
}

.cart-item__price {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.cart-item-list__empty {
  text-align: center;
  padding: 60px 20px;
  color: #999;
  font-size: 16px;
}

@media (max-width: 768px) {
  .cart-item__main {
    grid-template-columns: 80px 1fr;
    grid-template-rows: auto auto;
    gap: 12px;
    padding-right: 30px;
  }

  .cart-item__image {
    width: 80px;
    height: 80px;
    grid-row: span 2;
  }

  .cart-item__info {
    grid-column: 2;
    grid-row: 1;
  }

  .cart-item__quantity-block {
    grid-column: 2;
    grid-row: 2;
    min-width: auto;
  }

  .cart-item__price-block {
    grid-column: 2;
    grid-row: 2;
    text-align: left;
    min-width: auto;
  }

  .cart-item__quantity {
    justify-content: flex-start;
  }

  .cart-item__delete {
    top: 10px;
    right: 0;
  }

  .cart-item-list__item:first-child .cart-item__delete {
    top: 0;
  }

  .cart-item__unit-price {
    white-space: normal;
  }
}

@media (max-width: 480px) {
  .cart-item__main {
    grid-template-columns: 70px 1fr;
  }

  .cart-item__image {
    width: 70px;
    height: 70px;
  }

  .cart-item__title {
    font-size: 14px;
  }

  .cart-item__price {
    font-size: 16px;
  }

  .cart-item__quantity-block,
  .cart-item__price-block {
    display: inline-block;
  }

  .cart-item__quantity-block {
    margin-right: 15px;
  }
}
</style>