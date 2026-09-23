# Census ACS 2024 County Dataset Data Dictionary

## Dataset Overview

Source:
U.S. Census Bureau American Community Survey (ACS) 2024 5-Year Estimates

Geographic Level:
County

Primary Key:
county_fips

Number of Records:
3,222 counties/county equivalents

---

## Variables

| Column | Description | Type |
|---|---|---|
| county_name | Full county name | String |
| population | Total population estimate | Integer |
| poverty_rate | Percentage of population below poverty level | Float |
| uninsured_rate | Percentage of population without health insurance | Float |
| median_household_income | Median household income in dollars | Float |
| age_65_plus_rate | Percentage of population age 65 or older | Float |
| no_vehicle_rate | Percentage of households without a vehicle | Float |
| state | State FIPS code | String |
| county | County FIPS code within state | String |
| county_fips | Five-digit unique county identifier | String |

---

## Data Cleaning

The following cleaning steps were applied:

1. Converted numeric fields from text to numeric types.
2. Removed invalid Census special values.
3. Replaced unavailable estimates with missing values.
4. Created county_fips as the geographic join key.

---

## Intended Use

This dataset provides socioeconomic and demographic context for identifying counties with potential healthcare access challenges.

It will later be combined with:

- CDC health indicators
- HRSA provider shortage data
- CMS healthcare facility data