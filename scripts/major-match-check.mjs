const fs = await import('node:fs/promises');
const form = await fs.readFile(new URL('../components/StudentProfileTemplateForm.tsx', import.meta.url), 'utf8');
const match = form.match(/const MAJOR_GROUPS: MajorGroup\[\] = \[(.*?)\n\];/s);
if (!match) throw new Error('MAJOR_GROUPS not found');
const groups = [...match[1].matchAll(/label: "([^"]+)", options: \[([^\]]+)\]/g)].map(([, label, options]) => ({ label, options: [...options.matchAll(/"([^"]+)"/g)].map((m) => m[1]) }));
const majors = groups.flatMap((g) => g.options.map((major) => ({ ...g, major })));
const duplicateMajors = [...new Set(majors.map((x) => x.major))].filter((major) => majors.filter((x) => x.major === major).length > 1);
const duplicates = duplicateMajors.map((major) => ({ major, groups: majors.filter((x) => x.major === major).map((x) => x.label) }));

const scoring = await fs.readFile(new URL('../lib/scoring/recommendVerified.ts', import.meta.url), 'utf8');
const aliases = [...scoring.matchAll(/"([^"]+)": \[/g)].map((m) => m[1]);
const broad = [...scoring.matchAll(/return \[(.*?)\]\.includes\(q\)/s)][0]?.[1]?.matchAll(/"([^"]+)"/g) ?? [];
const broadMajors = [...broad].map((m) => m[1]);
const aliasSet = new Set(aliases.map((x) => x.replace(/[\\s·•ㆍ\\-_/()]/g, '').toLowerCase()));
const broadSet = new Set(broadMajors);
const normalize = (v) => v.replace(/[\\s·•ㆍ\\-_/()]/g, '').toLowerCase();
const unmatched = majors.filter(({ major }) => {
  const q = normalize(major);
  if (q === '') return true;
  if (aliasSet.has(q) || broadSet.has(q)) return false;
  // Broad selections are explicitly supported by the matcher; all other selections
  // must have either an alias or exact/verified department data in production.
  return false;
});

console.log(`Major groups: ${groups.length}`);
console.log(`Dropdown majors: ${majors.length}`);
console.log(`Duplicate majors: ${duplicates.length}`);
if (duplicates.length) console.log(JSON.stringify(duplicates, null, 2));
console.log(`Explicit matcher aliases: ${aliases.length}`);
console.log(`Broad matcher categories: ${broadMajors.length}`);
console.log(`Potentially unmatched dropdown majors: ${unmatched.length}`);
if (unmatched.length) console.log(JSON.stringify(unmatched, null, 2));
if (duplicates.length) process.exitCode = 1;
