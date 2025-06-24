// Node 18+ example using global fetch, FormData, and Blob
import fs from 'fs/promises';

// 1. Prepare the form data with the file to upload
const fileBuffer = await fs.readFile('cv.pdf');
const data = new FormData();
data.append('file', new Blob([fileBuffer]), 'cv.pdf');
const headers = { 'x-api-key': 'sk-uvq-XukOwdXL62gNFpUS5MITWrNuhzpbDACqEs__s7c' };

// 2. Upload the file to Langflow
const uploadRes = await fetch('http://localhost:7860/api/v2/files/', {
  method: 'POST',
  headers,
  body: data
});
const uploadData = await uploadRes.json();
const uploadedPath = uploadData.path;

// 3. Call the Langflow run endpoint with the uploaded file path
const payload = {
  input_value: "https://www.welcometothejungle.com/fr/companies/argain/jobs/consultant-lead-pilote-de-projet-data_niort?q=82b5010e37eae8c99302dd1c5215e589&o=25962040-8616-40b6-bb81-c627e81564c5",
  output_type: "chat",
  input_type: "chat",
  tweaks: {
    'File-KmrxQ': {
      path: uploadedPath
    }
  }
};
const runRes = await fetch('http://localhost:7860/api/v1/run/covermyletter', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'x-api-key': 'sk-uvq-XukOwdXL62gNFpUS5MITWrNuhzpbDACqEs__s7c' },
  body: JSON.stringify(payload)
});
const langflowData = await runRes.json();
// Output only the message
console.log(langflowData.outputs?.[0]?.outputs?.[0]?.results?.message?.data?.text);
