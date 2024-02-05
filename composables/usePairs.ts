import { useStorage } from "@vueuse/core"

export type PairInfo = {
  altname: string;
  base: string;
  quote: string;
}

const availablePairs = ref<{ [pairName: string]: PairInfo }>({});
const watchedPairs = useStorage<string[]>('watchedPairs', () => []);
const pairNames = computed(() => Object.keys(availablePairs.value));

function addPair(pair: string) {
  if (!pair) return;
  if (watchedPairs.value.includes(pair)) return;

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

  availablePairs.value = data.result;
}

export default function usePairs() {
  return { availablePairs, watchedPairs, pairNames, addPair, removePair, fetchPairs }
}