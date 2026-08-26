import { useState } from "react";
import type { StudentProfile } from "@/lib/types";

type Props = { profile: StudentProfile; onChange: (patch: Partial<StudentProfile>) => void };
type MajorGroup = { label: string; options: string[] };

const MAJOR_GROUPS: MajorGroup[] = [
  { label: "인문·어문", options: ["국어국문", "영어영문", "중어중문", "일어일문", "불어·독어", "사학", "철학", "문헌정보", "인문·문화", "기타 인문·어문"] },
  { label: "사회·정책", options: ["사회학", "정치외교", "행정", "사회복지", "심리", "미디어·언론", "국제관계", "공공정책", "경찰·공공인재", "기타 사회·정책"] },
  { label: "경영·경제", options: ["경영", "경제", "회계·세무", "금융", "마케팅", "무역·통상", "관광·호텔경영", "경영정보", "기타 경영·경제"] },
  { label: "법·행정", options: ["법학", "법무", "행정", "정책", "경찰행정", "기타 법·행정"] },
  { label: "교육", options: ["교육학", "유아교육", "초등교육", "특수교육", "국어교육", "영어교육", "수학교육", "컴퓨터교육", "미술교육", "음악교육", "체육교육", "사회교육", "윤리교육", "한문교육", "기타 교육"] },
  { label: "자연과학", options: ["수학", "통계", "물리", "화학", "생명과학", "지구과학", "천문", "기타 자연과학"] },
  { label: "컴퓨터·소프트웨어", options: ["컴퓨터공학", "소프트웨어", "인공지능", "데이터사이언스", "정보보호", "정보통신", "빅데이터", "기타 컴퓨터·소프트웨어"] },
  { label: "전기·전자", options: ["전기공학", "전자공학", "반도체", "전기전자", "통신", "제어·계측", "기타 전기·전자"] },
  { label: "기계·로봇", options: ["기계공학", "자동차", "로봇", "메카트로닉스", "스마트모빌리티", "항공우주", "기타 기계·로봇"] },
  { label: "화학·신소재", options: ["화학공학", "화학", "신소재", "재료공학", "고분자", "에너지공학", "기타 화학·신소재"] },
  { label: "생명·바이오", options: ["생명과학", "생명공학", "바이오", "식품공학", "유전공학", "환경생명", "기타 생명·바이오"] },
  { label: "건축·도시·환경", options: ["건축학", "건축공학", "토목", "도시공학", "환경공학", "조경", "건설·인프라", "기타 건축·도시·환경"] },
  { label: "의료·보건", options: ["간호", "의예", "치의예", "약학", "한의예", "보건", "물리치료", "작업치료", "임상병리", "치위생", "방사선", "응급구조", "기타 의료·보건"] },
  { label: "예체능", options: ["미술", "디자인", "음악", "체육", "연극·영화", "무용", "애니메이션", "콘텐츠", "사진", "기타 예체능"] },
];

function groupForMajor(major: string): string {
  return MAJOR_GROUPS.find((group) => group.options.includes(major))?.label ?? "";
}

export function StudentProfileTemplateForm({ profile, onChange }: Props) {
  const [majorGroup, setMajorGroup] = useState(() => groupForMajor(profile.desiredMajor));
  const selectedOptions = MAJOR_GROUPS.find((group) => group.label === majorGroup)?.options ?? [];

  const handleGroupChange = (value: string) => {
    setMajorGroup(value);
    onChange({ desiredMajor: "" });
  };

  return <div className="panel form">
    <div className="field"><label htmlFor="grade">내신 평균등급</label><input id="grade" type="number" min="1" max="9" step=".01" placeholder="예: 2.73" value={profile.gradeAverage ?? ""} onChange={(e) => onChange({ gradeAverage: e.target.value === "" ? null : Number(e.target.value) })} /></div>
    <div className="field"><label htmlFor="majorGroup">희망 전공 계열</label><select id="majorGroup" value={majorGroup} onChange={(e) => handleGroupChange(e.target.value)}><option value="">계열을 선택하세요</option>{MAJOR_GROUPS.map((group) => <option key={group.label} value={group.label}>{group.label}</option>)}</select></div>
    <div className="field"><label htmlFor="major">세부 전공</label><select id="major" value={profile.desiredMajor} disabled={!majorGroup} onChange={(e) => onChange({ desiredMajor: e.target.value })}><option value="">세부 전공을 선택하세요</option>{selectedOptions.map((major) => <option key={major} value={major}>{major}</option>)}</select></div>
    <div className="field"><label htmlFor="mock">모의고사 평균등급</label><input id="mock" type="number" min="1" max="9" step=".1" placeholder="예: 2.7" value={profile.mockAverage ?? ""} onChange={(e) => onChange({ mockAverage: e.target.value === "" ? null : Number(e.target.value) })} /></div>
    <div className="field"><label htmlFor="record">학생부 전공연계</label><select id="record" value={profile.studentRecordLink ?? ""} onChange={(e) => onChange({ studentRecordLink: e.target.value ? Number(e.target.value) : null })}><option value="">선택하세요</option><option value={5}>매우 높음</option><option value={4}>높음</option><option value={3}>보통</option><option value={2}>낮음</option></select></div>
    <div className="field"><label htmlFor="cut">수능최저 충족 가능성</label><select id="cut" value={profile.csatMinimumChance ?? ""} onChange={(e) => onChange({ csatMinimumChance: e.target.value ? Number(e.target.value) : null })}><option value="">선택하세요</option><option value={5}>높음</option><option value={4}>꽤 높음</option><option value={3}>보통</option><option value={2}>낮음</option></select></div>
  </div>;
}
