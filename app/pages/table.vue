<script setup>
useHead({
  title: 'Таблиця продуктів'
})

const { data: products } = await useFetch('/api/products')

const globalFilter = ref('')
const pagination = ref({ pageIndex: 0, pageSize: 10 })
const sorting = ref([])

const columns = [
  { accessorKey: 'title', header: 'Назва', enableSorting: true },
  { accessorKey: 'description', header: 'Опис', enableSorting: true },
  { accessorKey: 'price', header: 'Ціна', enableSorting: true },
  { accessorKey: 'rating', header: 'Оцінка', enableSorting: true },
  { accessorKey: 'brand', header: 'Бренд', enableSorting: true },
  { accessorKey: 'category', header: 'Категорія', enableSorting: true },
  { accessorKey: 'thumbnail', header: 'Фото', enableSorting: false },
]

const filteredData = computed(() => {
  if (!globalFilter.value) return products.value || []
  return (products.value || []).filter(p =>
      Object.values(p).some(v =>
          String(v).toLowerCase().includes(globalFilter.value.toLowerCase())
      )
  )
})

const sortedData = computed(() => {
  if (!sorting.value.length) return filteredData.value
  const { id, desc } = sorting.value[0]
  return [...filteredData.value].sort((a, b) => {
    if (a[id] < b[id]) return desc ? 1 : -1
    if (a[id] > b[id]) return desc ? -1 : 1
    return 0
  })
})

const totalPages = computed(() =>
    Math.ceil(sortedData.value.length / pagination.value.pageSize)
)

const paginatedData = computed(() => {
  const start = pagination.value.pageIndex * pagination.value.pageSize
  return sortedData.value.slice(start, start + pagination.value.pageSize)
})
</script>

<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-6">Таблиця продуктів</h1>

    <input
        v-model="globalFilter"
        placeholder="Пошук..."
        class="border rounded px-3 py-2 mb-4 w-full"
    />

    <table class="w-full border-collapse border">
      <thead>
      <tr>
        <th
            v-for="col in columns"
            :key="col.accessorKey"
            class="border p-2 bg-gray-100 cursor-pointer text-left"
            @click="col.enableSorting && (sorting = sorting[0]?.id === col.accessorKey && !sorting[0]?.desc ? [{ id: col.accessorKey, desc: true }] : [{ id: col.accessorKey, desc: false }])"
        >
          {{ col.header }}
          <span v-if="sorting[0]?.id === col.accessorKey">
              {{ sorting[0]?.desc ? '↓' : '↑' }}
            </span>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="product in paginatedData" :key="product.id" class="hover:bg-gray-50">
        <td class="border p-2">{{ product.title }}</td>
        <td class="border p-2 text-sm">{{ product.description }}</td>
        <td class="border p-2">${{ product.price }}</td>
        <td class="border p-2" :class="product.rating >= 4.5 ? 'text-green-500' : 'text-red-500'">
          {{ product.rating }}
        </td>
        <td class="border p-2">{{ product.brand }}</td>
        <td class="border p-2">{{ product.category }}</td>
        <td class="border p-2">
          <img :src="product.thumbnail" :alt="product.title" style="width:100px;height:100px;object-fit:cover">
        </td>
      </tr>
      </tbody>
    </table>

    <div class="flex gap-2 mt-4 items-center">
      <button
          class="border px-3 py-1 rounded"
          :disabled="pagination.pageIndex === 0"
          @click="pagination.pageIndex--"
      >
        ←
      </button>
      <span>Сторінка {{ pagination.pageIndex + 1 }} з {{ totalPages }}</span>
      <button
          class="border px-3 py-1 rounded"
          :disabled="pagination.pageIndex >= totalPages - 1"
          @click="pagination.pageIndex++"
      >
        →
      </button>
    </div>
  </div>
</template>