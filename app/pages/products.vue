<script setup>
useHead({
  title: 'Список продуктів'
})

const { data: products } = await useFetch('/api/products')
</script>

<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-6">Список продуктів</h1>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div
          v-for="product in products"
          :key="product.id"
          class="border rounded-lg p-4 shadow"
      >
        <img :src="product.thumbnail" :alt="product.title" class="w-full h-40 object-cover rounded mb-2">
        <h2 class="font-bold text-lg">{{ product.title }}</h2>
        <p class="text-gray-500 text-sm">{{ product.description }}</p>
        <p class="text-green-600 font-bold mt-2">${{ product.price }}</p>
        <p :class="product.rating >= 4.5 ? 'text-green-500' : 'text-red-500'">
          ⭐ {{ product.rating }}
        </p>
      </div>
    </div>
  </div>
</template>