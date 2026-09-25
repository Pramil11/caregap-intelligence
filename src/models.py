from sqlalchemy import Column, Integer, Float, Text
from src.database import engine
from sqlalchemy.orm import declarative_base


Base = declarative_base()


class CountyProfile(Base):

    __tablename__ = "county_profiles"

    id = Column(Integer, primary_key=True)

    county_name = Column(Text)
    state_name = Column(Text)
    county_fips = Column(Text)

    population = Column(Integer)

    poverty_rate = Column(Float)
    uninsured_rate = Column(Float)
    median_household_income = Column(Float)
    age_65_plus_rate = Column(Float)
    no_vehicle_rate = Column(Float)

    diabetes_rate = Column(Float)
    obesity_rate = Column(Float)
    copd_rate = Column(Float)
    physical_inactivity_rate = Column(Float)

    primary_care_hpsa_score = Column(Float)
    primary_care_shortage = Column(Integer)

    social_vulnerability_score = Column(Float)
    health_burden_score = Column(Float)
    healthcare_access_score = Column(Float)

    caregap_score_final = Column(Float)
    caregap_rank_final = Column(Integer)