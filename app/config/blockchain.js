import { createPublicClient, http } from "viem";
import { bsc } from "viem/chains";

// Define the supported chains with their specific configurations
const mainnetClient = createPublicClient(
    {
        chain: bsc,
        transport: http('https://bsc-dataseed1.binance.org/')
    }
)

// Create a client map or array for managing multiple chains

const clients = {
    56: mainnetClient
}
// Example function to retrieve the appropriate client based on chainId
export const getClient = () => clients[56] || null;

