import { Link } from "react-router-dom";


function UnderstandingCareGap(){

    return (

        <div className="methodology-page">


            {/* =========================
                Hero
            ========================== */}

            <section className="methodology-hero">

                <Link
                    to="/"
                    className="back-link"
                >
                    ← Back to Dashboard
                </Link>


                <div className="methodology-kicker">
                    METHODOLOGY
                </div>


                <h1>
                    Understanding CareGap
                </h1>


                <p>
                    How the CareGap Index is calculated,
                    interpreted, and used to compare
                    healthcare gaps across U.S. counties.
                </p>

            </section>



            {/* =========================
                What is CareGap?
            ========================== */}

            <section className="methodology-section">

                <div className="section-label">
                    01
                </div>


                <h2>
                    What is CareGap?
                </h2>


                <p>

                    CareGap is a composite analytical
                    index created for this project to
                    compare estimated healthcare gaps
                    across U.S. counties.

                </p>


                <p>

                    The index combines three dimensions:
                    social vulnerability, health burden,
                    and healthcare access.

                </p>



                <div className="score-scale">

                    <div className="scale-label left">
                        Lower estimated gap
                    </div>


                    <div className="scale-bar">

                        <span className="scale-marker low">
                            0.00
                        </span>


                        <span className="scale-marker medium">
                            0.30
                        </span>


                        <span className="scale-marker high">
                            0.40
                        </span>


                        <span className="scale-marker max">
                            1.00
                        </span>

                    </div>


                    <div className="scale-label right">
                        Higher estimated gap
                    </div>

                </div>

            </section>





            {/* =========================
                Three Components
            ========================== */}

            <section className="methodology-section">

                <div className="section-label">
                    02
                </div>


                <h2>
                    What goes into the score?
                </h2>


                <div className="component-grid">


                    <div className="component-card">

                        <div className="component-number">
                            40%
                        </div>


                        <h3>
                            Social Vulnerability
                        </h3>


                        <p>
                            Measures socioeconomic and
                            demographic conditions that
                            may affect access to healthcare.
                        </p>


                        <ul>

                            <li>
                                Poverty rate
                            </li>

                            <li>
                                Uninsured rate
                            </li>

                            <li>
                                No-vehicle rate
                            </li>

                            <li>
                                Age 65+ rate
                            </li>

                        </ul>

                    </div>



                    <div className="component-card">

                        <div className="component-number">
                            40%
                        </div>


                        <h3>
                            Health Burden
                        </h3>


                        <p>
                            Represents the prevalence of
                            selected health conditions and
                            physical inactivity.
                        </p>


                        <ul>

                            <li>
                                Diabetes rate
                            </li>

                            <li>
                                Obesity rate
                            </li>

                            <li>
                                COPD rate
                            </li>

                            <li>
                                Physical inactivity rate
                            </li>

                        </ul>

                    </div>



                    <div className="component-card">

                        <div className="component-number">
                            20%
                        </div>


                        <h3>
                            Healthcare Access
                        </h3>


                        <p>
                            Represents primary-care shortage
                            conditions using the HRSA HPSA score.
                        </p>


                        <ul>

                            <li>
                                Primary-care HPSA score
                            </li>

                        </ul>

                    </div>


                </div>

            </section>





            {/* =========================
                Normalization
            ========================== */}

            <section className="methodology-section">

                <div className="section-label">
                    03
                </div>


                <h2>
                    Step 1: Normalize the indicators
                </h2>


                <p>

                    The underlying indicators are measured
                    on different scales. To make them
                    comparable, each indicator is converted
                    to a value between 0 and 1 using
                    min-max normalization.

                </p>


                <div className="formula-card">

                    <div className="formula-title">
                        Min-Max Normalization
                    </div>


                    <div className="formula">

                        Normalized Value =

                        <span className="fraction">

                            <span>
                                x − minimum
                            </span>

                            <span>
                                maximum − minimum
                            </span>

                        </span>

                    </div>

                </div>


                <div className="example-card">

                    <h3>
                        Simple example
                    </h3>


                    <p>

                        Suppose a county has a poverty
                        rate of 21%, while the minimum
                        observed value is 2% and the
                        maximum is 40%.

                    </p>


                    <div className="calculation">

                        (21 − 2) ÷ (40 − 2)

                        <strong>
                            = 0.500
                        </strong>

                    </div>


                    <p>

                        The county therefore receives a
                        normalized poverty value of 0.500
                        for this illustration.

                    </p>

                </div>


                <div className="note-card">

                    <strong>
                        Important:
                    </strong>

                    <span>

                        Normalization creates a relative
                        scale within the analyzed dataset.
                        A value of 0 does not mean zero
                        poverty or zero health burden.

                    </span>

                </div>

            </section>





            {/* =========================
                Social Score
            ========================== */}

            <section className="methodology-section">

                <div className="section-label">
                    04
                </div>


                <h2>
                    Step 2: Calculate Social Vulnerability
                </h2>


                <p>

                    Each of the four social indicators is
                    normalized separately. The four
                    normalized values are then averaged
                    with equal weight.

                </p>


                <div className="formula-card">

                    <div className="formula">

                        Social Vulnerability =

                        <span className="formula-inline">

                            (Poverty + Uninsured +
                            No Vehicle + Age 65+) ÷ 4

                        </span>

                    </div>

                </div>


                <div className="weight-grid">

                    <div>
                        Poverty
                        <strong>25%</strong>
                    </div>

                    <div>
                        Uninsured
                        <strong>25%</strong>
                    </div>

                    <div>
                        No Vehicle
                        <strong>25%</strong>
                    </div>

                    <div>
                        Age 65+
                        <strong>25%</strong>
                    </div>

                </div>

            </section>





            {/* =========================
                Health Score
            ========================== */}

            <section className="methodology-section">

                <div className="section-label">
                    05
                </div>


                <h2>
                    Step 3: Calculate Health Burden
                </h2>


                <p>

                    The same process is applied to the
                    four selected health indicators.

                </p>


                <div className="formula-card">

                    <div className="formula">

                        Health Burden =

                        <span className="formula-inline">

                            (Diabetes + Obesity +
                            COPD + Physical Inactivity) ÷ 4

                        </span>

                    </div>

                </div>


                <div className="weight-grid">

                    <div>
                        Diabetes
                        <strong>25%</strong>
                    </div>

                    <div>
                        Obesity
                        <strong>25%</strong>
                    </div>

                    <div>
                        COPD
                        <strong>25%</strong>
                    </div>

                    <div>
                        Physical Inactivity
                        <strong>25%</strong>
                    </div>

                </div>

            </section>





            {/* =========================
                Access Score
            ========================== */}

            <section className="methodology-section">

                <div className="section-label">
                    06
                </div>


                <h2>
                    Step 4: Calculate Healthcare Access
                </h2>


                <p>

                    Healthcare Access is based on the
                    normalized primary-care HPSA score.

                </p>


                <div className="formula-card">

                    <div className="formula">

                        Healthcare Access =

                        <span className="formula-inline">

                            Normalized Primary-Care HPSA Score

                        </span>

                    </div>

                </div>


                <div className="note-card">

                    <strong>
                        Missing values:
                    </strong>

                    <span>

                        Missing primary-care HPSA scores
                        are treated as 0 before
                        normalization in the current
                        implementation.

                    </span>

                </div>

            </section>





            {/* =========================
                Final Formula
            ========================== */}

            <section className="methodology-section final-formula-section">

                <div className="section-label">
                    07
                </div>


                <h2>
                    Step 5: Calculate the CareGap Score
                </h2>


                <p>

                    The three component scores are combined
                    using the project's final weights.

                </p>


                <div className="final-formula">

                    <div>
                        CareGap Score
                    </div>


                    <strong>

                        0.40 × Social Vulnerability

                        <br />

                        +

                        <br />

                        0.40 × Health Burden

                        <br />

                        +

                        <br />

                        0.20 × Healthcare Access

                    </strong>

                </div>


                <div className="formula-result">

                    <span>
                        Final score range
                    </span>


                    <strong>
                        0.000 – 1.000
                    </strong>

                </div>

            </section>





            {/* =========================
                Example Calculation
            ========================== */}

            <section className="methodology-section">

                <div className="section-label">
                    08
                </div>


                <h2>
                    How does a score such as 0.332 happen?
                </h2>


                <p>

                    Each county receives three component
                    scores. Those component scores are
                    multiplied by their respective weights
                    and added together.

                </p>


                <div className="example-score">


                    <div className="score-row">

                        <span>
                            Social Vulnerability
                        </span>

                        <strong>
                            0.300 × 0.40 = 0.120
                        </strong>

                    </div>


                    <div className="score-row">

                        <span>
                            Health Burden
                        </span>

                        <strong>
                            0.350 × 0.40 = 0.140
                        </strong>

                    </div>


                    <div className="score-row">

                        <span>
                            Healthcare Access
                        </span>

                        <strong>
                            0.350 × 0.20 = 0.070
                        </strong>

                    </div>


                    <div className="score-total">

                        <span>
                            CareGap Score
                        </span>

                        <strong>
                            0.330
                        </strong>

                    </div>


                </div>


                <div className="note-card">

                    <strong>
                        Note:
                    </strong>

                    <span>

                        The values above are an illustrative
                        calculation showing the arithmetic.
                        They are not presented as the actual
                        component values of a specific county.

                    </span>

                </div>

            </section>





            {/* =========================
                Risk Categories
            ========================== */}

            <section className="methodology-section">

                <div className="section-label">
                    09
                </div>


                <h2>
                    How should the score be interpreted?
                </h2>


                <div className="risk-grid">


                    <div className="risk-card low">

                        <div className="risk-dot"></div>

                        <div>

                            <h3>
                                Low
                            </h3>

                            <strong>
                                &lt; 0.30
                            </strong>

                            <p>
                                Lower estimated healthcare gap
                                relative to the scoring scale.
                            </p>

                        </div>

                    </div>



                    <div className="risk-card medium">

                        <div className="risk-dot"></div>

                        <div>

                            <h3>
                                Medium
                            </h3>

                            <strong>
                                0.30 – &lt; 0.40
                            </strong>

                            <p>
                                Moderate estimated healthcare
                                gap under the project classification.
                            </p>

                        </div>

                    </div>



                    <div className="risk-card high">

                        <div className="risk-dot"></div>

                        <div>

                            <h3>
                                High
                            </h3>

                            <strong>
                                ≥ 0.40
                            </strong>

                            <p>
                                Higher estimated healthcare
                                gap under the project classification.
                            </p>

                        </div>

                    </div>


                </div>

            </section>





            {/* =========================
                How to use
            ========================== */}

            <section className="methodology-section">

                <div className="section-label">
                    10
                </div>


                <h2>
                    How to use CareGap Intelligence
                </h2>


                <div className="steps-grid">


                    <div className="step-card">

                        <span>
                            01
                        </span>

                        <h3>
                            Start with the USA
                        </h3>

                        <p>
                            Explore the national map and
                            compare average CareGap scores
                            across states.
                        </p>

                    </div>



                    <div className="step-card">

                        <span>
                            02
                        </span>

                        <h3>
                            Explore a State
                        </h3>

                        <p>
                            Open a state to examine its
                            counties and their relative
                            CareGap scores.
                        </p>

                    </div>



                    <div className="step-card">

                        <span>
                            03
                        </span>

                        <h3>
                            Examine Counties
                        </h3>

                        <p>
                            Compare counties and inspect
                            the indicators contributing
                            to their scores.
                        </p>

                    </div>



                    <div className="step-card">

                        <span>
                            04
                        </span>

                        <h3>
                            Interpret the Score
                        </h3>

                        <p>
                            Use the methodology and risk
                            bands to understand what the
                            index represents.
                        </p>

                    </div>


                </div>

            </section>





            {/* =========================
                Limitations
            ========================== */}

            <section className="methodology-section limitations">

                <div className="section-label">
                    11
                </div>


                <h2>
                    Important considerations
                </h2>


                <div className="limitation-list">


                    <div>

                        <strong>
                            Analytical index
                        </strong>

                        <p>
                            CareGap is a project-defined
                            composite index, not an official
                            federal healthcare risk score.
                        </p>

                    </div>



                    <div>

                        <strong>
                            Relative scale
                        </strong>

                        <p>
                            Min-max normalization depends
                            on the observed values in the
                            analyzed dataset.
                        </p>

                    </div>



                    <div>

                        <strong>
                            Not a percentage
                        </strong>

                        <p>
                            A score of 0.332 does not mean
                            that 33.2% of residents have a
                            healthcare gap.
                        </p>

                    </div>



                    <div>

                        <strong>
                            Not clinical
                        </strong>

                        <p>
                            The index is not intended to
                            diagnose individuals or replace
                            clinical or public-health
                            decision-making.
                        </p>

                    </div>


                </div>

            </section>





            {/* =========================
                Back
            ========================== */}

            <section className="methodology-footer">

                <Link
                    to="/"
                    className="primary-button"
                >
                    Explore the Dashboard →
                </Link>

            </section>


        </div>

    );

}


export default UnderstandingCareGap;