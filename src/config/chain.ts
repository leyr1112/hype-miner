import { defineChain } from 'viem'

export const hyperevm = defineChain({
  id: 999,
  name: 'HyperEVM',
  nativeCurrency: {
    name: 'HYPE',
    symbol: 'HYPE',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.hyperlend.finance'],
    },
  },
  blockExplorers: {
    default: {
      name: 'HyperEVM Explorer',
      url: 'https://explorer.hyperlend.finance',
    },
  },
})

export const STAKING_CONTRACT_ADDRESS = '0xCeaD893b162D38e714D82d06a7fe0b0dc3c38E0b' as const
