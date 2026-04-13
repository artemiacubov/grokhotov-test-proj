// types/index.ts

// Тип для товара в корзине
export interface CartItem {
    id: number
    name: string
    price: number
    quantity: number
    image: string
    description: string
    shortDescription: string
    article: string
}

// Тип для добавляемого товара
export interface Product {
    id: number
    name: string
    price: number
    priceEuro: number  // цена в евро
    image: string
    description: string
    shortDescription: string
    article?: string
    performance?: string
    noise?: string
    power?: string
    diameter?: string
    sensors?: string
}

// Тип для ответа сервера
export interface OrderResponse {
    success: boolean
    orderId?: number
    message?: string
}

// Тип для данных заказа
export interface OrderData {
    items: CartItem[]
    totalPrice: number
    totalItems: number
    hasInstallation: boolean
    orderDate: string
}