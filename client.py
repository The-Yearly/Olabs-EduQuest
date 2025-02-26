import requests
import time
import random

# Replace with the actual IP addresses of both nodes
NODES = [
    "http://192.168.82.15:5000",  # Node 1
    "http://192.168.82.115:5002"   # Node 2
]

# Sample Ethereum accounts for testing (replace with real ones)
ACCOUNTS = [
     "0x047F77d67Bb50207Ae8A949796593f671fF92BfF",  
    "0xA83b9B202923Ca108A9e6161bFde2ec0a42A7394"
]

def send_transaction():
    """Send a random transaction between two nodes."""
    sender = ACCOUNTS[0]
    receiver = ACCOUNTS[1]
    amount = random.randint(1, 100) 

    for node in NODES:
        try:
            response = requests.post(
                f"{node}/transactions/new",
                json={"sender": sender, "receiver": receiver, "amount": amount},
                timeout=5
            )
            print(f"📩 Transaction sent from {sender} to {receiver} for {amount} ETH. Response: {response.json()}")
        except requests.exceptions.RequestException as e:
            print(f"❌ Failed to send transaction to {node}: {e}")

if __name__ == "_main_":
    while True:
        send_transaction()
        time.sleep(10)  # Wait 10 seconds before sending the next transaction