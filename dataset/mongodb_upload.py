import json

from mongoengine import connect

connect(db='data', host='mongodb+srv://tienli:Jz1JvtQMMqGjLKVY@restaurant.yx3ut6b.mongodb.net/?retryWrites=true&w=majority')
from mongoengine import Document, StringField, ListField, DictField

from mongoengine import Document, StringField, FloatField, IntField, ListField, DictField, EmbeddedDocumentField, EmbeddedDocument

# Define a sub-document for reviews
class Review(EmbeddedDocument):
    id = IntField(required=True)
    text = StringField(required=True)

# Define the main Restaurant document
class Restaurant(Document):
    business_id = StringField(required=True)
    name = StringField(required=True)
    address = StringField()
    city = StringField()
    state = StringField()
    postal_code = StringField()
    latitude = FloatField()
    longitude = FloatField()
    stars = FloatField()
    review_count = IntField()
    is_open = IntField()
    attributes = DictField()
    categories = StringField()
    hours = DictField()
    reviews = ListField(EmbeddedDocumentField(Review))

    # Additional methods can be defined here as needed


# Replace 'category' with your specific category
with open('categories/Breakfast_data.json', 'r') as file:
    restaurants_data = json.load(file)

# This will store combined data
combined_data = []

for restaurant in restaurants_data:

    business_id = restaurant['business_id']

    # Open the corresponding reviews file
    # Replace 'business_id' with the actual ID from the data
    try:
        with open(f'Breakfast/{business_id}_reviews.json', 'r') as review_file:
            reviews = json.load(review_file)
            restaurant['reviews'] = reviews  # Combine the data
            combined_data.append(restaurant)
    except FileNotFoundError:
        print(f"No review file found for business ID: {business_id}")
    break
# Now combined_data contains all the information

for data in combined_data:
    # Create Review embedded documents for each review
    review_objects = [Review(id=review['id'], text=review['text']) for review in data['reviews']]

    # Create a Restaurant document with all fields from the data
    restaurant = Restaurant(
        business_id=data['business_id'],
        name=data['name'],
        address=data.get('address', ''),
        city=data.get('city', ''),
        state=data.get('state', ''),
        postal_code=data.get('postal_code', ''),
        latitude=data.get('latitude', 0),
        longitude=data.get('longitude', 0),
        stars=data.get('stars', 0),
        review_count=data.get('review_count', 0),
        is_open=data.get('is_open', 0),
        attributes=data.get('attributes', {}),
        categories=data.get('categories', ''),
        hours=data.get('hours', {}),
        reviews=review_objects
    )

    # Save the document to MongoDB
    restaurant.save()




















# print(combined_data[0])
# from pymongo import MongoClient

# # Connect to your MongoDB instance
# client = MongoClient('mongodb+srv://tienli:Jz1JvtQMMqGjLKVY@restaurant.yx3ut6b.mongodb.net/?retryWrites=true&w=majority', tls=True, tlsAllowInvalidCertificates=True)

# databases = client.list_database_names()
# print("Databases:", databases)
# # # Select your database
# database = client['test_database']
# collection = database['test_collection']
# a = {'name': 'a', 'gender': 'male'}
# b = {'name': 'b', 'gender': 'male'}
# c = {'name': 'c', 'gender': 'female'}

# collection.insert_one(a)       # 插入一個檔案
# collection.insert_many([b, c]) # 插入多個檔案
# db = client['data']

# # Select your collection
# collection = client['restaurant']
# print(collection)


# # Insert data into the collection
# collection.insert_many(combined_data)
