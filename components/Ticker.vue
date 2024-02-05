<script setup lang="ts">
import { onMounted } from 'vue';

const props = defineProps({
  pair: {
    type: String,
    required: true,
  },
  updateInterval: {
    type: Number,
    default: 1000,
  },
});

const { ticker, fetchTicker } = useTicker(props.pair);
const { removePair } = usePairs();
const updateIntervalHandler = ref<NodeJS.Timeout>();

onMounted(async () => {
  await fetchTicker();
  updateIntervalHandler.value = setInterval(async () => {
    await fetchTicker();
  }, props.updateInterval);
});

onBeforeUnmount
</script>

<template>
  <div class="flex items-center">
    <div class="text-sm">
      <div class="font-bold">{{ pair }}</div>
      <div>{{ ticker }}</div>
    </div>
    <button @click="removePair(pair)" class="bg-red-500 text-white rounded-full px-2">x</button>
  </div>
</template>