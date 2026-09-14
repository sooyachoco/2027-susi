import type { RegularStudentProfile } from "@/lib/regular/types";

type Props = { profile: RegularStudentProfile; onChange: (patch: Partial<RegularStudentProfile>) => void };

const numberField = (id: string, label: string, value: number | null, onChange: (value: number | null) => void, min: number, max: number, placeholder: string) => (
  <div className="field"><label htmlFor={id}>{label}</label><input id={id} type="number" min={min} max={max} step="1" placeholder={placeholder} value={value ?? ""} onChange={(e) => onChange(e.target.value === "" ? null : Number(e.target.value))} /></div>
);

export function RegularProfileForm({ profile, onChange }: Props) {
  return <div className="panel form">
    <div className="field"><label htmlFor="regular-major">희망 전공</label><input id="regular-major" placeholder="예: 컴퓨터공학, 경영학, 국어교육" value={profile.desiredMajor} onChange={(e) => onChange({ desiredMajor: e.target.value })} /></div>
    {numberField("kor-standard", "국어 표준점수", profile.koreanStandard, (v) => onChange({ koreanStandard: v }), 0, 200, "예: 135")}
    {numberField("kor-percentile", "국어 백분위", profile.koreanPercentile, (v) => onChange({ koreanPercentile: v }), 0, 100, "예: 96")}
    {numberField("math-standard", "수학 표준점수", profile.mathStandard, (v) => onChange({ mathStandard: v }), 0, 200, "예: 140")}
    {numberField("math-percentile", "수학 백분위", profile.mathPercentile, (v) => onChange({ mathPercentile: v }), 0, 100, "예: 98")}
    {numberField("inq1", "탐구 1 백분위", profile.inquiry1Percentile, (v) => onChange({ inquiry1Percentile: v }), 0, 100, "예: 95")}
    {numberField("inq2", "탐구 2 백분위", profile.inquiry2Percentile, (v) => onChange({ inquiry2Percentile: v }), 0, 100, "예: 93")}
    <div className="field"><label htmlFor="english-grade">영어 등급</label><select id="english-grade" value={profile.englishGrade ?? ""} onChange={(e) => onChange({ englishGrade: e.target.value ? Number(e.target.value) : null })}><option value="">선택하세요</option>{Array.from({ length: 9 }, (_, i) => <option key={i + 1} value={i + 1}>{i + 1}등급</option>)}</select></div>
    <div className="field"><label htmlFor="history-grade">한국사 등급</label><select id="history-grade" value={profile.koreanHistoryGrade ?? ""} onChange={(e) => onChange({ koreanHistoryGrade: e.target.value ? Number(e.target.value) : null })}><option value="">선택하세요</option>{Array.from({ length: 9 }, (_, i) => <option key={i + 1} value={i + 1}>{i + 1}등급</option>)}</select></div>
    <div className="field"><label htmlFor="math-choice">수학 선택과목</label><select id="math-choice" value={profile.mathChoice} onChange={(e) => onChange({ mathChoice: e.target.value as RegularStudentProfile["mathChoice"] })}><option value="미선택">선택하세요</option><option value="확통">확률과 통계</option><option value="미적분">미적분</option><option value="기하">기하</option></select></div>
    <div className="field"><label htmlFor="inquiry-type">탐구 선택</label><select id="inquiry-type" value={profile.inquiryType} onChange={(e) => onChange({ inquiryType: e.target.value as RegularStudentProfile["inquiryType"] })}><option value="미선택">선택하세요</option><option value="사탐">사회탐구</option><option value="과탐">과학탐구</option><option value="혼합">사탐 + 과탐</option></select></div>
  </div>;
}
