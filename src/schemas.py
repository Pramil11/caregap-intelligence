from pydantic import BaseModel


class CountyResponse(BaseModel):

    county_name: str
    state_name: str
    county_fips: str

    population: int

    caregap_score_final: float
    caregap_rank_final: int

    social_vulnerability_score: float
    health_burden_score: float
    healthcare_access_score: float


    class Config:
        from_attributes = True