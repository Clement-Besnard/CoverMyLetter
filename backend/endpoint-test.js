const payload = {
  "input_value": `Quel est le nom de celui qui a écrit la lettre ?`,
  "output_type": "chat",
  "input_type": "chat"
};

const options = {
  method: 'POST',
  headers: {
      'Content-Type': 'application/json'
  },
  body: JSON.stringify(payload)
};

fetch('http://localhost:7860/api/v1/run/modifymyletter', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
  