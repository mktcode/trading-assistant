export default function useTicker(pair: string) {
  const ticker = ref(0)

  async function fetchTicker() {
    const response = await fetch(`https://api.kraken.com/0/public/Ticker?pair=${pair}`)
    const data = await response.json()

    ticker.value = data.result[pair].c[0]
  }

  return { ticker, fetchTicker }
}