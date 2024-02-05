import qs from "qs";

type Trade = {
  ordertxid: string
  postxid: string
  pair: string
  time: number
  type: string
  ordertype: string
  price: string
  cost: string  
  fee: string
  vol: string
  margin: string
  misc: string
}

export default defineEventHandler(async (event): Promise<Trade[]> => {
  const runtimeConfig = useRuntimeConfig(event)
  const body = await readBody(event)
  const pair = body?.pair || null

  const path = '/0/private/TradesHistory';
  const nonce = new Date().getTime()

  const secret = runtimeConfig.krakenApiPrivateKey;

  const payload = {
    nonce,
  }

  const signature = signKrakenMessage(path, payload, secret)

  const response = await $fetch<{
    error: string[]
    result: {
      count: number
      trades: Record<string, any>[]
    }
  }>(`${runtimeConfig.krakenApiUrl}${path}`, {
    method: 'POST',
    headers: {
      'API-Key': runtimeConfig.krakenApiKey,
      'API-Sign': signature,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: qs.stringify(payload),
  })

  if (response.error.length) {
    throw new Error(response.error.join(', '))
  }

  if (pair) {
    return Object.entries(response.result.trades).filter((trade: any) => trade[1].pair === pair).map((trade: any) => trade[1])
  }

  return Object.entries(response.result.trades).map((trade: any) => trade[1])
})