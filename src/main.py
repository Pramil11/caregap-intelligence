from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from fastapi import HTTPException
from src.database import SessionLocal
from src.models import CountyProfile
from src.schemas import CountyResponse
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import func

app = FastAPI(
    title="CareGap Intelligence API"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()



@app.get("/")
def home():

    return {
        "message": "CareGap Intelligence API running"
    }



@app.get(
    "/counties",
    response_model=list[CountyResponse]
)
def get_counties(
    db: Session = Depends(get_db)
):

    counties = (
        db.query(CountyProfile)
        .all()
    )

    return counties



@app.get(
    "/top-counties",
    response_model=list[CountyResponse]
)
def top_counties(
    db: Session = Depends(get_db)
):

    counties = (
        db.query(CountyProfile)
        .order_by(
            CountyProfile.caregap_score_final.desc()
        )
        .limit(20)
        .all()
    )

    return counties


@app.get("/county/{fips}", response_model=CountyResponse)
def get_county(
    fips: str,
    db: Session = Depends(get_db)
):

    fips = fips.zfill(5)

    county = (
        db.query(CountyProfile)
        .filter(
            CountyProfile.county_fips == fips
        )
        .first()
    )

    if county is None:
        raise HTTPException(
            status_code=404,
            detail="County not found"
        )

    return county



@app.get("/stats")
def stats(
    db: Session = Depends(get_db)
):

    total = (
        db.query(CountyProfile)
        .count()
    )


    scores = (
        db.query(
            CountyProfile.caregap_score_final
        )
        .all()
    )


    avg = sum(
        x[0]
        for x in scores
    ) / total


    high_risk = (
        db.query(CountyProfile)
        .filter(
            CountyProfile.caregap_score_final >= 0.4
        )
        .count()
    )


    return {
        "total_counties": total,
        "average_caregap_score": avg,
        "high_risk_count": high_risk,
    }

@app.get("/risk-distribution")
def risk_distribution(
    db: Session = Depends(get_db)
):

    high = (
        db.query(CountyProfile)
        .filter(
            CountyProfile.caregap_score_final >= 0.4
        )
        .count()
    )


    medium = (
        db.query(CountyProfile)
        .filter(
            CountyProfile.caregap_score_final >= 0.3,
            CountyProfile.caregap_score_final < 0.4
        )
        .count()
    )


    low = (
        db.query(CountyProfile)
        .filter(
            CountyProfile.caregap_score_final < 0.3
        )
        .count()
    )


    return {
        "low": low,
        "medium": medium,
        "high": high
    }

@app.get("/state-risk")
def state_risk(
    db: Session = Depends(get_db)
):

    results = (
        db.query(
            CountyProfile.state_name,
            func.avg(
                CountyProfile.caregap_score_final
            ).label("average_score")
        )
        .group_by(
            CountyProfile.state_name
        )
        .order_by(
            func.avg(
                CountyProfile.caregap_score_final
            ).desc()
        )
        .all()
    )


    return [
        {
            "state": row.state_name,
            "score": round(row.average_score,3)
        }
        for row in results
    ]

@app.get("/states")
def get_states(
    db: Session = Depends(get_db)
):

    results = (
        db.query(
            CountyProfile.state_name
        )
        .distinct()
        .order_by(
            CountyProfile.state_name
        )
        .all()
    )

    return [
        {
            "state": row.state_name
        }
        for row in results
    ]

@app.get("/state/{state_name}")
def get_state(
    state_name: str,
    db: Session = Depends(get_db)
):

    counties = (
        db.query(CountyProfile)
        .filter(
            func.lower(
                CountyProfile.state_name
            ) == state_name.lower()
        )
        .all()
    )


    if not counties:

        raise HTTPException(
            status_code=404,
            detail="State not found"
        )


    total_counties = len(counties)


    average_score = sum(
        county.caregap_score_final
        for county in counties
    ) / total_counties


    high_risk = sum(
        1
        for county in counties
        if county.caregap_score_final >= 0.4
    )


    highest_risk = max(
        counties,
        key=lambda county:
            county.caregap_score_final
    )


    total_population = sum(
        county.population or 0
        for county in counties
    )


    return {

        "state": counties[0].state_name,

        "total_counties": total_counties,

        "average_caregap_score":
            round(average_score, 3),

        "high_risk_counties":
            high_risk,

        "highest_risk_county":
            highest_risk.county_name,

        "highest_risk_score":
            round(
                highest_risk.caregap_score_final,
                3
            ),

        "population":
            total_population

    }

@app.get("/state/{state_name}/counties")
def get_state_counties(
    state_name: str,
    db: Session = Depends(get_db)
):

    counties = (
        db.query(CountyProfile)
        .filter(
            func.lower(
                CountyProfile.state_name
            ) == state_name.lower()
        )
        .order_by(
            CountyProfile.caregap_score_final.desc()
        )
        .all()
    )


    if not counties:

        raise HTTPException(
            status_code=404,
            detail="State not found"
        )


    return [

        {
            "county_name":
                county.county_name,

            "county_fips":
                county.county_fips,

            "population":
                county.population,

            "caregap_score":
                round(
                    county.caregap_score_final,
                    3
                ),

            "poverty_rate":
                county.poverty_rate,

            "uninsured_rate":
                county.uninsured_rate,

            "healthcare_access_score":
                county.healthcare_access_score,

            "social_vulnerability_score":
                county.social_vulnerability_score,

            "health_burden_score":
                county.health_burden_score

        }

        for county in counties

    ]