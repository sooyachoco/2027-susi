"use client";

import { useCallback, useEffect, useState } from "react";

type AuditItem = { id: string; university: string; region: string; department: string; group: string };
type AuditData = {
  generatedAt: string;
  scope: string;
  totals: { admissions: number; universities: number; byRegion: Record<string, number>; byGroup: Record<string, number> };
  universityCoverage: Array<{ universityId: string; universityName: string; region: string; admissions: number; departments: number; withRecruitmentCount: number; calculationVerified: number; benchmarkComparable: number }>;
  quality: { calculationVerified: number; calculationUnverified: number; benchmarkComparable: number; withRecruitmentCount: number; withSource: number; requiresPracticalEvaluation: number; requiresSchoolViolenceInput: number };
  issueCounts: Record<string, number>;
  issues: Record<string, AuditItem[] | { id: string; count: number }[]>;
};

const LABELS: Record<string, string> = {
  missingSource: "공식 출처 누락",
  missingRecruitmentCount: "모집인원 누락",
  zeroRecruitmentCount: "모집인원 0명 · 조건부/미모집",
  invalidRecruitmentCount: "모집인원 값 오류",
  invalidWeights: "영역별 반영비율 오류",
  invalidWeightTotals: "반영비율 합계 100% 불일치",
  invalidMultipliers: "환산 배율 오류",
  invalidConversionTables: "환산표 값 오류",
  invalidSourceMetadata: "출처 URL·검증일 오류",
  invalidBenchmarkMetadata: "전년도 기준점 출처·만점 오류",
  missingEnglishGradeTable: "영어 등급 환산표 미확보",
  pendingEnglishGradeTable: "영어 등급 환산표 발표 대기",
  missingKoreanHistoryTable: "한국사 환산표 미확보",
  missingInquiryConversionTable: "탐구 변환표 미확보",
  pendingInquiryConversionTable: "탐구 변환표 발표 대기",
  missingSubjectMaximumScores: "영역별 최고점 누락",
  missingComparableBenchmark: "비교 가능한 전년도 기준점 누락",
  missingMethodNotes: "전형 설명 누락",
  duplicateIds: "중복 데이터 ID",
  integrityErrors: "데이터 무결성 오류",
};

export default function RegularAuditPage() {
  const [data, setData] = useState<AuditData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/regular-audit", { cache: "no-store" });
      if (!response.ok) throw new Error("감사 데이터를 불러오지 못했습니다.");
      setData(await response.json());
    } catch (e) {
      setError(e instanceof Error ? e.message : "알 수 없는 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  return <div className="app">
    <header className="topbar">
      <div><div className="eyebrow">2027 ADMISSION · DATA QUALITY</div><strong>정시 데이터 검증</strong></div>
      <a className="secondary" href="/">정시 분석으로 돌아가기</a>
    </header>
    <main>
      <section className="heroCopy" style={{ marginBottom: 20 }}>
        <div className="eyebrow">DATA AUDIT</div>
        <h1 style={{ fontSize: 38 }}>정시 데이터의<br /><span>검증 상태</span>를 확인합니다.</h1>
        <p>서울·경기·인천 정시 모집단위의 환산식, 모집인원, 기준점, 출처 누락을 점검합니다. 누락은 곧 오류를 뜻하지 않으며, 확인이 더 필요한 항목입니다.</p>
      </section>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 14 }}>
        <div className="muted">{data ? `마지막 갱신: ${new Date(data.generatedAt).toLocaleString("ko-KR")}` : "감사 데이터 확인 중"}</div>
        <button className="primary" onClick={() => void load()} disabled={loading}>{loading ? "확인 중…" : "새로고침"}</button>
      </div>
      {error && <div className="alert">{error}</div>}
      {loading && !data && <div className="panel balance">데이터를 불러오고 있습니다.</div>}
      {data && <>
        <div className="grid">
          <article className="panel stat"><div className="muted">전체 모집단위</div><strong>{data.totals.admissions}</strong></article>
          <article className="panel stat"><div className="muted">대학 수</div><strong>{data.totals.universities}</strong></article>
          <article className="panel stat"><div className="muted">환산식 검증 완료</div><strong>{data.quality.calculationVerified}<small style={{fontSize:13,color:"var(--muted)"}}> / {data.totals.admissions}</small></strong></article>
        </div>
        <section className="section">
          <div className="sectionHead"><div><h2>지역·모집군 분포</h2><div className="muted">대상: {data.scope}</div></div></div>
          <div className="grid">
            {Object.entries(data.totals.byRegion).map(([name, count]) => <article className="panel stat" key={name}><div className="muted">{name}</div><strong>{count}</strong></article>)}
            {Object.entries(data.totals.byGroup).map(([name, count]) => <article className="panel stat" key={name}><div className="muted">{name}군</div><strong>{count}</strong></article>)}
          </div>
        </section>
        <section className="section">
          <div className="sectionHead"><div><h2>대학별 데이터 확보 현황</h2><div className="muted">대학별 모집단위 수, 모집인원 확보, 환산식 검증, 비교 가능한 전년도 기준점</div></div></div>
          <div style={{ display: "grid", gap: 10 }}>
            {data.universityCoverage.map((school) => <article className="panel" key={school.universityId} style={{ padding: "14px 18px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}><strong>{school.universityName}</strong><span className="muted">{school.region} · {school.admissions}개 모집단위 / {school.departments}개 학과명</span></div>
              <div className="muted" style={{ marginTop: 7 }}>모집인원 {school.withRecruitmentCount}/{school.admissions} · 환산식 검증 {school.calculationVerified}/{school.admissions} · 비교 기준점 {school.benchmarkComparable}/{school.admissions}</div>
            </article>)}
          </div>
        </section>
        <section className="section">
          <div className="sectionHead"><div><h2>데이터 품질 요약</h2><div className="muted">검증 완료 여부와 데이터 확보 현황</div></div></div>
          <div className="grid">
            <article className="panel stat"><div className="muted">환산식 미검증</div><strong>{data.quality.calculationUnverified}</strong></article>
            <article className="panel stat"><div className="muted">비교 가능한 기준점</div><strong>{data.quality.benchmarkComparable}</strong></article>
            <article className="panel stat"><div className="muted">모집인원 확보</div><strong>{data.quality.withRecruitmentCount}</strong></article>
            <article className="panel stat"><div className="muted">공식 출처 확보</div><strong>{data.quality.withSource}</strong></article>
            <article className="panel stat"><div className="muted">실기점수 입력 필요 모집단위</div><strong>{data.quality.requiresPracticalEvaluation}</strong></article>
            <article className="panel stat"><div className="muted">학교폭력 조치 확인 필요</div><strong>{data.quality.requiresSchoolViolenceInput}</strong></article>
          </div>
        </section>
        <section className="section">
          <div className="sectionHead"><div><h2>공식 발표 대기</h2><div className="muted">대학이 수능 성적 발표 이후 별도로 공개하는 변환표입니다. 현재 누락 오류로 집계하지 않습니다.</div></div></div>
          <div style={{ display: "grid", gap: 10 }}>
            {["pendingEnglishGradeTable", "pendingInquiryConversionTable"].map((key) => {
              const count = data.issueCounts[key] ?? 0;
              const label = LABELS[key];
              const items = data.issues[key] ?? [];
              return <details className="panel" key={key} style={{ padding: "16px 20px" }}>
                <summary style={{ cursor: "pointer", display: "flex", justifyContent: "space-between", gap: 12, fontWeight: 800 }}>
                  <span>{label}</span><span>{count}건</span>
                </summary>
                {count === 0 ? <p className="muted">대기 항목 없음</p> : <div style={{ marginTop: 12, display: "grid", gap: 8 }}>
                  {items.map((item, index) => {
                    const entry = item as AuditItem;
                    return <div key={entry.id ?? index} className="balanceText" style={{ borderTop: "1px solid var(--line)", paddingTop: 8 }}>
                      <strong>{entry.university}</strong> · {entry.region} · {entry.group}군<br />{entry.department}
                    </div>;
                  })}
                </div>}
              </details>;
            })}
          </div>
        </section>
        <section className="section">
          <div className="sectionHead"><div><h2>실제 보강이 필요한 항목</h2><div className="muted">공식 발표 대기 항목은 제외했습니다. 항목을 펼치면 해당 모집단위를 확인할 수 있습니다.</div></div></div>
          <div style={{ display: "grid", gap: 10 }}>
            {Object.entries(LABELS).filter(([key]) => !key.startsWith("pending")).map(([key, label]) => {
              const count = data.issueCounts[key] ?? 0;
              const items = data.issues[key] ?? [];
              return <details className="panel" key={key} style={{ padding: "16px 20px" }}>
                <summary style={{ cursor: "pointer", display: "flex", justifyContent: "space-between", gap: 12, fontWeight: 800 }}>
                  <span>{label}</span><span>{count}건</span>
                </summary>
                {count === 0 ? <p className="muted">누락 없음</p> : <div style={{ marginTop: 12, display: "grid", gap: 8 }}>
                  {items.map((item, index) => {
                    const entry = item as AuditItem | { id: string; count: number };
                    return <div key={entry.id ?? index} className="balanceText" style={{ borderTop: "1px solid var(--line)", paddingTop: 8 }}>
                      {"university" in entry ? <><strong>{entry.university}</strong> · {entry.region} · {entry.group}군<br />{entry.department}</> : <>{entry.id} · {entry.count}회</>}
                    </div>;
                  })}
                </div>}
              </details>;
            })}
          </div>
        </section>
        <div className="alert">주의: 데이터 누락 건수는 곧바로 잘못된 계산을 의미하지 않습니다. 공식 모집요강의 세부 산식·변환표·당해 연도 최고점과 대조한 뒤 검증 완료 처리해야 합니다.</div>
      </>}
      <div className="footer">정시합격 · 데이터 검증 도구</div>
    </main>
  </div>;
}
