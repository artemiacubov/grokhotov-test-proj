<template>
  <div class="cart-page">
    <div class="container">
      <div class="row">
        <div class="row__left">
          <h1 class="cart-page__title">Ваша корзина</h1>
          <div class="cart-page__total-items">{{ cartStore.totalItems }} товара</div>
        </div>

        <button
            v-if="cartStore.items.length > 0"
            class="row__clear-btn"
            @click="handleClearCart"
        >
          Очистить корзину
        </button>
      </div>

      <div class="cart-page__layout">
        <div class="cart-page__products">
          <CartItemList />

          <!-- Блок установки под всеми товарами -->
          <div v-if="cartStore.items.length > 0" class="installation-block">
            <label class="installation-block__checkbox">
              <input
                  type="checkbox"
                  v-model="globalInstallation"
                  @change="toggleAllInstallations"
                  class="installation-block__input"
              >
              <img
                  src="../assets/imagines/install.png"
                  alt="Установка"
                  class="installation-block__icon"
              >
              <div class="installation-block__texts">
                <span class="installation-block__title">Установка</span>
                <span class="installation-block__description">
                  Отметьте, если Вам необходима консультация профессионала по монтажу выбранных товаров.
                </span>
              </div>
            </label>
          </div>
        </div>

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
              <span>Стоимость товаров</span>
              <span>{{ cartStore.totalPrice.toLocaleString() }} ₽</span>
            </div>

            <button class="order-summary__button" @click="handleOrder">
              Оформить заказ
            </button>
            <button class="order-summary__button-one-click" @click="handleOneClickOrder">
              Купить в 1 клик
            </button>
          </div>
        </div>
      </div>

      <div class="cart-page__products-slider">
        <h2 class="cart-page__slider-title">Недавно просмотренные</h2>
        <ViewedProductsSlider @add-to-cart="handleAddToCart" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'
import type { Product } from '~/type/type'
import CartItemList from '~/components/Cart/CartItemList.vue'
import ViewedProductsSlider from '~/components/Products/ViewedProductsSlider.vue'

const cartStore = useCartStore()
const globalInstallation = ref(false)

const toggleAllInstallations = () => {
  cartStore.toggleAllInstallations(globalInstallation.value)
}

const handleAddToCart = (product: Product) => {
  cartStore.addToCart(product)
}

const handleClearCart = () => {
  if (confirm('Вы уверены, что хотите очистить всю корзину?')) {
    cartStore.clearCart()
  }
}

const handleOrder = async () => {
  const success = await cartStore.submitOrder()
  if (success) {
    window.location.reload()
  }
}

const handleOneClickOrder = async () => {
  if (cartStore.items.length === 0) {
    alert('Корзина пуста!')
    return
  }
  // Логика для заказа в 1 клик
  alert('Функция "Купить в 1 клик" будет реализована')
}
</script>

<style scoped>
.row {
  display: flex;
  align-items: flex-end;
  padding-bottom: 20px;
  flex-wrap: wrap;
  gap: 15px;
  width: 100%;
}

.row__left {
  display: flex;
  align-items: baseline;
  padding-right: 23%;
  gap: 22px;
  flex-wrap: wrap;
}

.row__clear-btn {
  background: none;
  color: #8F919B;
  text-decoration: underline #797B86;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.row__clear-btn:hover {
  background: #f7f7f7;
  text-decoration: none;
}

.cart-page {
  min-height: 100vh;
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
  border-radius: 12px;
  padding: 20px;
  min-height: 300px;
}

/* Блок установки */
.installation-block {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #e0e0e0;
}

.installation-block__checkbox {
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  background: #F6F8FA;
  padding: 26px 20px;
  border-radius: 5px;
  transition: all 0.2s;
}

.installation-block__checkbox:hover {
  background: #eef0f2;
}

.installation-block__input {
  width: 20px;
  height: 20px;
  cursor: pointer;
  flex-shrink: 0;
}

.installation-block__icon {
  width: 50px;
  height: 50px;
  object-fit: contain;
  flex-shrink: 0;
}

.installation-block__texts {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.installation-block__title {
  font-family: 'Lato', sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 145%;
  color: #1F2432;
}

.installation-block__description {
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  color: #797B86;
}

.order-summary {
  background: #F6F8FA;
  border-radius: 5px;
  padding: 35px 30px;
  position: sticky;
  top: 20px;
}

.order-summary__title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #1F2432;
}

.order-summary__row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  font-size: 16px;
  font-weight: 500;
  color: #1F2432;
}

.order-summary__divider {
  height: 1px;
  background: #e0e0e0;
  margin: 15px 0;
}

.order-summary__total {
  font-size: 18px;
  font-weight: 600;
  color: #1F2432;
  margin-bottom: 25px;
}

.order-summary__button {
  width: 100%;
  background: #0069B4;
  color: white;
  border: none;
  padding: 14px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}

.order-summary__button:hover {
  background: #005795;
}

.order-summary__button-one-click {
  width: 100%;
  background: white;
  color: #0069B4;
  padding: 14px;
  border-radius: 4px;
  border: 1px solid #0069B4;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 12px;
  transition: background 0.2s;
}

.order-summary__button-one-click:hover {
  background: #f7f7f7;
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

  .row {
    flex-direction: column;
    align-items: flex-start;
  }

  .row__left {
    padding-right: 0;
  }

  .installation-block__checkbox {
    flex-wrap: wrap;
  }

  .installation-block__icon {
    width: 40px;
    height: 40px;
  }
}
</style>