import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { wagmiConfig } from './config/wagmi'
import Header from './components/Header'
import StakingCard from './components/StakingCard'

const queryClient = new QueryClient()

function App() {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-polymarket-bg">
          <Header />
          <main className="container mx-auto px-4 py-8 max-w-4xl">
            <StakingCard />
          </main>
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App
