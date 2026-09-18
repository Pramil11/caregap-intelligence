import os
import requests
import pandas as pd
from dotenv import load_dotenv
from pathlib import Path


# Load environment variables
load_dotenv()

api_key = os.getenv("CENSUS_API_KEY")


# Census API URL
url = "https://api.census.gov/data/2024/acs/acs5/profile"


# Variables we want from Census
variables = {
    "NAME": "county_name",
    "DP05_0001E": "population",
    "DP03_0128PE": "poverty_rate",
    "DP03_0099PE": "uninsured_rate",
    "DP03_0062E": "median_household_income",
    "DP05_0024PE": "age_65_plus_rate",
    "DP04_0058PE": "no_vehicle_rate"
}


# API request parameters
params = {
    "get": ",".join(variables.keys()),
    "for": "county:*",
    "in": "state:*",
    "key": api_key
}


# Request data from Census API
response = requests.get(url, params=params)

response.raise_for_status()

data = response.json()


# ============================
# Save RAW Census response
# ============================

raw_df = pd.DataFrame(
    data[1:],
    columns=data[0]
)

raw_path = Path(
    "data/raw/census_acs_2024_county_raw.csv"
)

raw_df.to_csv(
    raw_path,
    index=False
)


# ============================
# Begin cleaning
# ============================

df = raw_df.copy()


# Rename columns
df = df.rename(columns=variables)


# Create county FIPS code
df["county_fips"] = (
    df["state"].str.zfill(2)
    + df["county"].str.zfill(3)
)


# Columns that should be numeric
numeric_columns = [
    "population",
    "poverty_rate",
    "uninsured_rate",
    "median_household_income",
    "age_65_plus_rate",
    "no_vehicle_rate"
]


# Convert text to numbers
for column in numeric_columns:
    df[column] = pd.to_numeric(
        df[column],
        errors="coerce"
    )


# Replace Census special negative values with missing
df[numeric_columns] = df[numeric_columns].mask(
    df[numeric_columns] < 0
)


# ============================
# Data quality checks
# ============================

print(df.head())


print("\nNumber of counties:", len(df))


print("\nData types:")
print(df.dtypes)


print("\nMissing values:")
print(df.isnull().sum())


print("\nMinimum values:")
print(df[numeric_columns].min())


print("\nNegative value counts:")
for column in numeric_columns:
    print(
        column,
        (df[column] < 0).sum()
    )


print("\nRows with missing income:")
print(
    df.loc[
        df["median_household_income"].isna(),
        [
            "county_name",
            "county_fips",
            "median_household_income"
        ]
    ]
)


# ============================
# Save cleaned dataset
# ============================

processed_path = Path(
    "data/processed/census_acs_2024_county.csv"
)


df.to_csv(
    processed_path,
    index=False
)


print("\nSaved raw file:")
print(raw_path)


print("\nSaved processed file:")
print(processed_path)