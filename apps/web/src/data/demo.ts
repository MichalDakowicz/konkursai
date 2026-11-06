// Dane wymyślone na potrzeby widoków. Docelowo przyjdą z API.

export const student = {
  name: "Ola",
  subject: "Angielski dwujęzyczny",
  examDate: "2027-05-12",
};

export const subjects = ["Angielski dwujęzyczny", "Informatyka"];

export const recommendation = {
  skill: "Spójność i logika",
  reason: "Opanowanie 41%, ostatnio ćwiczone 12 dni temu. Trzy ostatnie błędy to przeskoki w czasie wypowiedzi.",
  format: "Napraw błąd",
  minutes: 8,
  alternatives: [
    { skill: "Szukanie informacji", format: "Szybkie rundy", minutes: 5 },
    { skill: "Opinie i uzasadnianie", format: "Uczeń uczy AI", minutes: 10 },
  ],
};

export const reviews = { count: 4, minutes: 10 };

export type Skill = { name: string; mastery: number; note: string };

export const skills: Skill[] = [
  { name: "Szukanie informacji", mastery: 33, note: "myli parafrazę z dosłownym cytatem" },
  { name: "Spójność i logika", mastery: 41, note: "przeskoki czasu w wypowiedzi" },
  { name: "Opinie i uzasadnianie", mastery: 58, note: "argumenty bez przykładu" },
  { name: "Budowa tekstu", mastery: 82, note: "stabilnie od trzech tygodni" },
];

export const continueItem = { title: "Rozprawka", step: "etap: zakończenie", progress: 70 };

export const lastSheet = { title: "Maj 2025, poziom dwujęzyczny", score: 38, max: 60 };

export const knowledgeMap = { nodes: 23, newLinks: 3 };

export function daysUntil(date: string): number {
  const ms = new Date(date).getTime() - Date.now();
  return Math.max(0, Math.ceil(ms / 86_400_000));
}
