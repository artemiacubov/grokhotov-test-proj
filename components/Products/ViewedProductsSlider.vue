<template>
  <div class="viewed-slider">
    <!-- Кастомная навигация сверху справа -->
    <div class="viewed-slider__nav">
      <button
          class="viewed-slider__nav-btn viewed-slider__nav-btn_prev"
          @click="swiperInstance?.slidePrev()"
          :disabled="isBeginning"
      >
        ‹
      </button>
      <span class="viewed-slider__nav-pagination">
        {{ currentSlide }} / {{ correctedTotalSlides }}
      </span>
      <button
          class="viewed-slider__nav-btn viewed-slider__nav-btn_next"
          @click="swiperInstance?.slideNext()"
          :disabled="isEnd"
      >
        ›
      </button>
    </div>

    <div class="viewed-slider__container">
      <Swiper
          :modules="[SwiperNavigation, SwiperPagination]"
          :slides-per-view="slidesPerView"
          :space-between="20"
          :navigation="false"
          :pagination="{
          clickable: true,
          dynamicBullets: false
        }"
          :breakpoints="{
          320: { slidesPerView: 1, spaceBetween: 16 },
          640: { slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 3, spaceBetween: 20 },
          1024: { slidesPerView: 4, spaceBetween: 20 }
        }"
          class="viewed-slider__swiper"
          @swiper="onSwiper"
          @slideChange="onSlideChange"
      >
        <SwiperSlide v-for="product in availableProducts" :key="product.id">
          <div class="viewed-product">
            <div class="viewed-product__image">
              <img :src="product.image" :alt="product.name">
            </div>
            <h4 class="viewed-product__title">{{ product.name }}</h4>
            <p class="viewed-product__description">{{ product.description }}</p>
            <div class="viewed-product__prices">
              <div class="viewed-product__price-rub">
                {{ product.price.toLocaleString() }} ₽
              </div>
              <div class="viewed-product__price-euro">
                {{ product.priceEuro.toLocaleString() }} €
              </div>
            </div>
            <button class="viewed-product__button viewed-product__button_details" @click="openModal(product)">
              Подробнее
            </button>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>

    <!-- Модальное окно с деталями товара -->
    <div v-if="selectedProduct" class="modal" @click.self="closeModal">
      <div class="modal__content">
        <button class="modal__close" @click="closeModal">×</button>
        <div class="modal__image">
          <img :src="selectedProduct.image" :alt="selectedProduct.name">
        </div>
        <h2 class="modal__title">{{ selectedProduct.name }}</h2>
        <div class="modal__short-description">{{ selectedProduct.shortDescription }}</div>
        <div class="modal__specs">
          <div class="modal__spec-row">
            <span class="modal__spec-label">Производительность:</span>
            <span class="modal__spec-value">{{ selectedProduct.performance }}</span>
          </div>
          <div class="modal__spec-row">
            <span class="modal__spec-label">Уровень шума:</span>
            <span class="modal__spec-value">{{ selectedProduct.noise }}</span>
          </div>
          <div class="modal__spec-row">
            <span class="modal__spec-label">Мощность:</span>
            <span class="modal__spec-value">{{ selectedProduct.power }}</span>
          </div>
          <div class="modal__spec-row">
            <span class="modal__spec-label">Диаметр воздуховода:</span>
            <span class="modal__spec-value">{{ selectedProduct.diameter }}</span>
          </div>
          <div class="modal__spec-row">
            <span class="modal__spec-label">Датчики:</span>
            <span class="modal__spec-value">{{ selectedProduct.sensors }}</span>
          </div>
        </div>
        <div class="modal__price">{{ selectedProduct.price.toLocaleString() }} ₽</div>
        <button class="modal__cart-btn" @click="addToCartAndClose(selectedProduct)">
          В корзину
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import type { Product } from '~/type/type'
import AWENTAImage from '~/assets/imagines/products/AWENTAINSIDEWI100H.png'
import BalluImage from '~/assets/imagines/products/BalluBAF-EX100НС.png'
import CataImage from '~/assets/imagines/products/CataE100GTH.png'
import FaberImage from '~/assets/imagines/products/FaberLUFTXA60.png'
import KortingKHCImage from '~/assets/imagines/products/KortingKHC67590GN.png'
import KortingKHIImage from '~/assets/imagines/products/KortingKHI9997GN.png'
import KortingKHPImage from '~/assets/imagines/products/KortingKHP6512W.png'
import SolerImage from '~/assets/imagines/products/Soler&PalauDecor100CD.png'
import TuvioVImage from '~/assets/imagines/products/TuvioВстраиваемая.png'
import TuvioTImage from '~/assets/imagines/products/TuvioТелескопическая.png'

const SwiperNavigation = Navigation
const SwiperPagination = Pagination

const emit = defineEmits<{
  (e: 'addToCart', product: Product): void
}>()

let swiperInstance: SwiperType | null = null
const currentSlide = ref(1)
const totalSlides = ref(0)
const correctedTotalSlides = ref(0)
const isBeginning = ref(true)
const isEnd = ref(false)
const slidesPerView = ref(4)
const selectedProduct = ref<Product | null>(null)

const openModal = (product: Product) => {
  selectedProduct.value = product
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  selectedProduct.value = null
  document.body.style.overflow = ''
}

const addToCartAndClose = (product: Product) => {
  emit('addToCart', product)
  closeModal()
}

const onSwiper = (swiper: SwiperType) => {
  swiperInstance = swiper
  totalSlides.value = swiper.slides.length
  correctedTotalSlides.value = totalSlides.value - 3
  currentSlide.value = swiper.activeIndex + 1
  isBeginning.value = swiper.isBeginning
  isEnd.value = swiper.isEnd
}

const onSlideChange = (swiper: SwiperType) => {
  currentSlide.value = swiper.activeIndex + 1
  isBeginning.value = swiper.isBeginning
  isEnd.value = swiper.isEnd
}

// 10 вытяжных устройств
const availableProducts = ref<Product[]>([
  {
    id: 1,
    name: 'AWENTA INSIDE WI100 H',
    price: 3211,
    priceEuro: 36.50,
    image: AWENTAImage,
    shortDescription: '102 м³/ч / датчик влажности / 35 дБ',
    description: 'Вытяжное устройство для принудительной вентиляции кухонь и санузлов. Оснащено датчиком влажности, антивибрационной конструкцией и улучшенной аэродинамикой.',
    article: 'WI100H',
    performance: '102 м³/ч',
    noise: '35 дБ',
    power: '10 Вт',
    diameter: '100 мм',
    sensors: 'Датчик влажности'
  },
  {
    id: 2,
    name: 'Soler&Palau Decor 100CD',
    price: 9310,
    priceEuro: 105.80,
    image: SolerImage,
    shortDescription: '95 м³/ч / датчик движения / 26.5 дБ',
    description: 'Вытяжной вентилятор с инфракрасным датчиком движения и регулируемым таймером отключения (1-30 мин). Серебристый цвет, стильный дизайн.',
    article: '03-0103-002',
    performance: '95 м³/ч',
    noise: '26.5 дБ',
    power: '8 Вт',
    diameter: '100 мм',
    sensors: 'Датчик движения, таймер'
  },
  {
    id: 3,
    name: 'Ballu BAF-EX 100 НС',
    price: 1290,
    priceEuro: 14.65,
    image: BalluImage,
    shortDescription: '80 м³/ч / автоматические жалюзи / 31 дБ',
    description: 'Бытовой вытяжной вентилятор для небольших помещений. Автоматические жалюзи предотвращают обратный приток воздуха. Низкий уровень шума.',
    article: 'BAF-EX100',
    performance: '80 м³/ч',
    noise: '31 дБ',
    power: '12 Вт',
    diameter: '100 мм',
    sensors: 'Автоматические жалюзи'
  },
  {
    id: 4,
    name: 'Korting KHI 9997 GN',
    price: 45990,
    priceEuro: 522.50,
    image: KortingKHIImage,
    shortDescription: '950 м³/ч / периметральное всасывание / сенсор дыма',
    description: 'Полновстраиваемая вытяжка с технологией периметрального всасывания. Сенсор дыма и пара автоматически управляет режимом работы.',
    article: 'KHI9997',
    performance: '950 м³/ч',
    noise: '53 дБ',
    power: '244 Вт',
    diameter: '150 мм',
    sensors: 'Сенсор дыма и пара, таймер'
  },
  {
    id: 5,
    name: 'Korting KHP 6512 W',
    price: 18990,
    priceEuro: 215.80,
    image: KortingKHPImage,
    shortDescription: '550 м³/ч / выдвижной экран / LED подсветка',
    description: 'Вытяжка с выдвижным экраном, встраиваемая в кухонный шкаф. Алюминиевые жировые фильтры, LED освещение.',
    article: 'KHP6512',
    performance: '550 м³/ч',
    noise: '54 дБ',
    power: '190 Вт',
    diameter: '150/120 мм',
    sensors: 'Нет'
  },
  {
    id: 6,
    name: 'Faber LUFT X A60',
    price: 214300,
    priceEuro: 2435.00,
    image: FaberImage,
    shortDescription: '710 м³/ч / Т-образная / интенсивный режим',
    description: 'Настенная купольная вытяжка премиум-класса. Сенсорное управление, интенсивный режим, LED освещение.',
    article: 'LUFTXA60',
    performance: '710 м³/ч',
    noise: '68 дБ',
    power: '280 Вт',
    diameter: '150 мм',
    sensors: 'Нет'
  },
  {
    id: 7,
    name: 'Cata E100GTH',
    price: 8500,
    priceEuro: 96.60,
    image: CataImage,
    shortDescription: '115 м³/ч / LED-дисплей / датчик влажности',
    description: 'Вытяжной вентилятор с LED-дисплеем, отображающим температуру и уровень влажности. Испанское качество, стильный дизайн.',
    article: 'E100GTH',
    performance: '115 м³/ч',
    noise: '31 дБ',
    power: '8 Вт',
    diameter: '100 мм',
    sensors: 'Датчик влажности, таймер, LED-дисплей'
  },
  {
    id: 8,
    name: 'Tuvio Телескопическая',
    price: 7990,
    priceEuro: 90.80,
    image: TuvioTImage,
    shortDescription: 'до 12 м² / 115 Вт / механическое управление',
    description: 'Компактная телескопическая вытяжка для небольших кухонь до 12 м². Корпус из окрашенного металла, легко очищается.',
    article: 'TUVIO-TEL',
    performance: '250 м³/ч',
    noise: '49 дБ',
    power: '115 Вт',
    diameter: '120 мм',
    sensors: 'Нет'
  },
  {
    id: 9,
    name: 'Tuvio Встраиваемая',
    price: 12990,
    priceEuro: 147.60,
    image: TuvioVImage,
    shortDescription: 'до 20 м² / 200 Вт / функция задержки выключения',
    description: 'Встраиваемая вытяжка для кухонь до 20 м². Сенсорное управление, функция задержки выключения 3 минуты.',
    article: 'TUVIO-INS',
    performance: '550 м³/ч',
    noise: '52 дБ',
    power: '200 Вт',
    diameter: '150 мм',
    sensors: 'Таймер'
  },
  {
    id: 10,
    name: 'Korting KHC 67590 GN',
    price: 28990,
    priceEuro: 329.40,
    image: KortingKHCImage,
    shortDescription: '800 м³/ч / наклонная / Ambiance light',
    description: 'Наклонная настенная вытяжка с функцией Ambiance light. 3 режима работы, сенсорное управление, LED подсветка.',
    article: 'KHC67590',
    performance: '800 м³/ч',
    noise: '52 дБ',
    power: '190 Вт',
    diameter: '150/120 мм',
    sensors: 'Таймер'
  }
])
</script>

<style scoped>
.viewed-slider {
  padding: 20px 0;
  width: 100%;
  position: relative;
  overflow-x: hidden;
}

/* Кастомная навигация сверху справа */
.viewed-slider__nav {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  margin-bottom: 20px;
}

.viewed-slider__nav-btn {
  width: 36px;
  height: 36px;
  border: 1px solid #0069B4;
  background: white;
  color: #0069B4;
  font-size: 24px;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.viewed-slider__nav-btn:hover:not(:disabled) {
  background: #0069B4;
  color: white;
}

.viewed-slider__nav-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
  border-color: #ccc;
  color: #ccc;
}

.viewed-slider__nav-pagination {
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #1F2432;
  min-width: 40px;
  text-align: center;
}

/* Контейнер для Swiper */
.viewed-slider__container {
  width: 100%;
  overflow: hidden;
  position: relative;
}

.viewed-slider__swiper {
  width: 100%;
  overflow: visible !important;
}

:deep(.swiper) {
  width: 100%;
  overflow: visible !important;
}

:deep(.swiper-wrapper) {
  display: flex;
  width: 100%;
}

:deep(.swiper-slide) {
  height: auto;
  width: auto;
  flex-shrink: 0;
}

/* Карточка товара */
.viewed-product {
  background: #F6F8FA;
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  transition: all 0.3s;
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
}

.viewed-product:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
}

.viewed-product__image {
  width: 100%;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  overflow: hidden;
}

.viewed-product__image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.viewed-product__title {
  font-size: 16px;
  font-weight: bold;
  margin: 0 0 8px 0;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.viewed-product__description {
  font-size: 12px;
  color: #666;
  margin: 0 0 12px 0;
  line-height: 1.4;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.viewed-product__prices {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 4px;
  margin-bottom: 15px;
}

.viewed-product__price-rub {
  font-size: 18px;
  font-weight: bold;
  color: #1F2432;
}

.viewed-product__price-euro {
  font-size: 14px;
  font-weight: 400;
  color: #797B86;
}

.viewed-product__button {
  padding: 10px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
  width: 100%;
  margin-bottom: 8px;
}

.viewed-product__button_details {
  background: #0069B4;
  color: white;
  border: 1px solid #0069B4;
}

.viewed-product__button_details:hover {
  background: #005795;
}

/* Скрываем стандартную навигацию Swiper */
:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  display: none;
}

/* Пагинация (точки) */
:deep(.swiper-pagination) {
  position: relative !important;
  bottom: 0 !important;
  margin-top: 30px;
  display: flex;
  justify-content: center;
  gap: 8px;
}

:deep(.swiper-pagination-bullet) {
  width: 8px;
  height: 8px;
  background: #ccc;
  opacity: 1;
  border-radius: 50%;
  transition: all 0.2s;
  cursor: pointer;
}

:deep(.swiper-pagination-bullet-active) {
  background: #0069B4;
  width: 24px;
  border-radius: 4px;
}

/* Модальное окно */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal__content {
  background: white;
  border-radius: 12px;
  padding: 24px;
  max-width: 500px;
  width: 90%;
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
}

.modal__close {
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: #999;
  transition: color 0.2s;
}

.modal__close:hover {
  color: #f44336;
}

.modal__image {
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.modal__image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.modal__title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
  text-align: center;
  color: #333;
}

.modal__short-description {
  font-size: 14px;
  color: #0069B4;
  text-align: center;
  margin-bottom: 20px;
  padding: 8px;
  background: #F6F8FA;
  border-radius: 8px;
  font-weight: 500;
}

.modal__specs {
  margin-bottom: 20px;
}

.modal__spec-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
}

.modal__spec-label {
  font-size: 14px;
  color: #666;
}

.modal__spec-value {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.modal__price {
  font-size: 24px;
  font-weight: bold;
  color: #0069B4;
  text-align: center;
  margin-bottom: 20px;
}

.modal__cart-btn {
  width: 100%;
  background: #0069B4;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}

.modal__cart-btn:hover {
  background: #005795;
}

/* Адаптив для мобильных */
@media (max-width: 768px) {
  .viewed-slider__nav-btn {
    width: 32px;
    height: 32px;
    font-size: 20px;
  }

  .viewed-slider__nav-pagination {
    font-size: 12px;
    min-width: 35px;
  }

  .viewed-product__title {
    font-size: 14px;
    white-space: normal;
  }

  :deep(.swiper-pagination-bullet-active) {
    width: 20px;
  }
}
</style>