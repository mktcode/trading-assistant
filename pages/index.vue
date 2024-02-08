<script setup lang="ts">
const { watchedPairs, fetchPairs } = usePairs()
const { fetchTickers } = useTickers();

onMounted(() => {
  fetchTickers();
  fetchPairs()
})
</script>


<template>
  <div class="flex flex-col container mx-auto py-12">
    <ClientOnly>
      <SelectPair class="mb-12 mx-auto" />
      <div class="grid grid-cols-4 gap-6">
        <Trades v-for="pair in watchedPairs" :pair="pair" :key="pair" />
      </div>
    </ClientOnly>
  </div>
</template>