import pandas as pd
import psycopg2


# CSV path

csv_path = "data/processed/final_caregap_dataset.csv"


# Read dataset

df = pd.read_csv(
    csv_path,
    dtype={
        "county_fips": str
    }
)

df["county_fips"] = df["county_fips"].str.zfill(5)

print("Rows loaded from CSV:")
print(len(df))


# Database connection

conn = psycopg2.connect(
    host="localhost",
    database="caregap_db",
    user="postgres",
    password="Nepal@826333"
)


cursor = conn.cursor()


# Insert query

query = """
INSERT INTO county_profiles (
    county_name,
    state_name,
    county_fips,
    population,
    poverty_rate,
    uninsured_rate,
    median_household_income,
    age_65_plus_rate,
    no_vehicle_rate,
    diabetes_rate,
    obesity_rate,
    copd_rate,
    physical_inactivity_rate,
    primary_care_hpsa_score,
    primary_care_shortage,
    social_vulnerability_score,
    health_burden_score,
    healthcare_access_score,
    caregap_score_final,
    caregap_rank_final
)
VALUES (
    %s,%s,%s,%s,%s,
    %s,%s,%s,%s,%s,
    %s,%s,%s,%s,%s,
    %s,%s,%s,%s,%s
)
"""


for _, row in df.iterrows():

    cursor.execute(
        query,
        (
            row["county_name"],
            row["state_name"],
            row["county_fips"],
            row["population"],
            row["poverty_rate"],
            row["uninsured_rate"],
            row["median_household_income"],
            row["age_65_plus_rate"],
            row["no_vehicle_rate"],
            row["diabetes_rate"],
            row["obesity_rate"],
            row["copd_rate"],
            row["physical_inactivity_rate"],
            row["primary_care_hpsa_score"],
            row["primary_care_shortage"],
            row["social_vulnerability_score"],
            row["health_burden_score"],
            row["healthcare_access_score"],
            row["caregap_score_final"],
            row["caregap_rank_final"]
        )
    )


conn.commit()


cursor.close()
conn.close()


print("Database loading complete!")