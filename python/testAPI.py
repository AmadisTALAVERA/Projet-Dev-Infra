import requests
import json

# # Function to get live stock data for a symbol
# def get_stock_data():
#     url = f"https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&outputsize=full&apikey=demo"
#     response = requests.get(url)
     
#     # Check if the response is successful
#     if response.status_code == 200:
#         data = response.json()
#         last_refreshed = data["Meta Data"]["3. Last Refreshed"]
#         price = data["Time Series (5min)"][last_refreshed]["1. open"]
#         return price
#     else:
#         return None
 
# stock_prices = {}
# price = get_stock_data()
# symbol="IBM"
# if price is not None:
#     stock_prices[symbol] = price
 
# print(f"{symbol}: {price}")

import requests

# Définir l'URL de l'API et les en-tête
# s si nécessaire
url = "http://10.0.2.15:5500/Projet-Dev-Infra-main/front/index.html"
headers = {
    "Authorization": "Bearer YOUR_ACCESS_TOKEN",  # Remplacez par votre jeton d'accès
    "Content-Type": "application/json"
}

response = requests.get(url, headers=headers)

if response.status_code == 200:
    data = response.json()
    for user in data:
        print(f"Username: {user['username']}, Password: {user['password']}")
else:
    print(f"Erreur: {response.status_code}")
    print(response.text)


# def AfficherEvenement() :
#     Evenement = "SELECT Id AND Password FROM Evenements"
