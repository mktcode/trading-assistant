<script setup lang="ts">
const { watchedPairs, fetchPairs } = usePairs()

onMounted(() => {
  fetchPairs()
})
</script>


<template>
  <div class="flex flex-col container mx-auto py-12">
    <ClientOnly>
      <SelectPair class="mb-12 mx-auto" />
      <Trades v-for="pair in watchedPairs" :pair="pair" :key="pair" />
    </ClientOnly>
  </div>
</template>