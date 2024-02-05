<script setup lang="ts">
const { pairNames, addPair } = usePairs()

const selectedPair = ref('')

function addSelectedPair() {
  addPair(selectedPair.value)
  selectedPair.value = ''
}
</script>

<template>
  <div>
    <select v-model="selectedPair" class="rounded-b-none">
      <option v-for="pair in pairNames" :key="pair" :value="pair">{{ pair }}</option>
    </select>
    <button @click="addSelectedPair" class="rounded-t-none">
      Add
    </button>
  </div>
</template>