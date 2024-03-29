const {
  data: allTrades,
  error: tradesError,
  refresh: refreshTrades,
} = await useFetch('/api/trades', { method: 'POST' })

export default async function useTrades(pair: string) {
  const { availablePairs } = usePairs();

  const startDateInput = ref(new Date().toISOString().slice(0, 16))
  const startDate = computed(() => {
    return new Date(startDateInput.value)
  })

  const pairTrades = computed(() => {
    if (!allTrades.value) return []

    return allTrades.value
      .filter(trade => trade.pair === pair)
      .filter(trade => {
        console.log('trade.time', new Date(trade.time * 1000))
        console.log('startDate.value', startDate.value)

        return new Date(trade.time * 1000) >= startDate.value
      })
  })
  const pairInfo = computed<PairInfo | undefined>(() => availablePairs.value[pair])

  const pairFees = computed(() => pairTrades.value?.reduce((acc, trade) => acc + parseFloat(trade.fee), 0) || 0)
  
  const buyTrades = computed(() => pairTrades.value?.filter(trade => trade.type === 'buy') || [])
  const buyCostSum = computed(() => buyTrades.value?.reduce((acc, trade) => acc + parseFloat(trade.cost), 0) || 0)
  const buyVolSum = computed(() => buyTrades.value?.reduce((acc, trade) => acc + parseFloat(trade.vol), 0) || 0)

  const sellTrades = computed(() => pairTrades.value?.filter(trade => trade.type === 'sell') || [])
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
    allTrades,
    startDateInput,
    startDate,
    pairTrades,
    pairFees,
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