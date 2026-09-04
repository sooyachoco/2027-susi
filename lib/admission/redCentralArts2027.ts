import type { Admission, Department, AdmissionType } from "./types";

const source = { type: "university" as const, academicYear: 2027, collectedAt: "2026-09-04", verifiedAt: "2026-09-04", confidence: 0.99 };
const url = "https://admission.cau.ac.kr/file/pdfDown.pdf?ofn=%EC%A4%91%EC%95%99%EB%8C%80%ED%95%99%EA%B5%90_2027%ED%95%99%EB%85%84%EB%8F%84+%EC%88%98%EC%8B%9C%EB%AA%A8%EC%A7%91%EC%9A%94%EA%B0%95%28%EB%8B%A8%EB%A9%B4%29_%EA%B3%B5%EA%B3%A0%EC%9A%A9.pdf&sfn=20260609111455769_c6144e06ef38475d8ce9563f87b7f3b4.pdf";

type Row = [string, string, "실기" | "특기", number];
const rows: Row[] = [
  ["cau-2027-theater-acting", "공연영상창작학부(연극(연기))", "실기", 24],
  ["cau-2027-theater-musical", "공연영상창작학부(연극(뮤지컬연기))", "실기", 8],
  ["cau-2027-film", "공연영상창작학부(영화)", "실기", 8],
  ["cau-2027-space", "공연영상창작학부(공간연출)", "실기", 7],
  ["cau-2027-creative-writing", "공연영상창작학부(문예창작)", "실기", 19],
  ["cau-2027-photo", "공연영상창작학부(사진)", "실기", 24],
  ["cau-2027-dance", "공연영상창작학부(무용)", "실기", 34],
  ["cau-2027-korean-painting", "미술학부(한국화)", "실기", 13],
  ["cau-2027-western-painting", "미술학부(서양화)", "실기", 11],
  ["cau-2027-sculpture", "미술학부(조소)", "실기", 13],
  ["cau-2027-craft", "디자인학부(공예)", "실기", 4],
  ["cau-2027-industrial-design", "디자인학부(산업디자인)", "실기", 5],
  ["cau-2027-visual-design", "디자인학부(시각디자인)", "실기", 6],
  ["cau-2027-composition", "음악학부(작곡)", "실기", 9],
  ["cau-2027-vocal", "음악학부(성악)", "실기", 6],
  ["cau-2027-piano", "음악학부(피아노)", "실기", 12],
  ["cau-2027-orchestral", "음악학부(관현악)", "실기", 22],
  ["cau-2027-traditional-music", "전통예술학부(음악예술)", "실기", 40],
  ["cau-2027-traditional-performance", "전통예술학부(연희예술)", "실기", 35],
  ["cau-2027-tv-broadcast", "글로벌예술학부(TV방송연예)", "실기", 7],
  ["cau-2027-practical-music", "글로벌예술학부(실용음악)", "실기", 4],
  ["cau-2027-game-animation", "글로벌예술학부(게임콘텐츠·애니메이션)", "실기", 2],
  ["cau-2027-theater-directing", "공연영상창작학부(연극(연출/기획))", "특기", 12],
  ["cau-2027-theater-acting-talent", "공연영상창작학부(연극(연기))", "특기", 2],
  ["cau-2027-writing-talent", "공연영상창작학부(문예창작)", "특기", 4],
  ["cau-2027-sports-talent", "스포츠과학부(체육특기)", "특기", 26],
  ["cau-2027-golf-talent", "스포츠과학부(골프)", "특기", 30]
];

export const redCentralArts2027Departments: Department[] = rows.map(([id, name]) => ({ id, universityId: "cau", name, category: "수시모집단위" }));

export const redCentralArts2027Admissions: Admission[] = rows.map(([departmentId, _name, kind, count]) => ({
  id: `cau-red-arts-${departmentId}-${kind}-2027`,
  universityId: "cau",
  departmentId,
  academicYear: 2027,
  name: kind === "실기" ? "실기/실적(실기형)" : "실기/실적(특기형)",
  type: "기타" as AdmissionType,
  recruitmentCount: count,
  source: { ...source, url },
  isMock: false
} as Admission));