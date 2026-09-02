import type { Admission, Department, University } from "./types";

const source = { type: "university" as const, url: "https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000156", academicYear: 2027, confidence: 0.95 };

export const yongin2027Universities: University[] = [{ id: "yongin", name: "용인대학교", region: "경기" }];

const units: Array<[string, string, string]> = [
  ["free", "무전공학부", "융합"], ["humanities-track", "인문사회계열전공학부", "인문·사회"], ["business", "경영학과", "경영·경제"], ["tourism", "관광경영학과", "경영·경제"], ["china", "중국학과", "인문·사회"], ["social-welfare", "사회복지학과", "사회복지"], ["content", "문화콘텐츠학과", "미디어·콘텐츠"], ["police", "경찰행정학과", "법·행정"], ["natural-track", "자연계열전공학부", "자연과학"], ["ai-convergence", "AI융합학부", "컴퓨터·소프트웨어"], ["ai-semiconductor", "AI시스템반도체학과", "컴퓨터·AI"], ["food-cooking", "식품조리학과", "자연과학"], ["physical-therapy", "물리치료학과", "보건"], ["heritage", "문화유산학과", "인문·사회"], ["nutrition", "식품영양학과", "자연과학"], ["environment-safety", "보건환경안전학과", "보건"], ["bio", "바이오생명공학과", "생명과학"], ["special-physical", "특수체육교육과", "예체능"], ["martial-arts", "무도계열전공학부", "예체능"], ["physical-education", "체육계열전공학부", "예체능"], ["arts", "문화예술계열전공학부", "예체능"], ["martial", "무도학과", "예체능"], ["taekwondo", "태권도학과", "예체능"], ["judo", "유도학과", "예체능"], ["guard", "경호학과", "예체능"], ["sports", "체육학과", "예체능"], ["sports-leisure", "스포츠레저학과", "예체능"], ["golf", "골프학부", "예체능"], ["dance", "무용과", "예체능"], ["painting", "회화학과", "예체능"], ["media-design", "미디어디자인학과", "예체능"], ["theater", "연극학과", "예체능"], ["film", "영화영상학과", "예체능"], ["music", "실용음악과", "예체능"],
];

export const yongin2027Departments: Department[] = units.map(([id, name, category]) => ({ id: `yongin-${id}`, universityId: "yongin", name, category }));

const admission = (id: string, dept: string, name: string, type: "교과" | "학종" | "논술" | "기타", extra: Partial<Admission> = {}): Admission => ({ id: `yongin-${dept}-${id}-2027`, universityId: "yongin", departmentId: `yongin-${dept}`, academicYear: 2027, name, type, source, isMock: false, ...extra });

export const yongin2027Admissions: Admission[] = [
  ...units.map(([id]) => admission("general", id, "일반학생전형", "교과", { studentRecordWeight: 100 })),
  ...[
    ["free", 153], ["martial-arts", 36], ["physical-education", 17], ["arts", 29], ["humanities-track", 30], ["natural-track", 25],
  ].map(([id, count]) => admission("free-major", String(id), "자율전공 특별전형", "교과", { studentRecordWeight: 100, recruitmentCount: Number(count) })),
  ...[
    ["business", 8], ["police", 8], ["tourism", 4], ["content", 5], ["social-welfare", 6], ["china", 2], ["ai-convergence", 12], ["ai-semiconductor", 8],
  ].map(([id, count]) => admission("top-grade", String(id), "교과성적우수자 특별전형", "교과", { studentRecordWeight: 100, csatMinimum: { enabled: true, description: "인문·자연 국어·영어·수학 중 2개 영역 합 8 이내, 경찰행정학과 9 이내" }, recruitmentCount: Number(count) })),
  ...units.map(([id]) => admission("balanced", id, "기회균형 특별전형", "교과", { studentRecordWeight: 100 })),
  ...["martial-arts", "physical-education", "taekwondo", "judo", "guard", "sports", "sports-leisure", "golf", "dance", "painting", "media-design", "theater", "film", "music"].map((id) => admission("sports-excellence", id, "체육우수자 특별전형", "기타", { studentRecordWeight: 30 })),
  { id: "yongin-ai-system-semiconductor-rural-2027", universityId: "yongin", departmentId: "yongin-ai-semiconductor", academicYear: 2027, name: "농어촌학생 특별전형", type: "교과", studentRecordWeight: 100, recruitmentCount: 2, source, isMock: false },
];

export const yongin2027VerifiedTotals = { inQuota: 1014, general: 452, freeMajor: 237, sportsExcellence: 180, topGrade: 80, balanced: 65, outOfQuota: 69, rural: 41, specializedHighSchool: 18, lowIncome: 10, aiSemiconductor: { general: 18, topGrade: 8, balanced: 2, rural: 2 } };
