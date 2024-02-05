<script setup lang="ts">
import { onMounted } from 'vue';

const props = defineProps({
  pair: {
    type: String,
    required: true,
  },
  updateInterval: {
    type: Number,
    default: 60_000,
  },
});

const { ticker, fetchTicker } = useTicker(props.pair);
const updateIntervalHandler = ref<NodeJS.Timeout>();

onMounted(async () => {
  await fetchTicker();
  updateIntervalHandler.value = setInterval(async () => {
    await fetchTicker();
  }, props.updateInterval);
});

onBeforeUnmount(() => {
  clearInterval(updateIntervalHandler.value);
});
</script>

<template>
  <div class="text-sm">
    {{ ticker }}
  </div>
</template>