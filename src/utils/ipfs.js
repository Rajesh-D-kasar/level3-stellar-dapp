/**
 * Utility for uploading JSON metadata to IPFS using Pinata API.
 * Ensure you have your Pinata API JWT token configured in your environment variables.
 * In a real-world scenario, you would keep the JWT secret in a backend service,
 * but for this prototype, we simulate the interaction.
 */

const PINATA_JWT = process.env.VITE_PINATA_JWT || 'placeholder_jwt_token';

/**
 * Uploads a JSON object containing campaign metadata to IPFS via Pinata.
 * 
 * @param {Object} metadata - The campaign metadata (title, description, image, etc.)
 * @returns {Promise<string>} The IPFS URI (ipfs://...) of the uploaded metadata.
 */
export const uploadMetadataToIPFS = async (metadata) => {
  if (PINATA_JWT === 'placeholder_jwt_token') {
    console.warn('Pinata JWT is not set. Simulating IPFS upload.');
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return `ipfs://QmSimulatedHash${Math.random().toString(36).substring(2, 10)}`;
  }

  try {
    const res = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${PINATA_JWT}`,
      },
      body: JSON.stringify(metadata),
    });

    if (!res.ok) {
      throw new Error(`Failed to upload to Pinata: ${res.statusText}`);
    }

    const data = await res.json();
    return `ipfs://${data.IpfsHash}`;
  } catch (error) {
    console.error('IPFS Upload Error:', error);
    throw error;
  }
};
