# CareGap Intelligence

CareGap Intelligence is a healthcare analytics project designed to answer a practical resource-allocation question:

> If a healthcare organization has limited resources for new clinics, mobile health units, or community health programs, which U.S. communities should it prioritize first?

The project combines multiple U.S. public datasets to analyze healthcare access, provider shortages, chronic disease burden, and socioeconomic conditions at the county level.

The completed platform provides interactive analysis across **3,144 U.S. counties and 50 states**, allowing users to explore national patterns, compare states, and investigate individual counties using a composite **CareGap Score**.

## Live Application

**Live Dashboard:**  
https://caregap-intelligence.vercel.app/

**GitHub Repository:**  
https://github.com/Pramil11/caregap-intelligence

**Backend API:**  
https://caregap-intelligence-api.onrender.com/

**API Documentation:**  
https://caregap-intelligence-api.onrender.com/docs

---

## Project Goal

The goal is to build a decision-support analytics system that helps identify communities with:

- High healthcare need
- Limited primary-care availability
- High chronic disease burden
- High uninsured rates
- Socioeconomic vulnerability
- Transportation limitations

The analysis covers the United States at the county level and provides both national and state-level exploration.

---

## Main Analytical Question

> Which U.S. counties have the greatest estimated healthcare gaps, and what socioeconomic, health, and healthcare-access factors contribute to those gaps?

The project is designed to make this analysis accessible through an interactive web application rather than requiring users to work directly with raw datasets.

---

# Dashboard

The national dashboard provides an overview of healthcare gaps across the United States.

It currently analyzes:

- **3,144 counties**
- **50 states**
- County-level CareGap Scores
- State-level average CareGap Scores
- County risk distribution
- Highest-risk counties
- Interactive geographic visualization

### National Dashboard

The dashboard allows users to begin with a national view and progressively explore more detailed geographic information.

Users can:

1. View national statistics.
2. Explore the United States map.
3. Hover over states to view their CareGap information.
4. Click or interact with states.
5. Double-click a state to open its detailed analysis.
6. Explore individual counties within a state.

---

# State-Level Analysis

Each state has a dedicated State Explorer.

The State Explorer provides:

- Total number of counties
- Average CareGap Score
- Number of high-risk counties
- State population
- Highest-risk county
- Top 10 counties by CareGap Score
- Interactive county-level map
- County risk classification
- Detailed county table

For example:

```text
United States
      │
      ▼
    Idaho
      │
      ├── Ada County
      ├── Canyon County
      ├── Payette County
      ├── ...
      │
      ▼
County-level CareGap analysis