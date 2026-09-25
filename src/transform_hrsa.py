import pandas as pd
from pathlib import Path


input_path = "data/raw/hrsa/hpsa_primary_care.csv"


df = pd.read_csv(
    input_path,
    low_memory=False
)


print("Raw rows:", len(df))


# Keep only active shortage areas
df = df[
    df["HPSA Status"] == "Designated"
]


print("Designated rows:", len(df))


# Select important columns

df = df[
    [
        "Common State County FIPS Code",
        "HPSA Discipline Class",
        "HPSA Score",
        "HPSA Formal Ratio",
        "HPSA Designation Population"
    ]
]


# Rename columns

df = df.rename(
    columns={
        "Common State County FIPS Code": "county_fips",
        "HPSA Score": "hpsa_score",
        "HPSA Formal Ratio": "provider_ratio",
        "HPSA Designation Population": "hpsa_population"
    }
)


# Ensure FIPS format

df["county_fips"] = (
    df["county_fips"]
    .astype(str)
    .str.zfill(5)
)


# Convert numeric fields

numeric_cols = [
    "hpsa_score",
    "provider_ratio",
    "hpsa_population"
]

df["provider_ratio"] = (
    df["provider_ratio"]
    .str.extract(r"(\d+)")
    [0]
)

df["provider_ratio"] = pd.to_numeric(
    df["provider_ratio"],
    errors="coerce"
)


# Convert other numeric columns

for col in [
    "hpsa_score",
    "hpsa_population"
]:

    df[col] = pd.to_numeric(
        df[col],
        errors="coerce"
    )

# Aggregate counties
# If multiple HPSAs exist, keep highest shortage score

county_hrsa = (
    df.groupby("county_fips")
    .agg(
        primary_care_hpsa_score=("hpsa_score", "max"),
        provider_ratio=("provider_ratio", "max"),
        hpsa_population=("hpsa_population", "sum")
    )
    .reset_index()
)


# Add shortage indicator

county_hrsa["primary_care_shortage"] = 1


print("\nProcessed:")
print(county_hrsa.head())


print("\nCounties with shortage:")
print(len(county_hrsa))


output = Path(
    "data/processed/hrsa_access_county.csv"
)


county_hrsa.to_csv(
    output,
    index=False
)


print("\nSaved:")
print(output)