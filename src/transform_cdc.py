import pandas as pd
from pathlib import Path


# Load raw CDC data
raw_path = Path(
    "data/raw/cdc_places_raw.csv"
)

df = pd.read_csv(
    raw_path,
    low_memory=False
)


print("Raw rows:", len(df))


# Measures we need
selected_measures = [
    "Diagnosed diabetes among adults",
    "Obesity among adults",
    "High blood pressure",
    "Chronic obstructive pulmonary disease among adults",
    "No leisure-time physical activity among adults"
]


# Filter indicators
df = df[
    df["measure"].isin(selected_measures)
]


# Keep age-adjusted estimates only
df = df[
    df["data_value_type"].str.contains(
        "Age-adjusted",
        na=False
    )
]


print("Filtered rows:", len(df))


# Keep useful columns
df = df[
    [
        "locationid",
        "locationname",
        "measure",
        "data_value",
        "data_value_type"
    ]
]


# Convert values to numeric
df["data_value"] = pd.to_numeric(
    df["data_value"],
    errors="coerce"
)


# Rename location id
df = df.rename(
    columns={
        "locationid": "county_fips"
    }
)


# Convert FIPS to string
df["county_fips"] = (
    df["county_fips"]
    .astype(str)
)


print(df.head())

print("\nDuplicate county-measure combinations:")

print(
    df.duplicated(
        subset=[
            "county_fips",
            "measure"
        ]
    ).sum()
)

# Pivot measures into columns
health_df = df.pivot_table(
    index=[
        "county_fips",
        "locationname"
    ],
    columns="measure",
    values="data_value",
    aggfunc="first"
).reset_index()

health_df = health_df.rename(
    columns={
        "Chronic obstructive pulmonary disease among adults": "copd_rate",
        "Diagnosed diabetes among adults": "diabetes_rate",
        "No leisure-time physical activity among adults": "physical_inactivity_rate",
        "Obesity among adults": "obesity_rate"
    }
)

print("\nFinal shape:")
print(health_df.shape)


print("\nColumns:")
print(health_df.columns)


# Save processed file
output = Path(
    "data/processed/cdc_places_county.csv"
)

health_df.to_csv(
    output,
    index=False
)


print("\nSaved:")
print(output)