import json
from pymongo import MongoClient
import os

# Connect to your MongoDB instance
client = MongoClient(
    "mongodb+srv://reggie:kfcsogood123@restaurant.yx3ut6b.mongodb.net/?retryWrites=true&w=majority",
    tls=True,
    tlsAllowInvalidCertificates=True,
)

# # Select your database
db = client["data"]

# Select your collection
collection = db["Restaurant"]


file_path = set()
count = 0

categories = [
    "Breakfast",
    "Drink",
    "Burger",
    "Cafe",
    "Chinese",
    "Indian",
    "Italian",
    "Japanese",
    "Korean",
    "Mexican",
    "Pizza",
    "Vietnamese",
]


count = 0
for category in categories:
    # Replace 'category' with your specific category
    with open(f"categories/{category}_data.json", "r") as file:
        restaurants_data = json.load(file)

    for restaurant in restaurants_data[:10]:
        business_id = restaurant["business_id"]

        # Open the corresponding reviews file
        # Replace 'business_id' with the actual ID from the data
        try:
            myquery = {"business_id": business_id}
            with open(f"{category}/{business_id}_results.json", "r") as results_file:
                results = json.load(results_file)
            new_values = {"$set": {"results": results}}
            collection.update_one(myquery, new_values)
            print("Successfully update id:", business_id)
            count += 1

        except FileNotFoundError:
            print(f"No results file found for business ID: {business_id}")
print(count)
