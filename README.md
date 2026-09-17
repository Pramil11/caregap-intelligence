# CareGap Intelligence

CareGap Intelligence is a healthcare analytics project designed to answer a practical resource-allocation question:

> If a healthcare organization has limited resources for new clinics, mobile health units, or community health programs, which U.S. communities should it prioritize first?

The project will combine multiple U.S. federal datasets to analyze healthcare access, provider shortages, chronic disease burden, socioeconomic conditions, and hospital availability at the county level.

## Project Goal

The goal is to build a decision-support analytics system that helps identify communities with:

* High healthcare need
* Limited provider availability
* High chronic disease burden
* High uninsured rates
* Socioeconomic vulnerability
* Limited hospital access

The analysis will cover the United States, with a focused case study on Idaho and Washington.

## Data Sources

The project will use official public datasets from:

* Centers for Medicare & Medicaid Services (CMS)
* Centers for Disease Control and Prevention (CDC)
* Health Resources and Services Administration (HRSA)
* U.S. Census Bureau

## Planned Technology Stack

* Python
* pandas
* PostgreSQL
* SQL
* Power BI
* Streamlit
* Git
* GitHub

## Project Structure

```text
caregap-intelligence/
├── data/
│   ├── raw/
│   └── processed/
├── src/
├── sql/
├── notebooks/
├── dashboard/
├── reports/
├── docs/
├── README.md
├── .gitignore
└── requirements.txt
```

## Planned Workflow

1. Define the business problem
2. Acquire data from official sources
3. Profile and clean the data
4. Build a PostgreSQL database
5. Perform exploratory data analysis
6. Develop healthcare priority metrics
7. Perform sensitivity and scenario analysis
8. Build an interactive Power BI dashboard
9. Create an executive summary
10. Publish the project on GitHub and portfolio

## Main Analytical Question

Which U.S. counties have high healthcare need but relatively low healthcare capacity, and which communities remain high priority under different resource-allocation scenarios?

## Status

Project setup in progress.
