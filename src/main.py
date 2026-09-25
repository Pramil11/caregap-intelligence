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
            CountyProfile.caregap_score_final >= 0.5
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
            CountyProfile.caregap_score_final >= 0.6
        )
        .count()
    )


    medium = (
        db.query(CountyProfile)
        .filter(
            CountyProfile.caregap_score_final >= 0.35,
            CountyProfile.caregap_score_final < 0.6
        )
        .count()
    )


    low = (
        db.query(CountyProfile)
        .filter(
            CountyProfile.caregap_score_final < 0.35
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