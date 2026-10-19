"use client";

import { useMemo, useState } from "react";
import { RegularProfileForm } from "@/components/RegularProfileForm";
import { getRegularAdmissions } from "@/lib/regular/repository";
import { DEFAULT_REGULAR_PROFILE } from "@/lib/regular/types";
import type { RegularStudentProfile } from "@/lib/regular/types";
import { isRegularProfileComplete } from "@/lib/regular/recommend";
import { recommendRegularPortfolio } from "@/lib/regular/portfolio";

export default function Page() {
  const [profile, setProfile] = useState<RegularStudentProfile>(DEFAULT_REGULAR_PROFILE);
  const [started, setStarted] = useState(false);
  const admissions = getRegularAdmissions();
  const complete = isRegularProfileComplete(profile);
  const portfolios = useMemo(() => started ? recommendRegularPortfolio(profile, admissions) : [], [started, profile, admissions]);
  const portfolio = portfolios[0];

  const update = (patch: Partial<RegularStudentProfile>) => {
    setStarted(false);
    setProfile((prev) => ({ ...prev, ...patch }));
  };

  return <div className="app">
    <header className="topbar">
      <div><div className="eyebrow">2027 ADMISSION</div><strong>정시합격</strong></div>
      <a className="secondary" href="/susi">기존 수시 보기</a>
    </header>

    <main>
      <section className="hero">
        <div className="heroCopy">
          <div className="eyebrow">2027학년도 정시 대비</div>
          <h1>수능 성적으로<br /><span>가·나·다군</span>을 설계합니다.</h1>
          <p>수능 성적을 입력하면 대학별 반영비율과 기준점을 적용해 모집군별 지원 후보를 골라봅니다.</p>
          <div className="notice">현재는 2027 정시 확인 데이터를 기반으로 한 1차 모의지원 버전입니다. 데이터가 없는 모집군을 억지로 채우지 않고, 확인된 기준점이 있는 후보를 우선합니다.</div>
        </div>
        <div className="panel scoreHero"><div className="muted">현재 분석 상태</div><div className="bigScore">{started ? (portfolio?.recommendations.length ?? 0) : "—"}</div><div>{started ? "추천 모집군" : "점수 입력 후 분석"}</div></div>
      </section>

      <section className="section" id="profile">
        <div className="sectionHead"><div><h2>나의 수능 성적</h2><div className="muted">표준점수·백분위·등급을 입력하면 됩니다.</div></div></div>
        <RegularProfileForm profile={profile} onChange={update} />
        <div style={{marginTop:14,display:"flex",justifyContent:"flex-end"}}><button className="primary" onClick={() => setStarted(true)} disabled={!complete} style={{opacity:complete?1:.45,cursor:complete?"pointer":"not-allowed"}}>정시 지원전략 분석하기 →</button></div>
        {!complete && <div className="alert" style={{marginTop:12}}>💡 모든 성적 항목과 선택과목을 입력하면 분석할 수 있습니다.</div>}
      </section>

      {started && portfolio && <section className="section" id="results">
        <div className="sectionHead"><div><h2>🎯 나의 정시 3장</h2><div className="muted">가·나·다군을 하나의 지원 포트폴리오로 봅니다.</div></div></div>
        <div className="panel balance" style={{marginBottom:16}}>
          <div className="eyebrow">{portfolio.style} · 포트폴리오 지수 {portfolio.score}</div>
          <h3 style={{margin:"8px 0 4px"}}>현재 확인된 데이터 기준 지원 조합</h3>
          <div className="balanceText">{portfolio.summary}</div>
        </div>
        <div className="six">
          {portfolio.recommendations.map((rec) => <article className="panel" key={rec.admissionId}>
            <div className="eyebrow">{rec.group}군 · {rec.tier}</div>
            <h3 style={{margin:"8px 0 4px"}}>{rec.universityName}</h3>
            <div className="muted">{rec.department}</div>
            <div style={{fontSize:32,fontWeight:800,marginTop:16}}>{rec.score}<small style={{fontSize:14,fontWeight:500}}> 환산점수</small></div>
            <div className="balanceText" style={{marginTop:10}}>{rec.reason}</div>
            <a className="secondary" href={admissions.find((a) => a.id === rec.admissionId)?.sourceUrl} target="_blank" rel="noreferrer" style={{display:"inline-block",marginTop:14}}>모집요강 확인 ↗</a>
          </article>)}
        </div>
        <div className="alert" style={{marginTop:16}}>⚠️ 환산점수는 실제 합격선이 아니라 대학 반영방식을 적용한 모의지수입니다. 다음 단계에서는 후보군을 더 넓혀 전년도 70%컷·충원·모집인원 변화를 함께 비교합니다.</div>
      </section>}

      {started && !portfolio && <section className="section"><div className="alert">현재 입력값과 일치하는 검증 후보가 없습니다. 다른 성적 입력값이나 희망전공을 확인해주세요.</div></section>}

      <section className="section"><div className="panel balance"><div className="muted">정시 앱의 다음 핵심 작업</div><h3>후보군 확장 → 조합 최적화 → 실제 데이터 검증</h3><div className="balanceText">현재는 가·나·다군별 1순위 후보를 안정적으로 연결한 단계입니다. 다음에는 각 모집군의 후보를 여러 개 확보하고 전년도 70%컷·충원·모집인원 변화까지 결합해 실제 3장 조합을 비교하도록 발전시키겠습니다.</div></div></section>
      <div className="footer">정시합격 v1 · 2027 정시 대비 · 실제 합격을 보장하지 않습니다.</div>
    </main>
  </div>;
}
