import pandas as pd
from pathlib import Path


# Load datasets

census_path = Path(
    "data/processed/census_acs_2024_county.csv"
)

cdc_path = Path(
    "data/processed/cdc_places_county.csv"
)


census = pd.read_csv(census_path)

cdc = pd.read_csv(cdc_path)


print("Census rows:", len(census))
print("CDC rows:", len(cdc))


# Make sure FIPS is string

census["county_fips"] = (
    census["county_fips"]
    .astype(str)
    .str.zfill(5)
)

cdc["county_fips"] = (
    cdc["county_fips"]
    .astype(str)
    .str.zfill(5)
)


# Merge datasets

healthcare_profile = census.merge(
    cdc,
    on="county_fips",
    how="left"
)

# Remove Puerto Rico municipalities
healthcare_profile = healthcare_profile[
    healthcare_profile["state"] != 72
]

print("\nMerged rows:")
print(len(healthcare_profile))

print(
    "\nRows after removing Puerto Rico:",
    len(healthcare_profile)
)
print("\nMissing CDC values:")
print(
    healthcare_profile[
        [
            "copd_rate",
            "diabetes_rate",
            "physical_inactivity_rate",
            "obesity_rate"
        ]
    ]
    .isnull()
    .sum()
)


print("\nPreview:")
print(
    healthcare_profile.head()
)

missing_cdc = healthcare_profile[
    healthcare_profile["diabetes_rate"].isna()
]


print("\nCounties missing CDC data:")
print(
    missing_cdc[
        [
            "county_name",
            "state",
            "county_fips"
        ]
    ].head(20)
)


print("\nStates with missing CDC data:")
print(
    missing_cdc["state"]
    .value_counts()
)

# Save final dataset

output = Path(
    "data/processed/county_healthcare_profile.csv"
)


healthcare_profile.to_csv(
    output,
    index=False
)


print("\nSaved:")
print(output)