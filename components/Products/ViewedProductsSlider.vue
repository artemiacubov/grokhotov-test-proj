<template>
  <div class="viewed-slider">
    <Swiper
        :modules="[SwiperNavigation, SwiperPagination]"
        :slides-per-view="4"
        :space-between="20"
        :navigation="true"
        :pagination="{ clickable: true }"
        :breakpoints="{
        320: { slidesPerView: 1, spaceBetween: 20 },
        640: { slidesPerView: 2, spaceBetween: 20 },
        768: { slidesPerView: 3, spaceBetween: 20 },
        1024: { slidesPerView: 4, spaceBetween: 20 }
      }"
        class="viewed-slider__swiper"
    >
      <SwiperSlide v-for="product in availableProducts" :key="product.id">
        <div class="viewed-product">
          <div class="viewed-product__image">
            <img :src="product.image" :alt="product.name">
          </div>
          <h4 class="viewed-product__title">{{ product.name }}</h4>
          <p class="viewed-product__description">{{ product.description }}</p>
          <div class="viewed-product__price">
            {{ product.price.toLocaleString() }} ₽
          </div>
          <button class="viewed-product__button" @click="emit('addToCart', product)">
            В корзину
          </button>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'

const SwiperNavigation = Navigation
const SwiperPagination = Pagination

const emit = defineEmits(['addToCart'])

// Товары для добавления в корзину
const availableProducts = ref([
  {
    id: 1,
    name: 'BXC',
    price: 6848,
    image: 'https://via.placeholder.com/200x150?text=BXC',
    description: 'Вытяжное устройство для механической системы вентиляции',
    article: 'BXC1001',
    installationPrice: 1500
  },
  {
    id: 2,
    name: 'G2H',
    price: 12584,
    image: 'https://via.placeholder.com/200x150?text=G2H',
    description: 'Многофункциональное вытяжное устройство для естественной и гибридной вентиляции',
    article: 'G2H1065',
    installationPrice: 2000
  },
  {
    id: 3,
    name: 'GHN',
    price: 12644,
    image: 'https://via.placeholder.com/200x150?text=GHN',
    description: 'Вытяжное устройство с датчиком присутствия',
    article: 'GHN2034',
    installationPrice: 1800
  },
  {
    id: 4,
    name: 'TDA',
    price: 25288,
    image: 'https://via.placeholder.com/200x150?text=TDA',
    description: 'Вытяжное устройство с датчиком присутствия и управлением',
    article: 'TDA3098',
    installationPrice: 2500
  },
  {
    id: 5,
    name: 'VHC',
    price: 50576,
    image: 'https://via.placeholder.com/200x150?text=VHC',
    description: 'Вытяжное устройство премиум класса',
    article: 'VHC5000',
    installationPrice: 3500
  }
])
</script>

<style scoped>
.viewed-slider {
  padding: 20px 0;
}

.viewed-slider__swiper {
  padding: 10px 0 40px;
  overflow: visible !important;
}

:deep(.swiper) {
  overflow: visible !important;
}

.viewed-product {
  background: white;
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  transition: all 0.3s;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.viewed-product:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
}

.viewed-product__image img {
  width: 100%;
  height: 140px;
  object-fit: contain;
  margin-bottom: 12px;
}

.viewed-product__title {
  font-size: 18px;
  font-weight: bold;
  margin: 0 0 8px 0;
  color: #333;
}

.viewed-product__description {
  font-size: 12px;
  color: #666;
  margin: 0 0 12px 0;
  line-height: 1.4;
  flex: 1;
}

.viewed-product__price {
  font-size: 18px;
  font-weight: bold;
  color: #4caf50;
  margin-bottom: 15px;
}

.viewed-product__button {
  background: #4caf50;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
  width: 100%;
}

.viewed-product__button:hover {
  background: #45a049;
  transform: scale(1.02);
}

:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  color: #4caf50;
  background: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

:deep(.swiper-button-next:after),
:deep(.swiper-button-prev:after) {
  font-size: 18px;
}

:deep(.swiper-button-next:hover),
:deep(.swiper-button-prev:hover) {
  background: #4caf50;
  color: white;
}

:deep(.swiper-pagination-bullet-active) {
  background: #4caf50;
}

:deep(.swiper-pagination) {
  bottom: 0;
}
</style>