import numpy as np

def predict_expense(expenses):
    if not expenses:
        return 0

    amounts = [e['amount'] for e in expenses]
    prediction = np.mean(amounts)
    return round(prediction, 2)

def get_insights(expenses):
    if not expenses:
        return {
            'prediction': 0,
            'anomaly': False,
            'suggestion': 'No data available.'
        }

    prediction = predict_expense(expenses)
    amounts = [e['amount'] for e in expenses]
    last_amount = amounts[0]

    anomaly = last_amount > (1.5 * prediction)

    suggestion = "Try reducing dining out expenses." if anomaly else "Spending is within normal range."

    return {
        'prediction': prediction,
        'anomaly': anomaly,
        'suggestion': suggestion
    }
