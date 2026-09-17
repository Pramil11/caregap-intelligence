# CareGap Intelligence - Project Charter

## Business Problem

Healthcare organizations often have limited resources for opening new clinics, deploying mobile health units, or funding community health programs.

The goal of this project is to identify U.S. counties where healthcare need is high but existing healthcare capacity is relatively low.

## Main Business Question

Which U.S. counties should be prioritized for additional healthcare resources?

## Stakeholders

Potential stakeholders include:

- Health system strategy teams
- Public health agencies
- Nonprofit healthcare organizations
- Community health organizations
- Government health planners

## Unit of Analysis

County level.

Each county will be identified using its 5-digit County FIPS code.

## Geographic Scope

The main dataset will cover the United States.

A focused case study will later examine:

- Idaho
- Washington

## Main Analytical Questions

1. Which counties have the highest healthcare need?
2. Which counties have shortages of healthcare providers?
3. Where do chronic disease burden and provider shortages overlap?
4. Which counties have high poverty and uninsured populations?
5. Which counties have relatively limited hospital access?
6. Which counties remain high priority when scoring assumptions change?

## Planned Data Sources

We plan to use:

- CMS hospital data
- CDC PLACES health data
- HRSA Health Professional Shortage Area data
- U.S. Census ACS demographic and socioeconomic data

## Planned Outputs

The project will eventually include:

- Clean PostgreSQL database
- SQL analysis
- Exploratory data analysis
- Healthcare priority score
- Scenario analysis
- Sensitivity analysis
- Power BI dashboard
- Streamlit public dashboard
- Executive summary
- GitHub case study