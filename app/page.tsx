"use client";

import { useMemo, useState } from "react";
import { RegularProfileForm } from "@/components/RegularProfileForm";
import { getRegularAdmissions } from "@/lib/regular/repository";
import { DEFAULT_REGULAR_PROFILE } from "@/lib/regular/types";
import type { RegularStudentProfile } from "@/lib/regular/types";
import { isRegularProfileComplete, recommendRegular } from "@/lib/regular/recommend";

export default function Page() {
  const [profile, setProfile] = useState<RegularStudentProfile>(DEFAULT_REGULAR_PROFILE);
  const [started, setStarted] = useState(false);
  const admissions = getRegularAdmissions();
  const complete = isRegularProfileComplete(profile);
  const recommendations = useMemo(() => started ? recommendRegular(profile, admissions) : [], [started, profile, admissions]);

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
          <p>수능 성적을 입력하면 대학별 반영비율을 적용해 모집군별 지원 후보를 골라봅니다.</p>
          <div className="notice">현재는 2027 정시 확인 데이터를 기반으로 한 1차 모의지원 버전입니다. 대학별 최종 모집요강과 세부 환산식은 계속 추가합니다.</div>
        </div>
        <div className="panel scoreHero"><div className="muted">현재 분석 상태</div><div className="bigScore">{started ? recommendations.length : "—"}</div><div>{started ? "추천 모집군" : "점수 입력 후 분석"}</div></div>
      </section>

      <section className="section" id="profile">
        <div className="sectionHead"><div><h2>나의 수능 성적</h2><div className="muted">표준점수·백분위·등급을 입력하면 됩니다.</div></div></div>
        <RegularProfileForm profile={profile} onChange={update} />
        <div style={{marginTop:14,display:"flex",justifyContent:"flex-end"}}><button className="primary" onClick={() => setStarted(true)} disabled={!complete} style={{opacity:complete?1:.45,cursor:complete?"pointer":"not-allowed"}}>정시 지원전략 분석하기 →</button></div>
        {!complete && <div className="alert" style={{marginTop:12}}>💡 모든 성적 항목과 선택과목을 입력하면 분석할 수 있습니다.</div>}
      </section>

      {started && <section className="section" id="results">
        <div className="sectionHead"><div><h2>🎯 나의 정시 지원 후보</h2><div className="muted">현재 입력값 기준 가·나·다군 1개씩 우선 추천</div></div></div>
        <div className="six">
          {recommendations.map((rec) => <article className="panel" key={rec.admissionId}>
            <div className="eyebrow">{rec.group}군 · {rec.tier}</div>
            <h3 style={{margin:"8px 0 4px"}}>{rec.universityName}</h3>
            <div className="muted">{rec.department}</div>
            <div style={{fontSize:32,fontWeight:800,marginTop:16}}>{rec.score}<small style={{fontSize:14,fontWeight:500}}> 모의지수</small></div>
            <div className="balanceText" style={{marginTop:10}}>{rec.reason}</div>
            <a className="secondary" href={admissions.find((a) => a.id === rec.admissionId)?.sourceUrl} target="_blank" rel="noreferrer" style={{display:"inline-block",marginTop:14}}>모집요강 확인 ↗</a>
          </article>)}
        </div>
        <div className="alert" style={{marginTop:16}}>⚠️ 이 점수는 실제 합격선이 아니라 대학 반영방식을 반영한 모의지원 지수입니다. 수능 이후 실제 성적 분포와 전년도 입시결과를 결합해 정밀화하는 단계가 다음 작업입니다.</div>
      </section>}

      <section className="section"><div className="panel balance"><div className="muted">정시 앱의 다음 핵심 작업</div><h3>대학별 환산점수 + 전년도 입시결과 + 모집군까지 붙입니다.</h3><div className="balanceText">정시는 수시처럼 단순한 전형 적합도보다 대학별 수능 환산식, 가·나·다군 조합, 전년도 70%컷·충원, 모집인원 변화가 훨씬 중요합니다. 이 구조로 순서대로 붙이겠습니다.</div></div></section>
      <div className="footer">정시합격 v1 · 2027 정시 대비 · 실제 합격을 보장하지 않습니다.</div>
    </main>
  </div>;
}
