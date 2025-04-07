import { createPublicClient, http } from "viem";
import { bscTestnet } from "viem/chains";

// Define the supported chains with their specific configurations
const mainnetClient = createPublicClient(
    {
        chain: bscTestnet,
        transport: http('https://data-seed-prebsc-1-s1.bnbchain.org:8545')
    }
)

// Create a client map or array for managing multiple chains

const clients = {
    97: mainnetClient
}
// Example function to retrieve the appropriate client based on chainId
export const getClient = () => clients[97] || null;

