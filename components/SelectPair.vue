<script setup lang="ts">
const { availablePairs, fetchPairs, addPair } = usePairs()

const selectedPair = ref('')

onMounted(() => {
  fetchPairs()
})

function addSelectedPair() {
  addPair(selectedPair.value)
  selectedPair.value = ''
}
</script>

<template>
  <div>
    <select v-model="selectedPair" class="border border-gray-300 rounded-md p-1">
      <option v-for="pair in availablePairs" :key="pair" :value="pair">{{ pair }}</option>
    </select>
    <button @click="addSelectedPair" class="bg-blue-500 text-white px-2 py-1 rounded-md">Add</button>
  </div>
</template>