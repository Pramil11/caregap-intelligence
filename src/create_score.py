import pandas as pd
from pathlib import Path


df = pd.read_csv(
    "data/processed/county_healthcare_profile.csv"
)


social_features = [
    "poverty_rate",
    "uninsured_rate",
    "no_vehicle_rate",
    "age_65_plus_rate"
]


health_features = [
    "diabetes_rate",
    "obesity_rate",
    "copd_rate",
    "physical_inactivity_rate"
]


# Min-max normalization

for col in social_features + health_features:

    df[col + "_norm"] = (
        (df[col] - df[col].min())
        /
        (df[col].max() - df[col].min())
    )


# Social vulnerability score

df["social_vulnerability_score"] = (
    df[[col + "_norm" for col in social_features]]
    .mean(axis=1)
)


# Health burden score

df["health_burden_score"] = (
    df[[col + "_norm" for col in health_features]]
    .mean(axis=1)
)


# Overall score

df["caregap_score"] = (
    0.5 * df["social_vulnerability_score"]
    +
    0.5 * df["health_burden_score"]
)


# Rank counties

df["caregap_rank"] = (
    df["caregap_score"]
    .rank(
        ascending=False,
        method="dense"
    )
)


output = Path(
    "data/processed/county_caregap_scores.csv"
)


df.to_csv(
    output,
    index=False
)


print(df[
    [
        "county_name",
        "state",
        "caregap_score",
        "caregap_rank"
    ]
].head(20))


print("\nSaved:")
print(output)