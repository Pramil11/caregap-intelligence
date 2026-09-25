import pandas as pd


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


# -----------------------------
# Min-max normalization
# -----------------------------

def normalize(column):

    return (
        (column - column.min())
        /
        (column.max() - column.min())
    )


# -----------------------------
# Social Vulnerability
# -----------------------------

for col in social_features:
    df[col + "_norm"] = normalize(df[col])


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
# Health Burden
# -----------------------------

for col in health_features:
    df[col + "_norm"] = normalize(df[col])


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
# Healthcare Access
# -----------------------------

df["healthcare_access_score"] = normalize(
    df["primary_care_hpsa_score"]
)


# -----------------------------
# Final Score
# -----------------------------

df["caregap_score_final"] = (
    0.4 * df["social_vulnerability_score"]
    +
    0.4 * df["health_burden_score"]
    +
    0.2 * df["healthcare_access_score"]
)


df["caregap_rank_final"] = (
    df["caregap_score_final"]
    .rank(
        ascending=False,
        method="dense"
    )
)


output = (
    "data/processed/final_caregap_dataset.csv"
)


df.to_csv(
    output,
    index=False
)


print(
    df[
        [
            "county_name",
            "state_name",
            "caregap_score_final",
            "caregap_rank_final"
        ]
    ]
    .sort_values(
        "caregap_score_final",
        ascending=False
    )
    .head(20)
)


print("\nSaved:")
print(output)