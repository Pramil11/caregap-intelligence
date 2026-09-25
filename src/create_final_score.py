import pandas as pd
import numpy as np


df = pd.read_csv(
    "data/processed/county_caregap_v2.csv"
)


# -----------------------------
# Fill missing HRSA values
# -----------------------------

df["primary_care_hpsa_score"] = (
    df["primary_care_hpsa_score"]
    .fillna(0)
)


df["provider_ratio"] = (
    df["provider_ratio"]
    .fillna(
        df["provider_ratio"].median()
    )
)


# -----------------------------
# Feature groups
# -----------------------------

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


# Access variables

access_features = [
    "primary_care_hpsa_score",
]


# -----------------------------
# Normalize function
# -----------------------------

def minmax(series):

    return (
        (series - series.min())
        /
        (series.max() - series.min())
    )


# -----------------------------
# Social score
# -----------------------------

for col in social_features:

    df[col + "_norm"] = minmax(df[col])


df["social_vulnerability_score"] = (
    df[
        [
            col + "_norm"
            for col in social_features
        ]
    ]
    .mean(axis=1)
)


# -----------------------------
# Health score
# -----------------------------

for col in health_features:

    df[col + "_norm"] = minmax(df[col])


df["health_burden_score"] = (
    df[
        [
            col + "_norm"
            for col in health_features
        ]
    ]
    .mean(axis=1)
)


# -----------------------------
# Access score
# -----------------------------

df["hpsa_score_norm"] = minmax(
    df["primary_care_hpsa_score"]
)


# Log transform provider ratio

df["provider_ratio_log"] = np.log1p(
    df["provider_ratio"]
)


df["provider_ratio_norm"] = minmax(
    df["provider_ratio_log"]
)


df["healthcare_access_score"] = (
    0.5 * df["hpsa_score_norm"]
    +
    0.5 * df["provider_ratio_norm"]
)


# -----------------------------
# Final CareGap Score
# -----------------------------

df["caregap_score_v2"] = (
    0.4 * df["social_vulnerability_score"]
    +
    0.4 * df["health_burden_score"]
    +
    0.2 * df["healthcare_access_score"]
)


df["caregap_rank_v2"] = (
    df["caregap_score_v2"]
    .rank(
        ascending=False,
        method="dense"
    )
)


df.to_csv(
    "data/processed/final_caregap_scores.csv",
    index=False
)


print(
    df[
        [
            "county_name",
            "state_name",
            "caregap_score_v2",
            "caregap_rank_v2"
        ]
    ]
    .sort_values(
        "caregap_score_v2",
        ascending=False
    )
    .head(20)
)


print("\nSaved:")
print(
    "data/processed/final_caregap_scores.csv"
)