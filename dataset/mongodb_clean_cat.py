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
    "Bubble",
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


for category in categories:
    # Replace 'category' with your specific category
    with open(f"categories/{category}_data.json", "r") as file:
        restaurants_data = json.load(file)

    for restaurant in restaurants_data[:10]:
        business_id = restaurant["business_id"]
        cats = restaurant["categories"]
        new_cat = cats.split(",")
        new_cat = [x.strip() for x in new_cat]
        cat_data = []
        for cat in new_cat:
            for c in categories:
                if c in cat:
                    cat_data.append(c)
                    break
        cat_str = ", ".join(cat_data)

        # Open the corresponding reviews file
        # Replace 'business_id' with the actual ID from the data
        try:
            pass
            myquery = {"business_id": business_id}
            new_values = {"$set": {"category_array": cat_data, "categories": cat_str}}
            collection.update_one(myquery, new_values)
            print("Successfully update id:", business_id)

        except FileNotFoundError:
            print(f"No results file found for business ID: {business_id}")
