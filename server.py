from flask import Flask, jsonify, request
from flask_socketio import SocketIO, emit
from flask_cors import CORS
from web3 import Web3
import json
import config

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

# Connect to Ganache
w3 = Web3(Web3.HTTPProvider(config.GANACHE_URL_2))

# Load Contract
with open("BlockchainTransaction.json", "r") as file:
    contract_data = json.load(file)

# Extract ABI from compiled contract
contract_abi = contract_data["contracts"]["smart_contract.sol"]["BlockchainTransaction"]["abi"]

with open("contract_address.txt", "r") as file:
    contract_address = file.read().strip()
contract_abi = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_receiver",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "addTransaction",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

contract = w3.eth.contract(address=contract_address, abi=contract_abi)
peers = set()


@app.route('/')
def home():
    return jsonify({"message": "Blockchain API is running!"}), 200

@app.route('/transactions/new', methods=['POST'])
def new_transaction():
    """Receives a new transaction and sends it to the smart contract"""
    data = request.get_json()
    if 'sender' in data and 'receiver' in data and 'amount' in data:
        sender = data['sender']
        receiver = data['receiver']
        amount = data['amount']
        
        # Send transaction to smart contract
        tx_hash = contract.functions.addTransaction(receiver, amount).transact({'from': sender})
        receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
        
        # Broadcast transaction
        socketio.emit('new_transaction', data, broadcast=True)
        return jsonify({"message": "Transaction added", "receipt": receipt}), 201
    
    return jsonify({"error": "Invalid transaction data"}), 400

@app.route('/transactions/<int:index>', methods=['GET'])
def get_transaction(index):
    """Fetches a transaction from the smart contract"""
    try:
        sender, receiver, amount, timestamp = contract.functions.getTransaction(index).call()
        return jsonify({
            "index": index,
            "sender": sender,
            "receiver": receiver,
            "amount": amount,
            "timestamp": timestamp
        }), 200
    except:
        return jsonify({"error": "Transaction not found"}), 404

@app.route('/total_transactions', methods=['GET'])
def get_total_transactions():
    """Returns total transactions from the smart contract"""
    count = contract.functions.getTotalTransactions().call()
    return jsonify({"total_transactions": count}), 200

if __name__ == "__main__":
    socketio.run(app, host='0.0.0.0', port=5002)
