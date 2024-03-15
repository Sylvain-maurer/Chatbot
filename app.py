import requests

API_URL = "https://xevhza5rhd1jhkq8.us-east-1.aws.endpoints.huggingface.cloud"
headers = {
	"Accept" : "application/json",
	"Content-Type": "application/json" 
}

def query(payload):
	response = requests.post(API_URL, headers=headers, json=payload)
	return response.json()

output = query({
	"inputs": "This is the text sent to the model",
	"parameters": {}
})