# HyperEVM Miner Platform

A staking platform for HYPE tokens on HyperEVM chain, built with Vite, React, TypeScript, Tailwind CSS, and Reown wallet provider.

## Features

- Connect wallet using Reown (WalletConnect)
- Stake HYPE tokens
- Unstake HYPE tokens
- View staking statistics
- Polymarket-inspired UI design

## Chain Configuration

- **Chain ID:** 999 (0x3e7)
- **Currency:** HYPE
- **Block Gas Limit:** 3,000,000
- **RPC:** https://rpc.hyperlend.finance
- **Staking Contract:** 0xCeaD893b162D38e714D82d06a7fe0b0dc3c38E0b

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure Reown Project ID:
   - Get your project ID from [Reown Cloud](https://cloud.reown.com)
   - Create a `.env` file in the root directory
   - Add `VITE_REOWN_PROJECT_ID=your_project_id_here` to the `.env` file

3. Run development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Project Structure

```
hype-miner/
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   └── StakingCard.tsx
│   ├── config/
│   │   ├── chain.ts
│   │   └── wagmi.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## Notes

- Make sure to update the Reown project ID in `src/config/wagmi.ts`
- The staking contract ABI is a standard interface - you may need to adjust it based on your actual contract implementation
- The contract address and chain configuration can be modified in `src/config/chain.ts`
