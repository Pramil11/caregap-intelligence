import pandas as pd


df = pd.read_csv(
    "data/processed/county_caregap_scores.csv"
)


print("Dataset shape:")
print(df.shape)


print("\nCareGap Score Summary:")
print(
    df["caregap_score"]
    .describe()
)


print("\nHighest CareGap Scores:")
print(
    df[
        [
            "county_name",
            "state_name",
            "caregap_score",
            "caregap_rank"
        ]
    ]
    .sort_values(
        "caregap_score",
        ascending=False
    )
    .head(20)
)


print("\nLowest CareGap Scores:")
print(
    df[
        [
            "county_name",
            "state_name",
            "caregap_score",
            "caregap_rank"
        ]
    ]
    .sort_values(
        "caregap_score",
        ascending=True
    )
    .head(20)
)


print("\nCorrelation with major indicators:")

print(
    df[
        [
            "caregap_score",
            "poverty_rate",
            "uninsured_rate",
            "diabetes_rate",
            "obesity_rate",
            "copd_rate"
        ]
    ]
    .corr()["caregap_score"]
    .sort_values(
        ascending=False
    )
)