import { useAppKit, useAppKitAccount, useDisconnect } from '@reown/appkit/react'

function Header() {
  const { address, isConnected } = useAppKitAccount()
  const { disconnect } = useDisconnect()
  const { open } = useAppKit()

  return (
    <header className="border-b border-polymarket-border bg-polymarket-card">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="HyperEVM" className="w-10 h-10" />
          <div>
            <h1 className="text-xl font-bold text-polymarket-text">HyperEVM</h1>
            <p className="text-xs text-polymarket-text-secondary">Chain ID: 999 (0x3e7)</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {isConnected && address && (
            <div className="flex items-center gap-3">
              <div className="text-sm text-polymarket-text-secondary">
                {address.slice(0, 6)}...{address.slice(-4)}
              </div>
              <button
                onClick={() => disconnect()}
                className="btn-secondary text-sm py-2 px-4"
              >
                Disconnect
              </button>
            </div>
          )}
          {!isConnected && (
            <button
              onClick={() => open()}
              className="btn-primary text-sm py-2 px-4"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
