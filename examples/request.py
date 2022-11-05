'''
Example API request using Python requests 
'''

import requests

url = "http://localhost:8080/api"

querystring = {"recipients":"['eip155:5:0xe9c079525aCe13822A7845774F163f27eb5f21Da','eip155:5:0x691C7c07A1B1698c56340d386d8cC7A823f6e2D8']"}

payload = ""
headers = {
    "title": "Leaderboard Update!",
    "msg": "recip check",
    "img": "https://cdn-icons-png.flaticon.com/512/548/548481.png"
}

response = requests.request("POST", url, data=payload, headers=headers, params=querystring)

print(response.text)