<script setup lang="ts">
const { watchedPairs } = usePairs()
</script>

<template>
  <div class="flex">
    <div class="flex space-x-3 py-2">
      <ClientOnly>
        <Ticker v-for="pair in watchedPairs" :pair="pair" :key="pair" />
      </ClientOnly>
    </div>
    <SelectPair />
  </div>
</template>