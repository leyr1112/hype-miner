import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { hyperevm } from './chain'

const projectId = import.meta.env.VITE_REOWN_PROJECT_ID || 'YOUR_PROJECT_ID'

// Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  networks: [hyperevm],
  projectId,
  ssr: false,
})

// Create AppKit instance
createAppKit({
  adapters: [wagmiAdapter],
  networks: [hyperevm],
  projectId,
  metadata: {
    name: 'HyperEVM Miner',
    description: 'Staking platform for HYPE tokens on HyperEVM',
    url: typeof window !== 'undefined' ? window.location.origin : 'https://example.com',
    icons: [],
  },
  features: {
    analytics: true,
  },
})

export const wagmiConfig = wagmiAdapter.wagmiConfig
