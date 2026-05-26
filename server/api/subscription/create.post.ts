export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    // Валідація
    if (!body.plan || !body.email || !body.name) {
        throw createError({
            statusCode: 400,
            message: 'Заповніть всі поля'
        })
    }

    return {
        success: true,
        message: 'Підписку оформлено успішно!',
        data: body
    }
})