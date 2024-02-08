<script setup lang="ts">
const props = defineProps({
  pair: {
    type: String,
    required: true,
  },
});

const { tickers } = useTickers();
const ticker = computed(() => tickers.value[props.pair]);
</script>

<template>
  <div class="text-sm">
    {{ ticker }}
  </div>
</template>