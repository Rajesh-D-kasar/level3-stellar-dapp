#!/bin/bash
set -e

# Colors for terminal output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🔨 Building the Soroban Smart Contract...${NC}"
cargo build --target wasm32-unknown-unknown --release

WASM_PATH="target/wasm32-unknown-unknown/release/stellar_crowdfunding_contract.wasm"

echo -e "${BLUE}🚢 Deploying contract to Stellar Testnet...${NC}"
echo "Using network: testnet"
echo "Using identity: default"

# Deploying and capturing the output Contract ID
stellar contract deploy \
  --wasm $WASM_PATH \
  --source default \
  --network testnet \
  > deploy_output.txt

CONTRACT_ID=$(cat deploy_output.txt)

echo -e "${GREEN}✅ Deployment Successful!${NC}"
echo -e "Contract ID: ${GREEN}${CONTRACT_ID}${NC}"
echo ""
echo "🚀 Next steps:"
echo "1. Copy the Contract ID above."
echo "2. Open src/App.jsx and replace the SOROBAN_CONTRACT_ID placeholder with this ID."
echo "3. Run your frontend using 'npm run dev' to interact with your live smart contract."
