from pymongo import MongoClient
import json


def get_database():
    # Provide the mongodb atlas url to connect python to mongodb using pymongo
    CONNECTION_STRING = "mongodb+srv://reggie:kfcsogood123@restaurant.yx3ut6b.mongodb.net/?retryWrites=true&w=majority"

    # Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
    client = MongoClient(CONNECTION_STRING)

    # Create the database for our example (we will use the same database throughout the tutorial
    return client["data"]["Restaurant"]


def insert_restaurant():
    with open("categories/Breakfast_data.json", "r") as file:
        restaurants_data = json.load(file)

    # This will store combined data
    combined_data = []

    for restaurant in restaurants_data:
        business_id = restaurant["business_id"]

        # Open the corresponding reviews file
        # Replace 'business_id' with the actual ID from the data
        try:
            with open(f"Breakfast/{business_id}_reviews.json", "r") as review_file:
                reviews = json.load(review_file)
                restaurant["reviews"] = reviews  # Combine the data
                combined_data.append(restaurant)
        except FileNotFoundError:
            print(f"No review file found for business ID: {business_id}")
    # Now combined_data contains all the information
    return combined_data

    # Create a Restaurant document with all fields from the data


# This is added so that many files can reuse the function get_database()
if __name__ == "__main__":
    # Get the database
    restaurant_collection = get_database()
    restaurant_data = insert_restaurant()
    print(len(restaurant_data))
    # restaurant_collection.insert_many(restaurant_data)
