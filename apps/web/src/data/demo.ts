// Dane wymyślone na potrzeby widoków. Docelowo przyjdą z API. Daty matur też są przykładowe.

export type Skill = { name: string; mastery: number; note: string };

export type Format = "Napraw błąd" | "Szybkie rundy" | "Uczeń uczy AI" | "Krok po kroku" | "Tutor";

export type Recommendation = {
  skill: string;
  reason: string;
  format: Format;
  minutes: number;
};

export type Subject = {
  id: string;
  name: string;
  level: string;
  tone: "orange" | "blue" | "yellow";
  examDate: string;
  recommendation: Recommendation;
  alternatives: Recommendation[];
  reviews: { count: number; minutes: number };
  skills: Skill[];
  continueItem: { title: string; step: string; progress: number } | null;
  lastSheet: { title: string; score: number; max: number } | null;
};

export const student = { name: "Ola" };

export const subjects: Subject[] = [
  {
    id: "polski",
    name: "Polski",
    level: "podstawa",
    tone: "orange",
    examDate: "2027-05-04",
    recommendation: {
      skill: "Argumentacja w wypracowaniu",
      reason: "Opanowanie 46%. W dwóch ostatnich wypracowaniach argument nie miał odwołania do lektury.",
      format: "Krok po kroku",
      minutes: 12,
    },
    alternatives: [{ skill: "Środki stylistyczne", reason: "", format: "Szybkie rundy", minutes: 5 }],
    reviews: { count: 2, minutes: 6 },
    skills: [
      { name: "Argumentacja w wypracowaniu", mastery: 46, note: "argument bez odwołania do lektury" },
      { name: "Środki stylistyczne", mastery: 61, note: "myli epitet z metaforą" },
      { name: "Czytanie ze zrozumieniem", mastery: 74, note: "stabilnie" },
    ],
    continueItem: null,
    lastSheet: { title: "Maj 2025, podstawa", score: 41, max: 60 },
  },
  {
    id: "matematyka",
    name: "Matematyka",
    level: "podstawa",
    tone: "blue",
    examDate: "2027-05-06",
    recommendation: {
      skill: "Funkcja kwadratowa",
      reason: "Opanowanie 38%. Trzy ostatnie błędy to zły znak przy wyznaczaniu wierzchołka.",
      format: "Napraw błąd",
      minutes: 10,
    },
    alternatives: [{ skill: "Ciągi", reason: "", format: "Szybkie rundy", minutes: 5 }],
    reviews: { count: 3, minutes: 8 },
    skills: [
      { name: "Funkcja kwadratowa", mastery: 38, note: "znak przy wierzchołku" },
      { name: "Ciągi", mastery: 55, note: "wzór na sumę bez sprawdzenia" },
      { name: "Planimetria", mastery: 67, note: "pomija założenia zadania" },
      { name: "Procenty", mastery: 88, note: "stabilnie" },
    ],
    continueItem: { title: "Zadanie optymalizacyjne", step: "krok 3 z 5", progress: 60 },
    lastSheet: { title: "Maj 2025, podstawa", score: 31, max: 50 },
  },
  {
    id: "angielski",
    name: "Angielski",
    level: "dwujęzyczny",
    tone: "yellow",
    examDate: "2027-05-07",
    recommendation: {
      skill: "Spójność i logika",
      reason: "Opanowanie 41%, ostatnio ćwiczone 12 dni temu. Trzy ostatnie błędy to przeskoki w czasie wypowiedzi.",
      format: "Napraw błąd",
      minutes: 8,
    },
    alternatives: [
      { skill: "Szukanie informacji", reason: "", format: "Szybkie rundy", minutes: 5 },
      { skill: "Opinie i uzasadnianie", reason: "", format: "Uczeń uczy AI", minutes: 10 },
    ],
    reviews: { count: 4, minutes: 10 },
    skills: [
      { name: "Szukanie informacji", mastery: 33, note: "myli parafrazę z dosłownym cytatem" },
      { name: "Spójność i logika", mastery: 41, note: "przeskoki czasu w wypowiedzi" },
      { name: "Opinie i uzasadnianie", mastery: 58, note: "argumenty bez przykładu" },
      { name: "Budowa tekstu", mastery: 82, note: "stabilnie od trzech tygodni" },
    ],
    continueItem: { title: "Rozprawka", step: "etap: zakończenie", progress: 70 },
    lastSheet: { title: "Maj 2025, dwujęzyczny", score: 38, max: 60 },
  },
];

export const knowledgeMap = { nodes: 23, newLinks: 3 };

export function getSubject(id: string | undefined): Subject | undefined {
  return subjects.find((s) => s.id === id);
}

export function averageMastery(s: Subject): number {
  return Math.round(s.skills.reduce((sum, k) => sum + k.mastery, 0) / s.skills.length);
}

// Na pulpicie ogólnym rekomendacja pochodzi z przedmiotu z najniżej opanowaną umiejętnością docelową.
export function topPick(): Subject {
  const mastery = (s: Subject) => s.skills.find((k) => k.name === s.recommendation.skill)?.mastery ?? 100;
  return [...subjects].sort((a, b) => mastery(a) - mastery(b))[0];
}

export function nearestExam(): Subject {
  return [...subjects].sort((a, b) => a.examDate.localeCompare(b.examDate))[0];
}

export function daysUntil(date: string): number {
  const ms = new Date(date).getTime() - Date.now();
  return Math.max(0, Math.ceil(ms / 86_400_000));
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("pl-PL", { day: "numeric", month: "long" });
}
