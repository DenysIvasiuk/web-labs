import { defineStore } from 'pinia'

export const useSubscriptionStore = defineStore('subscription', () => {
    const selectedPlan = ref(null)

    function selectPlan(plan) {
        selectedPlan.value = plan
    }

    function clearPlan() {
        selectedPlan.value = null
    }

    return {
        selectedPlan,
        selectPlan,
        clearPlan
    }
})