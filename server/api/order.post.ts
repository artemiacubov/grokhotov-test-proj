export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    // Валидация
    if (!body.items || !body.items.length) {
        return {
            success: false,
            message: 'Корзина пуста'
        }
    }

    // Здесь можно добавить сохранение в БД
    console.log('Получен заказ:', {
        orderId: Date.now(),
        ...body
    })

    // Имитация обработки
    return {
        success: true,
        orderId: Date.now(),
        message: 'Заказ успешно создан',
        orderData: body
    }
})