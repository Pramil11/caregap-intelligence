import pandas as pd


caregap = pd.read_csv(
    "data/processed/county_caregap_scores.csv"
)

hrsa = pd.read_csv(
    "data/processed/hrsa_access_county.csv"
)


# Ensure FIPS format

caregap["county_fips"] = (
    caregap["county_fips"]
    .astype(str)
    .str.zfill(5)
)

hrsa["county_fips"] = (
    hrsa["county_fips"]
    .astype(str)
    .str.zfill(5)
)


# Merge

df = caregap.merge(
    hrsa,
    on="county_fips",
    how="left"
)


# Counties without HPSA designation

df["primary_care_shortage"] = (
    df["primary_care_shortage"]
    .fillna(0)
)


df["hpsa_score"] = (
    df["primary_care_hpsa_score"]
    .fillna(0)
)


print("Rows:")
print(len(df))


print("\nMissing HRSA:")
print(
    df[
        [
            "primary_care_hpsa_score",
            "provider_ratio"
        ]
    ]
    .isna()
    .sum()
)


print("\nPreview:")
print(
    df[
        [
            "county_name",
            "state_name",
            "caregap_score",
            "hpsa_score",
            "primary_care_shortage"
        ]
    ]
    .head()
)


df.to_csv(
    "data/processed/county_caregap_v2.csv",
    index=False
)


print("\nSaved:")
print(
    "data/processed/county_caregap_v2.csv"
)