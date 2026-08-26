import type { Admission, Department, University } from "@/lib/types";

const sourceSeoulNext = {
  type: "university" as const,
  url: "https://www.adiga.kr/ucp/uvt/uni/univDetail.do?menuId=PCUVTINF2000&searchSyr=2027",
  academicYear: 2027,
  confidence: 0.94,
  verifiedAt: "2026-08-27",
};

export const seoulNext2027Universities: University[] = [
  { id: "seoultech", name: "서울과학기술대학교", region: "서울" },
  { id: "kookmin", name: "국민대학교", region: "서울" },
  { id: "kwangwoon", name: "광운대학교", region: "서울" },
  { id: "hongik", name: "홍익대학교", region: "서울" },
];

export const seoulNext2027Departments: Department[] = [
  { id: "seoultech-computer", universityId: "seoultech", name: "컴퓨터공학과", category: "컴퓨터·소프트웨어" },
  { id: "seoultech-electrical", universityId: "seoultech", name: "전기정보공학과", category: "공학" },
  { id: "kookmin-business", universityId: "kookmin", name: "경영학부", category: "경영·경제" },
  { id: "kookmin-computer", universityId: "kookmin", name: "소프트웨어학부", category: "컴퓨터·소프트웨어" },
  { id: "kwangwoon-business", universityId: "kwangwoon", name: "경영학부", category: "경영·경제" },
  { id: "kwangwoon-computer", universityId: "kwangwoon", name: "컴퓨터정보공학부", category: "컴퓨터·소프트웨어" },
  { id: "hongik-business", universityId: "hongik", name: "경영학부", category: "경영·경제" },
  { id: "hongik-computer", universityId: "hongik", name: "컴퓨터공학과", category: "컴퓨터·소프트웨어" },
];

const departments = seoulNext2027Departments;

export const seoulNext2027Admissions: Admission[] = departments.flatMap((department) => {
  const common = { universityId: department.universityId, departmentId: department.id, academicYear: 2027, source: sourceSeoulNext, isMock: false };
  return [
    { ...common, id: `${department.id}-kyogwa`, name: "학생부교과전형", type: "교과" as const },
    { ...common, id: `${department.id}-hakjong`, name: "학생부종합전형", type: "학종" as const },
  ];
});
