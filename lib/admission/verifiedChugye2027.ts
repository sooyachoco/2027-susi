import type { Admission, Department, University } from "@/lib/types";

export const verifiedChugye2027Universities: University[] = [{ id: "chugye", name: "추계예술대학교", region: "서울" }];
const rows = [
  ["chugye-1", "국악과", "공연예술"], ["chugye-2", "성악과", "공연예술"], ["chugye-3", "피아노과", "공연예술"], ["chugye-4", "관현악과", "공연예술"], ["chugye-5", "작곡과", "공연예술"], ["chugye-6", "미술창작학부", "창의예술"], ["chugye-7", "문예창작과", "인문사회"], ["chugye-8", "콘텐츠창작학부", "융합예술"],
] as const;
export const verifiedChugye2027Departments: Department[] = rows.map(([id, name, category]) => ({ id, universityId: "chugye", name, category }));
const admissions: Admission[] = [];
const add = (departmentId: string, name: string, type: Admission["type"], count: number, extra: Partial<Admission> = {}) => admissions.push({ id: `chugye-2027-${admissions.length + 1}`, universityId: "chugye", departmentId, academicYear: 2027, name, type, recruitmentCount: count, source: "추계예술대학교 2027 수시모집 최종 합본", ...extra } as Admission);
add("chugye-1", "실기/실적 일반학생전형", "기타", 21);
add("chugye-2", "실기/실적 일반학생전형", "기타", 24);
add("chugye-3", "실기/실적 일반학생전형", "기타", 6);
add("chugye-4", "실기/실적 일반학생전형", "기타", 19);
add("chugye-5", "실기/실적 일반학생전형", "기타", 10);
add("chugye-6", "실기/실적 일반학생전형", "기타", 45, { studentRecordWeight: 20, documentWeight: 80 });
add("chugye-7", "실기/실적 수상실적특기자전형", "기타", 4, { documentWeight: 100 });
add("chugye-8", "학생부교과 미래인재전형", "교과", 10, { studentRecordWeight: 40, interview: true });
export const verifiedChugye2027Admissions = admissions;
export const verifiedChugye2027Summary = { academicYear: 2027, university: "추계예술대학교", region: "서울", verified: true, source: "https://enter.chugye.ac.kr/BoardView.do?dataSeq=218&idx=1649162878&menuSeq=114", inCampusEarlyTotal: 139, notes: ["2027 수시 정원내 139명", "수시 전 전형 수능최저 미적용", "미술창작학부 학생부20%+실기80%", "콘텐츠창작학부 1단계 학생부100%(3배수) → 2단계 학생부40%+면접60%"] };
