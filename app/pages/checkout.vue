<script setup>
useHead({
  title: 'Оплата підписки'
})

const subscriptionStore = useSubscriptionStore()

const form = ref({
  name: '',
  email: '',
  plan: ''
})

const result = ref(null)
const error = ref(null)

const plans = [
  { value: 'basic', label: 'Basic - $9.99/міс' },
  { value: 'pro', label: 'Pro - $19.99/міс' },
  { value: 'enterprise', label: 'Enterprise - $49.99/міс' },
]

const handleSubmit = async () => {
  error.value = null
  result.value = null

  try {
    const response = await $fetch('/api/subscription/create', {
      method: 'POST',
      body: form.value
    })
    subscriptionStore.selectPlan(form.value.plan)
    result.value = response
  } catch (e) {
    error.value = e.data?.message || 'Помилка оформлення'
  }
}
</script>

<template>
  <div class="p-8 max-w-md mx-auto">
    <h1 class="text-2xl font-bold mb-6">Оплата підписки</h1>

    <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
      <div>
        <label class="block mb-1">Ім'я</label>
        <input
            v-model="form.name"
            type="text"
            placeholder="Ваше ім'я"
            class="border rounded px-3 py-2 w-full"
            required
        />
      </div>

      <div>
        <label class="block mb-1">Email</label>
        <input
            v-model="form.email"
            type="email"
            placeholder="email@example.com"
            class="border rounded px-3 py-2 w-full"
            required
        />
      </div>

      <div>
        <label class="block mb-1">Тариф</label>
        <select v-model="form.plan" class="border rounded px-3 py-2 w-full" required>
          <option value="">Оберіть тариф</option>
          <option v-for="plan in plans" :key="plan.value" :value="plan.value">
            {{ plan.label }}
          </option>
        </select>
      </div>

      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Оформити підписку
      </button>
    </form>

    <div v-if="result" class="mt-4 p-4 bg-green-100 text-green-700 rounded">
      {{ result.message }}
    </div>

    <div v-if="subscriptionStore.selectedPlan" class="mt-4 p-4 bg-blue-100 text-blue-700 rounded">
      Обраний тариф: {{ subscriptionStore.selectedPlan }}
    </div>

    <div v-if="error" class="mt-4 p-4 bg-red-100 text-red-700 rounded">
      {{ error }}
    </div>
  </div>
</template>