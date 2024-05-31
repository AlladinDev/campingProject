   import { ClientJS } from "clientjs";
   import FingerprintJS from '@fingerprintjs/fingerprintjs'
   //function to generate user device id
   async function generateFingerprint() {
    try {
        // Load FingerprintJS library
        const fp = await FingerprintJS.load();

        // Initialize ClientJS
        const client = new ClientJS();

        // Extract user-agent string using ClientJS
        const userAgent = client.getUserAgent();

        // Generate the fingerprint using FingerprintJS
        const result = await fp.get({ userAgent });

        // Return the generated fingerprint for further processing if needed
        return result.visitorId;
    } catch (error) {
        // Handle error
        console.error('Error generating fingerprint:', error);
        // Optionally return a default value or rethrow the error
        throw error;
    }
}
export default generateFingerprint