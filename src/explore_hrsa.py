import pandas as pd


path = "data/raw/hrsa/hpsa_primary_care.csv"


df = pd.read_csv(path)


print("Shape:")
print(df.shape)


print("\nColumns:")
print(df.columns.tolist())


print("\nFirst rows:")
print(df.head())


print("\nData types:")
print(df.dtypes)