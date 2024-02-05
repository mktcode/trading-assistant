import { useStorage } from "@vueuse/core"

export default function usePairs() {
  const availablePairs = ref<string[]>([]);
  const watchedPairs = useStorage<string[]>('watchedPairs', () => []);

  function addPair(pair: string) {
    watchedPairs.value.push(pair);
  }

  function removePair(pair: string) {
    const index = watchedPairs.value.indexOf(pair);
    if (index > -1) {
      watchedPairs.value.splice(index, 1);
    }
  }

  async function fetchPairs() {
    const response = await fetch(`https://api.kraken.com/0/public/AssetPairs`)
    const data = await response.json()

    availablePairs.value = Object.keys(data.result);
  }

  return { availablePairs, watchedPairs, addPair, removePair, fetchPairs }
}