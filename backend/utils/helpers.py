def detect_anomaly(amounts):
    if len(amounts) < 2:
        return False
    avg = sum(amounts[:-1]) / (len(amounts) - 1)
    threshold = avg * 1.5
    return amounts[-1] > threshold

def give_suggestion(category):
    suggestions = {
        "food": "Try meal planning to save money 🥗",
        "shopping": "Track your shopping habits 🛍",
        "travel": "Look for off-season travel deals ✈",
        "bills": "Consider switching to cheaper providers 💡",
        "groceries": "Use discount coupons next time 🧾"
    }
    return suggestions.get(category.lower(), "Review your spending in this category 🔍")