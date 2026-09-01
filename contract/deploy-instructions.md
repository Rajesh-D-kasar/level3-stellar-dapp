# Smart Contract Deployment Guide

Follow these steps to build and deploy your Soroban Crowdfunding Contract to the Stellar Testnet.

## Prerequisites

1. Ensure you have the `stellar` CLI installed.
2. Ensure you have Rust and the `wasm32-unknown-unknown` target installed:
   ```bash
   rustup target add wasm32-unknown-unknown
   ```

## Step 1: Configure the Testnet Network

If you haven't already configured the Testnet network in your Stellar CLI, run:

```bash
stellar network add \
  --global testnet \
  --rpc-url https://soroban-testnet.stellar.org:443 \
  --network-passphrase "Test SDF Network ; September 2015"
```

## Step 2: Create and Fund an Identity

You need an identity (a Stellar account) to deploy the contract. Create one and fund it using Friendbot:

```bash
stellar keys generate --global default --network testnet
stellar keys fund default --network testnet
```

## Step 3: Run the Deployment Script

Now, run the provided deployment script to compile your Rust code into WebAssembly and deploy it to the network:

```bash
cd contract
chmod +x deploy.sh
./deploy.sh
```

## Step 4: Update the Frontend

Once the script completes, it will output a **Contract ID** (e.g., `CA...`).

1. Copy that Contract ID.
2. Open `src/App.jsx` in the root of the project.
3. Locate the `SOROBAN_CONTRACT_ID` constant (around line 18) and replace the placeholder with your actual Contract ID:
   ```javascript
   const SOROBAN_CONTRACT_ID = 'C...YOUR...CONTRACT...ID...'; 
   ```

You are now fully connected to your live Soroban contract!
