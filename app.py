import pandas as pd
from pymongo import MongoClient
from flask import Flask, request, jsonify
from flask_cors import CORS

client = MongoClient('mongodb+srv://GrindTime:compass@codeblooded.1n8xcmo.mongodb.net/')  # Replace with your MongoDB URI

db = client['casa-compass']
collection = db['homebuyers']

app = Flask("Casa Compass")
CORS(app)
# Calculating Private Mortgage Insurance (PMI) for LTV
def calculate_pmi(appraised_value, pmi_rate):
    pmi_annual = (pmi_rate / 100) * appraised_value
    pmi_monthly = pmi_annual / 12
    return pmi_annual, pmi_monthly

@app.route('/checkID', methods=['POST'])
def check_id():
    data = request.json
    id = data["id"]
    print(f"Checking ID {id}", flush=True)
    user = collection.find_one({"_id": int(id)})
    if user:
        return jsonify(user)
    else:
        return jsonify({"message": f'User {id} not found, make new entry'}), 400

# we don't know if this works yet
@app.route('/addUser', methods=['POST'])
def add_user():
    data = request.json
    print(data)
    id = data["id"]
    user = collection.find_one({"_id": int(id)})
    if user:
        return jsonify({"message": f'User {id} already exists'}), 400
    else:
        collection.insert_one(data)
        return jsonify({"message": f'User {id} added'}), 200

@app.route('/evaluate', methods=['POST'])
def evaluate_homebuyers():
    data = request.json["user"]
    print(data)


    grossIncome = data["GrossMonthlyIncome"]
    creditCardPayment = data["CreditCardPayment"]
    mortgage = data["MonthlyMortgagePayment"]
    carPayment = data["CarPayment"]
    appraisedValue = data["AppraisedValue"]
    downPayment = data["DownPayment"]
    creditScore = data["CreditScore"]
    loanAmount = data["LoanAmount"]
    studentLoan= data["StudentLoanPayments"]
    

    LTV = (loanAmount / appraisedValue) * 100
    
    #monthly debt payments
    totalDebt = creditCardPayment + carPayment + mortgage + studentLoan + downPayment
    DTI = (totalDebt / grossIncome) * 100
    
    FEDTI = (mortgage / grossIncome) * 100
    
    result = "Approved"
    suggestions = []
    
    if creditScore >= 640:
        pass
    else:
        result = "Not Approved"
        suggestions.append("Make sure to review your credit report regularly for any discrepancies.")
        suggestions.append("Try to settle or negotiate any outstanding collections.")
        suggestions.append("Be selective about opening new credit accounts.")

    #fix this
    if LTV < 80:
        pass
    elif LTV < 95:
        pmi_annual, pmi_monthly = calculate_pmi(appraisedValue, 1) 
        # Additional cost for PMI per year
        suggestions.append(f"PMI charges of ${pmi_annual:.2f} per year (${pmi_monthly:.2f} per month) may apply. Try to lower LTV below 80% by increasing your down payment.")
    else:
        result = "Not Approved"
        suggestions.append("Try to increase your down payment to decrease your LTV or try to negotiate a lower purchase price.")
        suggestions.append("Consider making strategic home improvements to increase your appraised value.")
        suggestions.append("Shop around for competitive mortgage rates.")
    
    #green flag
    if DTI <= 36:
        #yellow flag
        if (mortgage/totalDebt)*100 <= 28: #no more than 28% of those monthly debt payments going towards going towards servicing a mortgage
            pass
        else:
            suggestions.append("Consider increasing your down payment to reduce your loan amount.")
            suggestions.append("Compare different mortgage rates from different lenders and explore options.")
    #yellow flag
    elif DTI <= 43:
        pass
        suggestions.append("Create a budget to track your expenses and identify where you can cut costs.")
        suggestions.append("If you have credit cards with high-interest rates, consider transferring balances to cards with lower rates to reduce costs.")
    else:
        result = "Not Approved"
        suggestions.append("Create a budget to track your expenses and identify where you can cut costs.")
        suggestions.append("If you have credit cards with high-interest rates, consider transferring balances to cards with lower rates to reduce costs.")
        
    if FEDTI <= 28:
        pass
    else:
        result = "Not Approved"
        suggestions.append("Find ways to reduce your housing costs such as refinancing your mortgage to secure a lower interest rate or consider downsizing to a more affordable home.")
        suggestions.append("Consider reducing other housing-related costs such as utility bills, insurance, and property taxes.")


    response = {
        "Result": result,
        "Suggestions": suggestions
    }
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)

client.close()