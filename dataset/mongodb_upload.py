import json
import os

file_path = set()
count = 0

categories = ['Breakfast', 'Bubble', 'Burger', 'Cafe', 'Chinese', 'Indian', 'Italian', 'Japanese', 'Korean', 'Mexican', 'Pizza', 'Vietnamese']

# This will store combined data
combined_data = []

for category in categories:
    # Replace 'category' with your specific category
    with open(f'categories/{category}_data.json', 'r') as file:
        restaurants_data = json.load(file)

    for restaurant in restaurants_data[:10]:

        business_id = restaurant['business_id']

        # Open the corresponding reviews file
        # Replace 'business_id' with the actual ID from the data
        try:
            with open(f'{category}/{business_id}_reviews.json', 'r') as review_file:
                reviews = json.load(review_file)
                restaurant['reviews'] = reviews  # Combine the data
                if f'{business_id}_reviews.json' not in file_path:
                    combined_data.append(restaurant)
                    file_path.add(f'{business_id}_reviews.json')
                    count += 1
                
        except FileNotFoundError:
            print(f"No review file found for business ID: {business_id}")

print(count)
print(len(file_path))

from pymongo import MongoClient
# Connect to your MongoDB instance
client = MongoClient('mongodb+srv://tienli:Jz1JvtQMMqGjLKVY@restaurant.yx3ut6b.mongodb.net/?retryWrites=true&w=majority', tls=True, tlsAllowInvalidCertificates=True)

# # Select your database
db = client['data']

# Select your collection
collection = db['Restaurant']

# Insert data into the collection
collection.insert_many(combined_data)
