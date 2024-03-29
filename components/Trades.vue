<script setup lang="ts">
const props = defineProps({
  pair: {
    type: String,
    required: true,
  },
});

const {
  pairTrades,
  startDateInput,
  pairFees,
  pairInfo,
  averageBuyPrice,
  averageSellPrice,
  averagePriceGap,
  buyCostSum,
  sellCostSum,
  buyVolSum,
  sellVolSum,
} = await useTrades(props.pair)
const { removePair } = usePairs()
const showTrades = ref(false)
</script>

<template>
  <div class="border rounded-xl max-w-screen-sm text-sm">
    <h1 class="text-2xl font-bold px-4 py-2 border-b flex items-center">
      <span class="mr-3">
        {{ pair }}
      </span>
      <Ticker :pair="pair" />
      <button @click="removePair(pair)" class="bg-transparent text-gray-400 w-auto ml-auto">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>
    </h1>
    <div class="flex items-center justify-between border-b">
      <div class="px-3">
        Start:
      </div>
      <input
        v-model="startDateInput"
        type="datetime-local"
        class="p-3"
      />
    </div>
    <div class="w-full p-3">
      <div class="flex justify-between items-center">
        <div>Average Buy</div>
        <div>{{ averageBuyPrice.toFixed(3) }}</div>
      </div>
      <div class="flex justify-between items-center">
        <div>Average Sell</div>
        <div>{{ averageSellPrice.toFixed(3) }}</div>
      </div>
      <div class="flex justify-between items-center">
        <div>Diff.</div>
        <div>{{ averagePriceGap.toFixed(2) }}%</div>
      </div>
      <div class="flex justify-between items-center">
        <div>Bought</div>
        <div>{{ buyVolSum.toFixed(3) }} {{ pairInfo?.base }}</div>
        <div>for {{ buyCostSum.toFixed(2) }} {{ pairInfo?.quote }}</div>
      </div>
      <div class="flex justify-between items-center">
        <div>Sold</div>
        <div>{{ sellVolSum.toFixed(3) }} {{ pairInfo?.base }}</div>
        <div>for {{ sellCostSum.toFixed(2) }} {{ pairInfo?.quote }}</div>
      </div>
      <div class="mt-3">
        <button @click="showTrades = !showTrades">
          {{ showTrades ? 'Hide' : 'Show' }} Trades
        </button>
      </div>
      <div v-if="showTrades">
        <div>
          Fees: {{ pairFees.toFixed(2) }} {{ pairInfo?.quote }}
        </div>
        <div>
          Trade Result: {{ (sellCostSum - buyCostSum).toFixed(2) }} {{ pairInfo?.quote }}
        </div>
        <div>
          Win: {{ (sellCostSum - buyCostSum - pairFees).toFixed(2) }} {{ pairInfo?.quote }}
        </div>
        <div class="grid grid-cols-4 mt-3">
          <div>Type</div>
          <div>Date</div>
          <div>Price</div>
          <div>Volume</div>
        </div>
        <div v-for="(trade, i in pairTrades" :key="trade.ordertxid" class="grid grid-cols-4" :class="trade.type === 'buy' ? 'text-green-500' : 'text-red-500'">
          <div>{{ trade.type }}</div>
          <div>{{ new Date(trade.time * 1000).toLocaleTimeString() }}</div>
          <div>{{ parseFloat(trade.price).toFixed(4) }}</div>
          <div>{{ parseFloat(trade.vol).toFixed(4) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>