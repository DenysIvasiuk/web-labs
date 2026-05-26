<script setup>
useHead({
  title: 'Store'
})

const userStore = useUserStore()
const { name, isLoggedIn, welcomeMessage } = storeToRefs(userStore)

const inputName = ref('')

const handleLogin = () => {
  if (inputName.value) {
    userStore.login(inputName.value)
    inputName.value = ''
  }
}
</script>

<template>
  <div class="p-8 max-w-md mx-auto">
    <h1 class="text-2xl font-bold mb-6">{{ welcomeMessage }}</h1>

    <div v-if="!isLoggedIn">
      <input
          v-model="inputName"
          placeholder="Введіть ваше ім'я"
          class="border rounded px-3 py-2 w-full mb-2"
      />
      <button
          @click="handleLogin"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Увійти
      </button>
    </div>

    <div v-else>
      <p class="mb-2">Ви зайшли о: {{ userStore.loginTime }}</p>
      <button
          @click="userStore.logout"
          class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Вийти
      </button>
    </div>
  </div>
</template>