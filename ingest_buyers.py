import pandas as pd
from pymongo import MongoClient

# Load the data from the CSV file
df = pd.read_csv('buyer_entries.csv')

# Convert the DataFrame to a list of dictionaries
data = df.to_dict('records')

# Create a connection to the MongoDB database
client = MongoClient('mongodb+srv://GrindTime:compass@codeblooded.1n8xcmo.mongodb.net/')

# Get a reference to the homebuyers collection in the 'casa-compass' database
collection = client['casa-compass']['homebuyers']

# Insert the data into the 'homebuyers' collection
collection.insert_many(data)