import { useState } from 'react'
import { useAccount, useBalance, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi'
import { parseEther, formatEther } from 'viem'
import { STAKING_CONTRACT_ADDRESS } from '../config/chain'

// ABI for staking contract (basic ERC20 staking interface)
const STAKING_ABI = [
  {
    inputs: [{ name: 'amount', type: 'uint256' }],
    name: 'stake',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: 'amount', type: 'uint256' }],
    name: 'unstake',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: 'user', type: 'address' }],
    name: 'stakedBalance',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalStaked',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const

function StakingCard() {
  const { address, isConnected } = useAccount()
  const [stakeAmount, setStakeAmount] = useState('')
  const [unstakeAmount, setUnstakeAmount] = useState('')
  const [activeTab, setActiveTab] = useState<'stake' | 'unstake'>('stake')

  const { data: balance } = useBalance({
    address,
  })

  const { data: stakedBalance } = useReadContract({
    address: STAKING_CONTRACT_ADDRESS,
    abi: STAKING_ABI,
    functionName: 'stakedBalance',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  })

  const { data: totalStaked } = useReadContract({
    address: STAKING_CONTRACT_ADDRESS,
    abi: STAKING_ABI,
    functionName: 'totalStaked',
  })

  const { writeContract: stake, data: stakeHash, isPending: isStaking } = useWriteContract()
  const { writeContract: unstake, data: unstakeHash, isPending: isUnstaking } = useWriteContract()

  const { isLoading: isStakeConfirming } = useWaitForTransactionReceipt({
    hash: stakeHash,
  })

  const { isLoading: isUnstakeConfirming } = useWaitForTransactionReceipt({
    hash: unstakeHash,
  })

  const handleStake = async () => {
    if (!stakeAmount || !address) return
    try {
      stake({
        address: STAKING_CONTRACT_ADDRESS,
        abi: STAKING_ABI,
        functionName: 'stake',
        args: [parseEther(stakeAmount)],
      })
      setStakeAmount('')
    } catch (error) {
      console.error('Stake error:', error)
    }
  }

  const handleUnstake = async () => {
    if (!unstakeAmount || !address) return
    try {
      unstake({
        address: STAKING_CONTRACT_ADDRESS,
        abi: STAKING_ABI,
        functionName: 'unstake',
        args: [parseEther(unstakeAmount)],
      })
      setUnstakeAmount('')
    } catch (error) {
      console.error('Unstake error:', error)
    }
  }

  const handleMaxStake = () => {
    if (balance) {
      setStakeAmount(formatEther(balance.value))
    }
  }

  const handleMaxUnstake = () => {
    if (stakedBalance) {
      setUnstakeAmount(formatEther(stakedBalance))
    }
  }

  if (!isConnected) {
    return (
      <div className="card text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
        <p className="text-polymarket-text-secondary mb-6">
          Please connect your wallet to start staking HYPE tokens
        </p>
      </div>
    )
  }

  return (
    <div className="card">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">HYPE Staking</h2>
        <p className="text-polymarket-text-secondary">
          Stake your HYPE tokens to earn rewards
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-polymarket-bg border border-polymarket-border rounded-lg p-4">
          <p className="text-sm text-polymarket-text-secondary mb-1">Your Balance</p>
          <p className="text-xl font-semibold">
            {balance ? parseFloat(formatEther(balance.value)).toFixed(4) : '0.0000'} HYPE
          </p>
        </div>
        <div className="bg-polymarket-bg border border-polymarket-border rounded-lg p-4">
          <p className="text-sm text-polymarket-text-secondary mb-1">Staked</p>
          <p className="text-xl font-semibold">
            {stakedBalance ? parseFloat(formatEther(stakedBalance)).toFixed(4) : '0.0000'} HYPE
          </p>
        </div>
        <div className="bg-polymarket-bg border border-polymarket-border rounded-lg p-4">
          <p className="text-sm text-polymarket-text-secondary mb-1">Total Staked</p>
          <p className="text-xl font-semibold">
            {totalStaked ? parseFloat(formatEther(totalStaked)).toFixed(4) : '0.0000'} HYPE
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-polymarket-border">
        <button
          onClick={() => setActiveTab('stake')}
          className={`px-4 py-2 font-semibold transition-colors ${
            activeTab === 'stake'
              ? 'text-polymarket-accent border-b-2 border-polymarket-accent'
              : 'text-polymarket-text-secondary hover:text-polymarket-text'
          }`}
        >
          Stake
        </button>
        <button
          onClick={() => setActiveTab('unstake')}
          className={`px-4 py-2 font-semibold transition-colors ${
            activeTab === 'unstake'
              ? 'text-polymarket-accent border-b-2 border-polymarket-accent'
              : 'text-polymarket-text-secondary hover:text-polymarket-text'
          }`}
        >
          Unstake
        </button>
      </div>

      {/* Stake Form */}
      {activeTab === 'stake' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Amount to Stake</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(e.target.value)}
                placeholder="0.0"
                step="any"
                className="input flex-1"
              />
              <button
                onClick={handleMaxStake}
                className="btn-secondary px-4"
              >
                MAX
              </button>
            </div>
            <p className="text-xs text-polymarket-text-secondary mt-1">
              Available: {balance ? parseFloat(formatEther(balance.value)).toFixed(4) : '0.0000'} HYPE
            </p>
          </div>
          <button
            onClick={handleStake}
            disabled={!stakeAmount || isStaking || isStakeConfirming || parseFloat(stakeAmount) <= 0}
            className="btn-primary w-full"
          >
            {isStaking || isStakeConfirming ? 'Processing...' : 'Stake HYPE'}
          </button>
        </div>
      )}

      {/* Unstake Form */}
      {activeTab === 'unstake' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Amount to Unstake</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={unstakeAmount}
                onChange={(e) => setUnstakeAmount(e.target.value)}
                placeholder="0.0"
                step="any"
                className="input flex-1"
              />
              <button
                onClick={handleMaxUnstake}
                className="btn-secondary px-4"
              >
                MAX
              </button>
            </div>
            <p className="text-xs text-polymarket-text-secondary mt-1">
              Staked: {stakedBalance ? parseFloat(formatEther(stakedBalance)).toFixed(4) : '0.0000'} HYPE
            </p>
          </div>
          <button
            onClick={handleUnstake}
            disabled={!unstakeAmount || isUnstaking || isUnstakeConfirming || parseFloat(unstakeAmount) <= 0}
            className="btn-primary w-full"
          >
            {isUnstaking || isUnstakeConfirming ? 'Processing...' : 'Unstake HYPE'}
          </button>
        </div>
      )}

      {/* Chain Info */}
      <div className="mt-6 pt-6 border-t border-polymarket-border">
        <div className="text-sm text-polymarket-text-secondary space-y-1">
          <p><span className="font-semibold">Chain ID:</span> 999 (0x3e7)</p>
          <p><span className="font-semibold">Currency:</span> HYPE</p>
          <p><span className="font-semibold">Block Gas Limit:</span> 3,000,000</p>
          <p><span className="font-semibold">RPC:</span> https://rpc.hyperlend.finance</p>
          <p><span className="font-semibold">Contract:</span> {STAKING_CONTRACT_ADDRESS}</p>
        </div>
      </div>
    </div>
  )
}

export default StakingCard
