<script setup lang="ts">
const { data: trades } = await useFetch('/api/trades', { method: 'POST', body: { pair: 'LINKUSD'} })

const buyTrades = computed(() => trades.value?.filter(trade => trade.type === 'buy') || [])
const buyCostSum = computed(() => buyTrades.value?.reduce((acc, trade) => acc + parseFloat(trade.cost), 0) || 0)
const buyVolSum = computed(() => buyTrades.value?.reduce((acc, trade) => acc + parseFloat(trade.vol), 0) || 0)

const sellTrades = computed(() => trades.value?.filter(trade => trade.type === 'sell') || [])
const sellCostSum = computed(() => sellTrades.value?.reduce((acc, trade) => acc + parseFloat(trade.cost), 0) || 0)
const sellVolSum = computed(() => sellTrades.value?.reduce((acc, trade) => acc + parseFloat(trade.vol), 0) || 0)

const averageBuyPrice = computed(() => {
  if (!buyTrades.value?.length) return 0

  return buyCostSum.value / buyVolSum.value
})
const averageSellPrice = computed(() => {
  if (!sellTrades.value?.length) return 0

  return sellCostSum.value / sellVolSum.value
})
const percentage = computed(() => {
  if (!averageBuyPrice.value || !averageSellPrice.value) return 0

  return ((averageSellPrice.value - averageBuyPrice.value) / averageBuyPrice.value) * 100
})
</script>

<template>
  <div>
    <h1>Trades</h1>
    <table>
      <tr>
        <th>Average Buy</th>
        <th>Average Sell</th>
        <th>Diff.</th>
      </tr>
      <tr>
        <td>{{ averageBuyPrice.toFixed(3) }}</td>
        <td>{{ averageSellPrice.toFixed(3) }}</td>
        <td>{{ percentage.toFixed(2) }}%</td>
      </tr>
      <tr>
        <td>{{ buyCostSum.toFixed(2) }}</td>
        <td>{{ sellCostSum.toFixed(2) }}</td>
        <td></td>
      </tr>
      <tr>
        <td>{{ buyVolSum.toFixed(3) }}</td>
        <td>{{ sellVolSum.toFixed(3) }}</td>
        <td></td>
      </tr>
      <tr>
        <th>Type</th>
        <th>Price</th>
        <th>Volume</th>
      </tr>
      <tr v-for="trade in trades" :key="trade.ordertxid">
        <td>{{ trade.type }}</td>
        <td>{{ parseFloat(trade.price).toFixed(3) }}</td>
        <td>{{ parseFloat(trade.vol).toFixed(3) }}</td>
      </tr>
    </table>
  </div>
</template>