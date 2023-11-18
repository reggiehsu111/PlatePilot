import json
import argparse
import os

def extract_reviews(file_path, business_id):
    reviews = []
    review_id = 1  # Initialize review ID

    # Open the file and process each line as a separate JSON object
    with open(file_path, 'r') as file:
        for line in file:
            try:
                # Attempt to parse the JSON line
                review = json.loads(line)

                # Check if the review matches the target business_id
                if review['business_id'] == business_id:
                    reviews.append({"id": review_id, "text": review['text']})
                    review_id += 1  # Increment review ID
            except json.JSONDecodeError as e:
                print(f"Error decoding JSON: {e}")

    return reviews

def extract_city(file_path, city):
    business = []
    
    with open(file_path, 'r') as file:
        for line in file:
            try:
                # Attempt to parse the JSON line
                review = json.loads(line)

                # Check if the review matches the target business_id
                if review['city'] == city:
                    business.append(review)
            except json.JSONDecodeError as e:
                print(f"Error decoding JSON: {e}")

    return business

def extract_categories(file_path, category_list):
    businesses = []
    with open(file_path, 'r') as file:
        # Load the entire JSON array
        data = json.load(file)
        # print(len(data))

        for business in data:
            # print(len(business))
            # print(business)
            categories = business.get('categories', '')
            if categories and all(category in categories for category in category_list):
                businesses.append(business)
    return businesses

def get_10_businesses(file_path):

    with open(file_path, 'r') as file:
        # Load the entire JSON array
        data = json.load(file)

    return data[:10]

def main():
    # Create the parser and add arguments
    parser = argparse.ArgumentParser(description='Process Yelp dataset.')
    parser.add_argument('-businessID', help='Business ID for extracting reviews')
    parser.add_argument('-city', help='City name for extracting business data')
    parser.add_argument('-categories', nargs=2, help='Two categories to filter businesses')
    parser.add_argument('-reviews', help='Categories to filter restaurant reviews')
    # parser.add_argument('file_path', help='Path to the JSON file')
    args = parser.parse_args()

    # Check which operation to perform based on the arguments passed
    if args.businessID:
        file_path = 'yelp_academic_dataset_review.json'
        reviews_data = extract_reviews(file_path, args.business)
        output_file = 'reviews_output.json'
        with open(output_file, 'w') as outfile:
            json.dump(reviews_data, outfile, indent=4)
        print(f"Reviews written to '{output_file}'")

    elif args.city:
        file_path = 'yelp_academic_dataset_business.json'
        city_data = extract_city(file_path, args.city)
        output_file = f'{args.city}.json'
        with open(output_file, 'w') as outfile:
            json.dump(city_data, outfile, indent=4)
        print(f"City data written to '{output_file}'")

    elif args.categories:
        file_path = 'Philadelphia.json'
        category_data = extract_categories(file_path, args.categories)
        output_file = f'categories/{args.categories[0]}_data.json'
        with open(output_file, 'w') as outfile:
            json.dump(category_data, outfile, indent=4)
        print(f"Data filtered by categories written to '{output_file}'")

    elif args.reviews:
        # Extract top 10 businesses
        file_path = f'categories/{args.reviews}_data.json'
        top_10_businesses = get_10_businesses(file_path)

        # Extract reviews for each business and save in separate files
        reviews_file_path = 'yelp_academic_dataset_review.json'
        for business in top_10_businesses:
            business_id = business['business_id']
            reviews = extract_reviews(reviews_file_path, business_id)
            
            # Create directory if it doesn't exist
            if not os.path.exists(args.reviews):
                os.makedirs(args.reviews)

            output_file = f'{args.reviews}/{business_id}_reviews.json'
            with open(output_file, 'w') as outfile:
                json.dump(reviews, outfile, indent=4)
            print(f"Reviews for {business['name']} written to '{output_file}'")


if __name__ == '__main__':
    main()