<template>
  <div class="cart-page">
    <div class="container">
      <div class="row">
        <h1 class="cart-page__title">Ваша корзина</h1>
        <div class="cart-page__total-items">{{ cartStore.totalItems }} товара</div>
      </div>

      <div class="cart-page__layout">
        <div class="cart-page__products">
          <CartItemList />

          <div v-if="cartStore.items.length > 0" class="installation-block">
            <label class="installation-block__checkbox">
              <input
                  type="checkbox"
                  v-model="globalInstallation"
                  @change="toggleAllInstallations"
              >
              <span class="installation-block__text">
                Отметьте, если Вам необходима консультация профессионала по монтажу выбранных товаров.
              </span>
            </label>
          </div>
        </div>

        <!-- Правая часть: итого -->
        <div class="cart-page__summary">
          <div class="order-summary">
            <h3 class="order-summary__title">Итого</h3>

            <div class="order-summary__row">
              <span>Сумма заказа</span>
              <span>{{ cartStore.totalPrice.toLocaleString() }} ₽</span>
            </div>

            <div class="order-summary__row">
              <span>Количество</span>
              <span>{{ cartStore.totalItems }} шт</span>
            </div>

            <div class="order-summary__row">
              <span>Установка</span>
              <span>{{ cartStore.hasAnyInstallation ? 'Да' : 'Нет' }}</span>
            </div>

            <div class="order-summary__divider"></div>

            <div class="order-summary__row order-summary__total">
              <span>Итого к оплате</span>
              <span>{{ cartStore.totalPrice.toLocaleString() }} ₽</span>
            </div>

            <button class="order-summary__button" @click="handleOrder">
              Оформить заказ
            </button>
          </div>
        </div>
      </div>

      <!-- Слайдер с товарами (добавление в корзину) -->
      <div class="cart-page__products-slider">
        <h2 class="cart-page__slider-title">Добавьте товары в корзину</h2>
        <ViewedProductsSlider @add-to-cart="handleAddToCart" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '~/stores/cart'
import CartItemList from '~/components/Cart/CartItemList.vue'
import ViewedProductsSlider from '~/components/Products/ViewedProductsSlider.vue'

const cartStore = useCartStore()
const globalInstallation = ref(false)

const toggleAllInstallations = () => {
  cartStore.toggleAllInstallations(globalInstallation.value)
}

const handleAddToCart = (product) => {
  cartStore.addToCart(product)
}

const handleOrder = async () => {
  const success = await cartStore.submitOrder()
  if (success) {
    // Обновляем страницу после оформления заказа
    window.location.reload()
  }
}
</script>

<style scoped>
.row {
  display: flex;
  flex-direction: row;
  padding-bottom: 20px;
}

.cart-page {
  min-height: 100vh;
  background: #f8f9fa;
  padding: 40px 0 60px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.cart-page__title {
  font-size: 44px;
  font-weight: 700;
  margin-bottom: 10px;
  color: #333;
}

.cart-page__total-items {
  color: #666;
  display: flex;
  align-items: center;
  padding: 10px 0 0 22px;
  font-size: 18px;
  font-weight: 400;
}

.cart-page__layout {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 30px;
  margin-bottom: 60px;
}

.cart-page__products {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  min-height: 300px;
}

.installation-block {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #e0e0e0;
}

.installation-block__checkbox {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
}

.installation-block__checkbox input {
  margin-top: 2px;
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.installation-block__text {
  font-size: 14px;
  color: #666;
  line-height: 1.4;
}

.order-summary {
  background: white;
  border-radius: 12px;
  padding: 24px;
  position: sticky;
  top: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.order-summary__title {
  font-size: 20px;
  margin-bottom: 20px;
  color: #333;
}

.order-summary__row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  font-size: 14px;
  color: #666;
}

.order-summary__divider {
  height: 1px;
  background: #e0e0e0;
  margin: 15px 0;
}

.order-summary__total {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 25px;
}

.order-summary__button {
  width: 100%;
  background: #4caf50;
  color: white;
  border: none;
  padding: 14px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}

.order-summary__button:hover {
  background: #45a049;
}

.cart-page__products-slider {
  margin-top: 40px;
  padding-top: 40px;
  border-top: 1px solid #e0e0e0;
}

.cart-page__slider-title {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

@media (max-width: 768px) {
  .cart-page__layout {
    grid-template-columns: 1fr;
  }

  .order-summary {
    position: static;
  }
}
</style>