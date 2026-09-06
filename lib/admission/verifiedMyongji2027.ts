import type { Admission, Department, University } from "@/lib/types";

/**
 * 명지대학교 2027학년도 수시모집 최종 모집요강 기준.
 * 프로젝트 범위는 서울 인문캠퍼스로 한정한다.
 * 공식 모집요강은 2026-05-30 공지 후 2026-06-04, 06-16 수정 공지됨.
 */
const source = {
  type: "university" as const,
  url: "https://iphak.mju.ac.kr/pages/?b=B_1_1&bn=30136&cate=%EC%88%98%EC%8B%9C&f=ALL&m=read&nPage=1&p=9",
  document: "명지대학교 2027학년도 수시 모집요강(수정 v2)",
  academicYear: 2027,
  confidence: 0.99,
};

export const verifiedMyongji2027Universities: University[] = [
  { id: "myongji-2027", name: "명지대학교", region: "서울" },
];

const departmentNames = [
  ["myongji-korean", "국어국문학전공", "인문"],
  ["myongji-english", "영어영문학전공", "인문"],
  ["myongji-history", "미술사·역사학전공", "인문"],
  ["myongji-library", "문헌정보학전공", "인문"],
  ["myongji-chinese", "중어중문학전공", "인문"],
  ["myongji-japanese", "일어일문학전공", "인문"],
  ["myongji-arabic", "아랍지역학전공", "인문"],
  ["myongji-creative-writing", "문예창작학과", "인문"],
  ["myongji-public-admin", "행정학전공", "사회"],
  ["myongji-political", "정치외교학전공", "사회"],
  ["myongji-digital-media", "디지털미디어학과", "사회"],
  ["myongji-child", "청소년지도학전공", "사회"],
  ["myongji-social-welfare", "사회복지학전공", "사회"],
  ["myongji-economics", "경제학전공", "경영·경제"],
  ["myongji-business", "경영학전공", "경영·경제"],
  ["myongji-real-estate", "부동산학전공", "경영·경제"],
  ["myongji-law", "법무행정학전공", "사회"],
  ["myongji-ai-business", "AI경영정보학과", "경영·경제"],
  ["myongji-accounting", "회계세무학전공", "경영·경제"],
  ["myongji-psychology", "심리치료학전공", "사회"],
  ["myongji-free-humanities", "자율전공학부(인문)", "자율전공"],
  ["myongji-free-natural", "자율전공학부(자연)", "자율전공"],
  ["myongji-ai-computer", "컴퓨터AI응용공학부", "컴퓨터·소프트웨어"],
  ["myongji-electric-info", "전기정보공학전공", "공학"],
  ["myongji-electronics", "전자공학전공", "공학"],
  ["myongji-semiconductor", "반도체공학부", "공학"],
  ["myongji-multidesign", "멀티디자인전공", "예체능"],
  ["myongji-art-music", "아트앤멀티미디어음악전공", "예체능"],
  ["myongji-film", "영화전공", "예체능"],
  ["myongji-musical", "뮤지컬공연전공", "예체능"],
] as const;

export const verifiedMyongji2027Departments: Department[] = departmentNames.map(([id, name, category]) => ({
  id,
  universityId: "myongji-2027",
  name,
  category,
}));

const noCsat = {
  enabled: false,
  description: "2027학년도 명지대학교 수시 전 전형 수능최저학력기준 미적용",
};

const aggregateDepartment: Department = {
  id: "myongji-2027-aggregate",
  universityId: "myongji-2027",
  name: "명지대학교 서울 인문캠퍼스 수시 전체",
};

const makeAggregate = (
  id: string,
  name: string,
  type: Admission["type"],
  recruitmentCount: number,
  extra: Partial<Admission> = {},
): Admission => ({
  id,
  universityId: "myongji-2027",
  departmentId: aggregateDepartment.id,
  academicYear: 2027,
  name,
  type,
  recruitmentCount,
  source,
  isMock: false,
  isAggregate: true,
  csatMinimum: noCsat,
  ...extra,
});

/**
 * 인문캠퍼스(서울) 계 행 기준 모집인원.
 * 자연캠퍼스(용인) 인원은 프로젝트의 서울 우선 범위에서 제외한다.
 */
export const verifiedMyongji2027Admissions: Admission[] = [
  makeAggregate("myongji-school-recommendation-2027", "학생부교과(학교장추천전형) 서울캠퍼스", "교과", 171, {
    studentRecordWeight: 100,
  }),
  makeAggregate("myongji-interview-record-2027", "학생부교과(교과면접전형) 서울캠퍼스", "교과", 134, {
    studentRecordWeight: 70,
    interview: true,
  }),
  makeAggregate("myongji-opportunity-2027", "학생부교과(기회균형전형) 서울캠퍼스", "교과", 30, {
    studentRecordWeight: 100,
  }),
  makeAggregate("myongji-specialized-2027", "학생부교과(특성화고교전형) 서울캠퍼스", "교과", 15, {
    studentRecordWeight: 100,
  }),
  makeAggregate("myongji-adult-2027", "학생부교과(만학도고등졸전형) 서울캠퍼스", "교과", 45, {
    studentRecordWeight: 100,
  }),
  makeAggregate("myongji-employee-2027", "학생부교과(특성화고등졸재직자전형) 서울캠퍼스", "교과", 147, {
    studentRecordWeight: 100,
  }),
  makeAggregate("myongji-special-education-2027", "학생부교과(특수교육대상자전형) 서울캠퍼스", "교과", 35, {
    studentRecordWeight: 100,
  }),
  makeAggregate("myongji-talent-interview-2027", "학생부종합(명지인재면접전형) 서울캠퍼스", "학종", 198, {
    documentWeight: 70,
    interview: true,
  }),
  makeAggregate("myongji-talent-document-2027", "학생부종합(명지인재서류전형) 서울캠퍼스", "학종", 197, {
    documentWeight: 100,
  }),
  makeAggregate("myongji-christian-2027", "학생부종합(크리스천리더전형) 서울캠퍼스", "학종", 26, {
    documentWeight: 100,
  }),
  makeAggregate("myongji-social-care-2027", "학생부종합(사회적배려대상자전형) 서울캠퍼스", "학종", 19, {
    documentWeight: 100,
  }),
  makeAggregate("myongji-farmland-2027", "학생부종합(농어촌학생전형) 서울캠퍼스", "학종", 57, {
    documentWeight: 100,
  }),
  makeAggregate("myongji-practical-2027", "실기/실적(실기우수자전형) 서울캠퍼스", "기타", 0),
  makeAggregate("myongji-special-talent-2027", "실기/실적(특기자전형) 서울캠퍼스", "기타", 0),
];

export const verifiedMyongji2027Summary = {
  source,
  campusScope: "인문캠퍼스(서울)",
  seoulCampusTotals: {
    schoolRecommendation: 171,
    curriculumInterview: 134,
    opportunity: 30,
    specializedHighSchool: 15,
    adultLearner: 45,
    employee: 147,
    specialEducation: 35,
    talentInterview: 198,
    talentDocument: 197,
    christianLeader: 26,
    socialCare: 19,
    farmland: 57,
    practical: 0,
    specialTalent: 0,
  },
  selection: {
    allTracksCsat: "수능최저학력기준 미적용",
    schoolRecommendation: "학생부교과 100%",
    curriculumInterview: "1단계 학생부교과100% 5배수 → 2단계 1단계 성적70% + 면접30%",
    talentInterview: "1단계 서류100% 5배수 → 2단계 서류70% + 면접30%",
    talentDocument: "서류평가 100%",
  },
  notes: [
    "2026-06-04 수정본에서 학교장추천 캠퍼스별 모집인원 소계를 정정함.",
    "2026-06-16 수정본에서 학생부종합 전년도 입시결과 표기와 실기우수자 음악 성악 트랙 표기를 보정함.",
    "논술전형은 실시하지 않음.",
    "서울 인문캠퍼스만 포함하고 용인 자연캠퍼스는 제외함.",
  ],
};
