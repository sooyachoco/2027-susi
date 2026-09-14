import type { RegularStudentProfile } from "@/lib/regular/types";

type Props = { profile: RegularStudentProfile; onChange: (patch: Partial<RegularStudentProfile>) => void };
type MajorGroup = { label: string; options: string[] };

const MAJOR_GROUPS: MajorGroup[] = [
  { label: "인문·어문", options: ["국어국문", "영어영문", "중어중문", "일어일문", "불어·독어", "사학", "철학", "문헌정보", "인문·문화", "기타 인문·어문"] },
  { label: "사회·정책", options: ["사회학", "정치외교", "사회복지", "심리", "미디어·언론", "국제관계", "공공정책", "경찰·공공인재", "기타 사회·정책"] },
  { label: "경영·경제", options: ["경영", "경제", "회계·세무", "금융", "마케팅", "무역·통상", "관광·호텔경영", "경영정보", "기타 경영·경제"] },
  { label: "법·행정", options: ["법학", "법무", "행정", "정책", "경찰행정", "기타 법·행정"] },
  { label: "교육", options: ["교육학", "유아교육", "초등교육", "특수교육", "국어교육", "영어교육", "수학교육", "컴퓨터교육", "미술교육", "음악교육", "체육교육", "사회교육", "윤리교육", "한문교육", "기타 교육"] },
  { label: "자연과학", options: ["수학", "통계", "물리", "화학", "생명과학", "지구과학", "천문", "기타 자연과학"] },
  { label: "컴퓨터·소프트웨어", options: ["컴퓨터공학", "소프트웨어", "인공지능", "데이터사이언스", "정보보호", "정보통신", "빅데이터", "기타 컴퓨터·소프트웨어"] },
  { label: "전기·전자", options: ["전기공학", "전자공학", "반도체", "전기전자", "통신", "제어·계측", "기타 전기·전자"] },
  { label: "기계·로봇", options: ["기계공학", "자동차", "로봇", "메카트로닉스", "스마트모빌리티", "항공우주", "기타 기계·로봇"] },
  { label: "화학·신소재", options: ["화학공학", "신소재", "재료공학", "고분자", "에너지공학", "기타 화학·신소재"] },
  { label: "생명·바이오", options: ["생명공학", "바이오", "식품공학", "유전공학", "환경생명", "기타 생명·바이오"] },
  { label: "건축·도시·환경", options: ["건축학", "건축공학", "토목", "도시공학", "환경공학", "조경", "건설·인프라", "기타 건축·도시·환경"] },
  { label: "의료·보건", options: ["간호", "의예", "치의예", "약학", "한의예", "보건", "물리치료", "작업치료", "임상병리", "치위생", "방사선", "응급구조", "기타 의료·보건"] },
  { label: "예체능", options: ["미술", "디자인", "음악", "체육", "연극·영화", "무용", "애니메이션", "콘텐츠", "사진", "기타 예체능"] },
];

const numberField = (id: string, label: string, value: number | null, onChange: (value: number | null) => void, min: number, max: number, placeholder: string) => (
  <div className="field"><label htmlFor={id}>{label}</label><input id={id} type="number" min={min} max={max} step="1" placeholder={placeholder} value={value ?? ""} onChange={(e) => onChange(e.target.value === "" ? null : Number(e.target.value))} /></div>
);

export function RegularProfileForm({ profile, onChange }: Props) {
  return <div className="panel form">
    <div className="field"><label htmlFor="regular-major">희망 전공</label><select id="regular-major" value={profile.desiredMajor} onChange={(e) => onChange({ desiredMajor: e.target.value })}>
      <option value="">희망 전공을 선택하세요</option>
      {MAJOR_GROUPS.map((group) => <optgroup key={group.label} label={group.label}>{group.options.map((major) => <option key={major} value={major}>{major}</option>)}</optgroup>)}
    </select></div>
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
