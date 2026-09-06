import type { Admission, Department, University } from "../types";

// 2027학년도 서울권 미작업 대학 검증 데이터
// 캠퍼스 혼입을 막기 위해 확인된 수치만 반영하고, 미확인 모집인원은 추정하지 않음.
export const seoulRealBatch12Universities: University[] = [
  { id: "kyonggi-seoul-2027", name: "경기대학교", region: "서울" },
  { id: "knsu-2027", name: "한국체육대학교", region: "서울" },
  { id: "chugye-2027", name: "추계예술대학교", region: "서울" },
];

export const seoulRealBatch12Departments: Department[] = [
  { id: "kyonggi-seoul-all-2027", universityId: "kyonggi-seoul-2027", name: "전체모집단위", category: "전체" },
  { id: "knsu-all-2027", universityId: "knsu-2027", name: "전체모집단위", category: "전체" },
  { id: "chugye-gukak-2027", universityId: "chugye-2027", name: "국악과", category: "공연예술" },
  { id: "chugye-vocal-2027", universityId: "chugye-2027", name: "성악과", category: "공연예술" },
  { id: "chugye-piano-2027", universityId: "chugye-2027", name: "피아노과", category: "공연예술" },
  { id: "chugye-orchestra-2027", universityId: "chugye-2027", name: "관현악과", category: "공연예술" },
  { id: "chugye-composition-2027", universityId: "chugye-2027", name: "작곡과", category: "예체능" },
  { id: "chugye-fineart-2027", universityId: "chugye-2027", name: "미술창작학부", category: "창의예술" },
  { id: "chugye-writing-2027", universityId: "chugye-2027", name: "문예창작과", category: "인문사회" },
  { id: "chugye-convergence-2027", universityId: "chugye-2027", name: "융합예술학부", category: "인문사회" },
  { id: "chugye-all-2027", universityId: "chugye-2027", name: "전체모집단위", category: "전체" },
];

const kyonggiSource = { type: "university" as const, academicYear: 2027, document: "2027학년도 수시모집요강", verifiedAt: "2026-09-07", confidence: 0.99, url: "https://enter.kyonggi.ac.kr/" };
const knsuSource = { type: "university" as const, academicYear: 2027, document: "2027학년도 수시모집요강", verifiedAt: "2026-09-07", confidence: 0.97, url: "https://www.knsu.ac.kr/ipsi/rolling/application.do" };
const chugyeSource = { type: "university" as const, academicYear: 2027, document: "2027학년도 신입학전형 수시 모집요강", verifiedAt: "2026-09-07", confidence: 0.99, url: "https://enter.chugye.ac.kr/" };

export const seoulRealBatch12Admissions: Admission[] = [
  // 경기대학교 서울캠퍼스: 서울 자유전공학부 논술 54명만 서울캠퍼스 수치로 확정 확인.
  { id: "kyonggi-seoul-2027-free-major-essay", universityId: "kyonggi-seoul-2027", departmentId: "kyonggi-seoul-all-2027", academicYear: 2027, name: "논술우수자(자유전공학부 서울)", type: "논술", recruitmentCount: 54, source: kyonggiSource, isMock: false, isAggregate: true },

  // 한국체육대학교: 2027 시행계획/전형평가기준에서 수시 모집인원이 명시된 항목만 반영.
  { id: "knsu-2027-practical", universityId: "knsu-2027", departmentId: "knsu-all-2027", academicYear: 2027, name: "실기우수자전형", type: "기타", recruitmentCount: 35, source: knsuSource, isMock: false, isAggregate: true },
  { id: "knsu-2027-gyogwa", universityId: "knsu-2027", departmentId: "knsu-all-2027", academicYear: 2027, name: "교과성적우수자전형", type: "교과", recruitmentCount: 50, studentRecordWeight: 100, source: knsuSource, isMock: false, isAggregate: true },

  // 추계예술대학교 2027 수시 정원내 139명 + 정원외 재외국민·외국인 5명.
  { id: "chugye-2027-gukak", universityId: "chugye-2027", departmentId: "chugye-gukak-2027", academicYear: 2027, name: "일반학생전형", type: "기타", recruitmentCount: 21, source: chugyeSource, isMock: false, isAggregate: false },
  { id: "chugye-2027-vocal", universityId: "chugye-2027", departmentId: "chugye-vocal-2027", academicYear: 2027, name: "일반학생전형", type: "기타", recruitmentCount: 24, source: chugyeSource, isMock: false, isAggregate: false },
  { id: "chugye-2027-piano", universityId: "chugye-2027", departmentId: "chugye-piano-2027", academicYear: 2027, name: "일반학생전형", type: "기타", recruitmentCount: 6, source: chugyeSource, isMock: false, isAggregate: false },
  { id: "chugye-2027-orchestra", universityId: "chugye-2027", departmentId: "chugye-orchestra-2027", academicYear: 2027, name: "일반학생전형", type: "기타", recruitmentCount: 19, source: chugyeSource, isMock: false, isAggregate: false },
  { id: "chugye-2027-composition", universityId: "chugye-2027", departmentId: "chugye-composition-2027", academicYear: 2027, name: "일반학생전형", type: "기타", recruitmentCount: 10, source: chugyeSource, isMock: false, isAggregate: false },
  { id: "chugye-2027-fineart", universityId: "chugye-2027", departmentId: "chugye-fineart-2027", academicYear: 2027, name: "일반학생전형", type: "기타", recruitmentCount: 45, source: chugyeSource, isMock: false, isAggregate: false },
  { id: "chugye-2027-writing", universityId: "chugye-2027", departmentId: "chugye-writing-2027", academicYear: 2027, name: "수상실적특기자전형", type: "학종", recruitmentCount: 4, source: chugyeSource, isMock: false, isAggregate: false },
  { id: "chugye-2027-convergence", universityId: "chugye-2027", departmentId: "chugye-convergence-2027", academicYear: 2027, name: "미래인재전형", type: "교과", recruitmentCount: 10, source: chugyeSource, isMock: false, isAggregate: false },
  { id: "chugye-2027-extra", universityId: "chugye-2027", departmentId: "chugye-all-2027", academicYear: 2027, name: "재외국민·외국인전형", type: "기타", recruitmentCount: 5, source: chugyeSource, isMock: false, isAggregate: true },
];
