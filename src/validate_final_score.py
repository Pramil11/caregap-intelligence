import pandas as pd


df = pd.read_csv(
    "data/processed/final_caregap_scores.csv"
)


print("Dataset:")
print(df.shape)


print("\nCareGap Score v2 Summary:")
print(
    df["caregap_score_v2"]
    .describe()
)


print("\nTop 20 Counties:")
print(
    df[
        [
            "county_name",
            "state_name",
            "caregap_score_v2",
            "social_vulnerability_score",
            "health_burden_score",
            "healthcare_access_score",
            "caregap_rank_v2"
        ]
    ]
    .sort_values(
        "caregap_score_v2",
        ascending=False
    )
    .head(20)
)


print("\nCorrelation:")
print(
    df[
        [
            "caregap_score_v2",
            "poverty_rate",
            "diabetes_rate",
            "obesity_rate",
            "primary_care_hpsa_score",
            "provider_ratio"
        ]
    ]
    .corr()["caregap_score_v2"]
    .sort_values(
        ascending=False
    )
)