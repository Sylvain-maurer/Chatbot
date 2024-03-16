const chatForm = get('form');
const chatInput = get('input');
const chatBox = get('main');

async function query(data) {
	const response = await fetch(
		"https://xevhza5rhd1jhkq8.us-east-1.aws.endpoints.huggingface.cloud",
		{
			headers: { 
				"Accept" : "application/json",
				"Content-Type": "application/json" 
			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return result;
}

query({
    "inputs": "This is the text sent to the model",
    "parameters": {}
}).then((response) => {
	console.log(JSON.stringify(response));
});

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  appendMessage('bot', 'This is a bot bubble');
  appendMessage('user', 'This is a user bubble');
  
chatForm.addEventListener('submit', async event => {
  event.preventDefault();
  const text = chatInput.value;
  if (!text) return;
  
  appendMessage('user', text);
  
  try {
    const botResponse = await sendMessageToAPI(text);
    appendMessage('bot', botResponse);
  } catch (error) {
    console.error('Failed to get response from API', error);
    appendMessage('bot', 'Sorry, I encountered an error.');
  }

  chatInput.value = '';
});

function appendMessage(side, text) {
  const bubble = `
    <div class="msg -${side}">
        <div class="bubble">${text}</div>
    </div>`;
  chatBox.insertAdjacentHTML('beforeend', bubble);
  chatBox.scrollTop += 500;
}

// Utilitaires
function get(selector, root = document) {
  return root.querySelector(selector);
}