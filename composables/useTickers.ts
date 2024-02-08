export type Tickers = {
  [pair: string]: number
}

const tickers = ref<Tickers>({})

export default function useTickers() {

  async function fetchTickers() {
    const response = await fetch(`https://api.kraken.com/0/public/Ticker`)
    const data = await response.json()

    const cleanedTickers = Object.fromEntries(
      Object.entries(data.result)
        .map(([key, value]) => {

          return [key, parseFloat((value as { c: string[] }).c[0])]
        })
    )


    tickers.value = cleanedTickers
  }

  return { tickers, fetchTickers }
}