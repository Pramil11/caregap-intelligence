import pandas as pd
import requests
from pathlib import Path


url = "https://data.cdc.gov/resource/fu4u-a9bh.json"


all_data = []

limit = 1000
offset = 0


while True:

    print(f"Downloading rows {offset} - {offset + limit}")

    params = {
        "$limit": limit,
        "$offset": offset
    }

    response = requests.get(
        url,
        params=params
    )

    response.raise_for_status()

    data = response.json()

    if len(data) == 0:
        break

    all_data.extend(data)

    offset += limit


df = pd.DataFrame(all_data)


print("\nTotal rows:", len(df))

print("\nColumns:")
print(df.columns.tolist())


raw_path = Path(
    "data/raw/cdc_places_raw.csv"
)

df.to_csv(
    raw_path,
    index=False
)


print("\nSaved:")
print(raw_path)

print("\nNumber of unique measures:")
print(df["measure"].nunique())


print("\nAvailable measures:")
print(
    df["measure"]
    .drop_duplicates()
    .sort_values()
    .to_string()
)