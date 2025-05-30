#pip install requests
import requests

#URL
URL = "http://localhost:5000/produtos"

try:
    resposta =requests.get(URL)
    
    if resposta.status_code == 200:
        print("Conexão Ativa")
    else:
        print("ERROR")
        
except requests.exceptions.ConnectionError:
    print("ERROR")
except Exception as e:
    print("$%3RR0R$%")
    
    