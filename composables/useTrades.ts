export default async function useTrades(pair: string) {
  const {
    data: trades,
    error: tradesError,
    refresh: refreshTrades,
  } = await useFetch('/api/trades', { method: 'POST', body: { pair } })
  
  const { availablePairs } = usePairs();

  const pairInfo = computed<PairInfo | undefined>(() => availablePairs.value[pair])

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
  const averagePriceGap = computed(() => {
    if (!averageBuyPrice.value || !averageSellPrice.value) return 0

    return ((averageSellPrice.value - averageBuyPrice.value) / averageBuyPrice.value) * 100
  })
  
  return {
    trades,
    tradesError,
    refreshTrades,
    pairInfo,
    buyTrades,
    buyCostSum,
    buyVolSum,
    sellTrades,
    sellCostSum,
    sellVolSum,
    averageBuyPrice,
    averageSellPrice,
    averagePriceGap,
  }
}