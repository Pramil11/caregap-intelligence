import pandas as pd
import numpy as np


df = pd.read_csv(
    "data/processed/county_caregap_v2.csv"
)


# Fill missing values

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
# Normalize function
# -----------------------------

def minmax(series):

    return (
        (series - series.min())
        /
        (series.max() - series.min())
    )


# Normalize HPSA score

df["hpsa_norm"] = minmax(
    df["primary_care_hpsa_score"]
)


# Log transform provider ratio

df["provider_ratio_log"] = np.log1p(
    df["provider_ratio"]
)


df["provider_ratio_norm"] = minmax(
    df["provider_ratio_log"]
)


# -----------------------------
# Compare three access models
# -----------------------------


# Model A:
# 50% HPSA + 50% Provider Ratio

df["access_model_A"] = (
    0.5 * df["hpsa_norm"]
    +
    0.5 * df["provider_ratio_norm"]
)


# Model B:
# 70% HPSA + 30% Provider Ratio

df["access_model_B"] = (
    0.7 * df["hpsa_norm"]
    +
    0.3 * df["provider_ratio_norm"]
)


# Model C:
# HPSA only

df["access_model_C"] = (
    df["hpsa_norm"]
)


# -----------------------------
# Compare correlation
# -----------------------------

print("\nCorrelation with original CareGap score:")

print(
    df[
        [
            "caregap_score",
            "access_model_A",
            "access_model_B",
            "access_model_C"
        ]
    ]
    .corr()["caregap_score"]
)


# -----------------------------
# Top counties comparison
# -----------------------------

for model in [
    "access_model_A",
    "access_model_B",
    "access_model_C"
]:

    print("\n====================")
    print(model)
    print("====================")

    print(
        df[
            [
                "county_name",
                "state_name",
                model
            ]
        ]
        .sort_values(
            model,
            ascending=False
        )
        .head(10)
    )


# Save comparison file

df.to_csv(
    "data/processed/access_weight_comparison.csv",
    index=False
)


print("\nSaved:")
print(
    "data/processed/access_weight_comparison.csv"
)