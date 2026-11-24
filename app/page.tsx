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
  const universityCount = new Set(admissions.map((item) => item.universityId)).size;
  const portfolios = useMemo(() => started ? recommendRegularPortfolio(profile, admissions) : [], [started, profile, admissions]);
  const portfolio = portfolios[0];

  const update = (patch: Partial<RegularStudentProfile>) => {
    setStarted(false);
    setProfile((prev) => ({ ...prev, ...patch }));
  };

  return <div className="app regular-home">
    <header className="topbar">
      <div><div className="eyebrow">2027 ADMISSION</div><strong>정시합격</strong></div>
      <div style={{display:"flex",gap:8,alignItems:"center"}}><a className="secondary" href="/regular-audit">데이터 검증</a></div>
    </header>

    <main>
      <section className="hero">
        <div className="heroCopy">
          <div className="heroBadge"><span className="heroBadgeDot" /> 2027 ADMISSION PLANNER</div>
          <h1>나의 가능성을 찾아<br /><span>정시 지원전략</span>을 그리다.</h1>
          <p>수능 성적을 입력하면 서울·경기·인천 대학의 반영 방식과 모집군을 비교해 나에게 맞는 지원 후보를 살펴볼 수 있어요.</p>
          <div className="heroPills"><span>✦ 가·나·다군 한눈에</span><span>⌁ 대학별 환산식 반영</span><span>♡ 수도권 집중 분석</span></div>
          <div className="heroDataLine"><strong>{universityCount}개 대학</strong><i /> <strong>{admissions.length}개 모집단위</strong><span>2027 정시 데이터</span></div>
          <div className="notice">현재는 대학별 공식 환산식 검증 전 단계입니다. 검증되지 않은 전형은 합격등급을 산출하지 않고 참고 후보로만 표시합니다.</div>
        </div>
        <div className="panel scoreHero"><div className="scoreCardTop"><span className="scoreCardIcon">✦</span><span className="scoreCardLabel">MY ADMISSION</span></div><div className="muted">나의 정시 분석 준비</div><div className="bigScore">{started ? (portfolio?.recommendations.length ?? 0) : "—"}</div><div className="scoreCardCaption">{started ? "분석된 모집군" : "성적을 입력하고 시작해요"}</div><div className="scoreCardFoot"><span>가군</span><span>나군</span><span>다군</span></div></div>
      </section>

      <section className="section" id="profile">
        <div className="sectionHead"><div><h2>나의 수능 성적</h2><div className="muted">표준점수·백분위·등급을 입력하면 됩니다.</div></div></div>
        <RegularProfileForm profile={profile} onChange={update} />
        <div style={{marginTop:14,display:"flex",justifyContent:"flex-end"}}><button className="primary" onClick={() => setStarted(true)} disabled={!complete} style={{opacity:complete?1:.45,cursor:complete?"pointer":"not-allowed"}}>정시 지원전략 분석하기 →</button></div>
        {!complete && <div className="alert" style={{marginTop:12}}>💡 모든 성적 항목과 선택과목을 입력하면 분석할 수 있습니다.</div>}
      </section>

      {started && portfolio && <section className="section" id="results">
        <div className="sectionHead"><div><h2>🎯 나의 정시 지원 후보</h2><div className="muted">가·나·다군별 확인 가능한 후보를 표시합니다.</div></div></div>
        <div className="panel balance" style={{marginBottom:16}}>
          <div className="eyebrow">{portfolio.style}{portfolio.style === "기초 후보형" ? " · 최적 조합 점수 산출 보류" : ` · 안정·전공 적합도 지수 ${portfolio.score}`}</div>
          <h3 style={{margin:"8px 0 4px"}}>{portfolio.style === "기초 후보형" ? "모집군별 참고 후보" : "가·나·다군 통합 지원 조합"}</h3>
          <div className="balanceText">{portfolio.summary}</div>
        </div>
        <div className="six resultCards">
          {portfolio.recommendations.map((rec) => <article className="panel candidateCard" key={rec.admissionId}>
            <div className="candidateTop">
              <span className={`groupTag group-${rec.group}`}>{rec.group}군</span>
              <span className={`tierTag tier-${rec.tier === "판정 보류" ? "pending" : rec.tier}`}>{rec.tier}</span>
            </div>
            <h3>{rec.universityName}</h3>
            <div className="candidateDepartment">{rec.department}{rec.recruitmentCount != null ? ` · 모집인원 ${rec.recruitmentCount}명` : ""}</div>
            <div className="candidateScore">
              <strong>{rec.calculationVerified ? rec.score.toLocaleString("ko-KR") : "검증 전"}</strong>
              <span>{rec.calculationVerified ? "대학별 환산 참고점수" : "공식 환산식 확인 필요"}</span>
            </div>
            <div className={`verificationLine ${rec.calculationVerified ? "verified" : "unverified"}`}>
              <span>{rec.calculationVerified ? "✓ 환산식 검증 완료" : "△ 환산식 검증 미완료"}</span>
              <span>{rec.hasComparableBenchmark ? "전년도 기준점 비교 가능" : "비교 가능한 기준점 없음"}</span>
            </div>
            {rec.hasComparableBenchmark && rec.benchmarkGap != null && <div className="benchmarkGap">
              기준점 대비 <strong>{rec.benchmarkGap > 0 ? "+" : ""}{rec.benchmarkGap.toFixed(1)}점</strong>
            </div>}
            <div className="balanceText candidateReason">{rec.reason}</div>
            {rec.missingRules.length > 0 && <div className="alert candidateAlert">추가 확인: {rec.missingRules.join(" · ")}</div>}
            {rec.appliedComponents.length > 0 && <div className="appliedRules">반영 항목: {rec.appliedComponents.join(" · ")}</div>}
            <a className="secondary candidateSource" href={admissions.find((a) => a.id === rec.admissionId)?.sourceUrl} target="_blank" rel="noreferrer">공식 모집요강 확인 ↗</a>
          </article>)}
        </div>
        <div className="alert" style={{marginTop:16}}>⚠️ 환산점수는 실제 합격선이나 합격 확률이 아닙니다. 대학별 세부 환산식·선택과목 가산점·학생부 반영은 최종 모집요강과 대조해야 합니다.</div>
      </section>}

      {started && !portfolio && <section className="section"><div className="alert">현재 입력값과 일치하는 후보가 없습니다. 성적 입력값이나 희망전공을 확인해주세요.</div></section>}

      <section className="section"><div className="panel balance"><div className="muted">정시 분석의 다음 핵심 작업</div><h3>대학별 공식 환산식 검증 → 학과별 입결 보강 → 충원·모집인원 반영</h3><div className="balanceText">현재 공개 데이터는 대표 계열 중심입니다. 실제 원서 조합에 쓰기 전에는 대학·모집단위별 세부 환산식과 전년도 입결을 확인해야 합니다.</div></div></section>
      <div className="footer">정시합격 v1 · 2027 정시 대비 · 실제 합격을 보장하지 않습니다.</div>
    </main>
  </div>;
}
