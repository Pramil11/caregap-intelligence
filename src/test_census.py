import os
import requests
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("CENSUS_API_KEY")

url = "https://api.census.gov/data/2024/acs/acs5/profile"

params = {
    "get": "NAME,DP05_0001E",
    "for": "county:*",
    "in": "state:*",
    "key": api_key
}

response = requests.get(url, params=params)

print("Status code:", response.status_code)
print(response.json()[:5])