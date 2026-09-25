import pandas as pd


df = pd.read_csv(
    "data/processed/hrsa_access_county.csv"
)


print(df.head())


print("\nProvider ratio missing:")
print(
    df["provider_ratio"]
    .isna()
    .sum()
)


print("\nProvider ratio summary:")
print(
    df["provider_ratio"]
    .describe()
)


print("\nNon-null examples:")
print(
    df[
        df["provider_ratio"].notna()
    ]
    .head(20)
)