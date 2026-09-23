import pandas as pd


df = pd.read_csv(
    "data/processed/county_healthcare_profile.csv"
)


print(df.shape)


print("\nColumns:")
print(df.columns.tolist())


print("\nSummary statistics:")
print(
    df.describe()
)