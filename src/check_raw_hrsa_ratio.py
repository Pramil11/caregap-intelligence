import pandas as pd


df = pd.read_csv(
    "data/raw/hrsa/hpsa_primary_care.csv",
    low_memory=False
)


print("HPSA Formal Ratio examples:")
print(
    df["HPSA Formal Ratio"]
    .head(20)
)


print("\nMissing values:")
print(
    df["HPSA Formal Ratio"]
    .isna()
    .sum()
)


print("\nUnique examples:")
print(
    df["HPSA Formal Ratio"]
    .dropna()
    .head(20)
)