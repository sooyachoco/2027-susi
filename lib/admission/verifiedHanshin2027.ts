import type { Admission, Department, University } from "./types";
import { admissionSources } from "./sources";

const source = admissionSources.hanshin2027;

export const verifiedHanshin2027Universities: University[] = [
  { id: "hanshin", name: "한신대학교", region: "경기" },
];

export const verifiedHanshin2027Departments: Department[] = [
  ["free", "자유전공학부", "자유전공"],
  ["humanities", "신학·인문융합계열", "인문사회"],
  ["culture", "문화콘텐츠계열", "인문사회"],
  ["global", "글로벌융합계열", "인문사회"],
  ["business", "경영계열", "경영·경제"],
  ["media", "미디어계열", "미디어·콘텐츠"],
  ["human-service", "휴먼서비스계열", "보건·복지"],
  ["sports", "특수체육학계열", "체육·스포츠"],
  ["advanced", "첨단융합계열", "공학·자연"],
  ["ai-sw", "AI·SW계열", "컴퓨터·AI"],
  ["ai-semiconductor", "AI시스템반도체학", "공학·자연"],
].map(([id, name, category]) => ({
  id: `hanshin-${id}`,
  universityId: "hanshin",
  name,
  category,
}));

type Row = [string, number, string, "교과" | "학종" | "논술" | "기타", boolean?, number?];

const rows: Row[] = [
  ["free", 30, "논술전형", "논술"],
  ["free", 35, "학생부교과(참인재전형)", "교과", true, 60],
  ["free", 35, "학생부교과(학생부우수자전형)", "교과", false, 100],
  ["free", 20, "학생부교과(학교장추천전형)", "교과", false, 100],

  ["humanities", 40, "논술전형", "논술"],
  ["humanities", 10, "학생부교과(참인재전형)", "교과", true, 60],
  ["humanities", 10, "학생부교과(학생부우수자전형)", "교과", false, 100],
  ["humanities", 12, "학생부교과(학교장추천전형)", "교과", false, 100],

  ["culture", 39, "논술전형", "논술"],
  ["culture", 8, "학생부교과(참인재전형)", "교과", true, 60],
  ["culture", 10, "학생부교과(학생부우수자전형)", "교과", false, 100],
  ["culture", 8, "학생부교과(학교장추천전형)", "교과", false, 100],

  ["global", 38, "논술전형", "논술"],
  ["global", 8, "학생부교과(참인재전형)", "교과", true, 60],
  ["global", 8, "학생부교과(학생부우수자전형)", "교과", false, 100],
  ["global", 12, "학생부교과(학교장추천전형)", "교과", false, 100],

  ["business", 10, "논술전형", "논술"],
  ["business", 18, "학생부교과(참인재전형)", "교과", true, 60],
  ["business", 27, "학생부교과(학생부우수자전형)", "교과", false, 100],
  ["business", 4, "학생부교과(학교장추천전형)", "교과", false, 100],
  ["business", 5, "학생부교과(사회배려자전형)", "교과", false, 100],
  ["business", 3, "학생부교과(고른기회전형)", "교과", false, 100],

  ["media", 8, "논술전형", "논술"],
  ["media", 14, "학생부교과(참인재전형)", "교과", true, 60],
  ["media", 21, "학생부교과(학생부우수자전형)", "교과", false, 100],
  ["media", 4, "학생부교과(학교장추천전형)", "교과", false, 100],
  ["media", 5, "학생부교과(사회배려자전형)", "교과", false, 100],
  ["media", 3, "학생부교과(고른기회전형)", "교과", false, 100],

  ["human-service", 42, "논술전형", "논술"],
  ["human-service", 6, "학생부교과(참인재전형)", "교과", true, 60],
  ["human-service", 7, "학생부교과(학생부우수자전형)", "교과", false, 100],
  ["human-service", 5, "학생부교과(학교장추천전형)", "교과", false, 100],

  ["sports", 22, "학생부교과(체육실기전형)", "기타", false, 45],

  ["advanced", 22, "논술전형", "논술"],
  ["advanced", 5, "학생부교과(참인재전형)", "교과", true, 60],
  ["advanced", 8, "학생부교과(학생부우수자전형)", "교과", false, 100],
  ["advanced", 5, "학생부교과(학교장추천전형)", "교과", false, 100],

  ["ai-sw", 50, "논술전형", "논술"],
  ["ai-sw", 60, "학생부교과(참인재전형)", "교과", true, 60],
  ["ai-sw", 50, "학생부교과(학생부우수자전형)", "교과", false, 100],
  ["ai-sw", 10, "학생부교과(학교장추천전형)", "교과", false, 100],
  ["ai-sw", 10, "학생부교과(사회배려자전형)", "교과", false, 100],
  ["ai-sw", 15, "학생부교과(고른기회전형)", "교과", false, 100],

  ["ai-semiconductor", 10, "논술전형", "논술"],
  ["ai-semiconductor", 7, "학생부교과(참인재전형)", "교과", true, 60],
  ["ai-semiconductor", 10, "학생부교과(학생부우수자전형)", "교과", false, 100],
];

export const verifiedHanshin2027Admissions: Admission[] = rows.map(
  ([department, recruitmentCount, name, type, interview, studentRecordWeight]) => ({
    id: `a-hanshin-${department}-${name.replace(/[^가-힣A-Za-z0-9]+/g, "-").toLowerCase()}`,
    universityId: "hanshin",
    departmentId: `hanshin-${department}`,
    academicYear: 2027,
    name,
    type,
    recruitmentCount,
    ...(studentRecordWeight ? { studentRecordWeight } : {}),
    ...(interview ? { interview, documentWeight: 60 } : {}),
    csatMinimum: { enabled: false },
    source,
    isMock: false,
  }),
);
