<script setup lang="ts">
const { watchedPairs } = usePairs()
</script>

<template>
  <div class="flex space-x-3 py-2">
    <Ticker v-for="pair in watchedPairs" :pair="pair" :key="pair" />
    <SelectPair />
  </div>
</template>