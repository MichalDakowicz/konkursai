import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from "react";
import type { AvatarState } from "./TutorAvatar";
import { recommendation } from "../data/demo";

export type Message = { id: number; from: "tutor" | "student"; text: string };

type TutorValue = {
  messages: Message[];
  state: AvatarState;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  send: (text: string) => void;
  suggestions: string[];
};

const TutorContext = createContext<TutorValue | null>(null);

const greeting =
  `Cześć! Widzę, że ${recommendation.skill.toLowerCase()} to dziś twoja najsłabsza umiejętność. ` +
  "Zanim cokolwiek wyjaśnię: jak myślisz, po czym czytelnik poznaje, że akapity w rozprawce łączą się logicznie?";

// Sokratejskie odpowiedzi na sztywno, dopóki nie ma backendu z modelem.
const scripted = [
  "Dobry trop. A co się dzieje z czasem gramatycznym, gdy przechodzisz od przykładu do wniosku? Spójrz na swoje ostatnie zakończenie.",
  "Właśnie. Masz tam present simple w tezie i nagle past simple we wniosku. Jak przeredagowałabyś to jedno zdanie, żeby czas był spójny?",
  "Brzmi spójnie. Sprawdźmy to na nowym przykładzie: krótki mini-test, 3 zdania, ok. 2 minuty. Gotowa?",
];

const fallback = "Dobrze. Pokażę ci to na zadaniu, zamiast tłumaczyć regułę. Otwórz „Napraw błąd” z pulpitu, a ja będę obok.";

export function TutorProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([{ id: 0, from: "tutor", text: greeting }]);
  const [state, setState] = useState<AvatarState>("idle");
  const [isOpen, setOpen] = useState(false);
  const turn = useRef(0);
  const nextId = useRef(1);

  const send = useCallback((text: string) => {
    const clean = text.trim();
    if (!clean) return;
    setMessages((m) => [...m, { id: nextId.current++, from: "student", text: clean }]);
    setState("thinking");

    const reply = scripted[turn.current] ?? fallback;
    turn.current += 1;

    window.setTimeout(() => {
      setState("talking");
      setMessages((m) => [...m, { id: nextId.current++, from: "tutor", text: reply }]);
      window.setTimeout(() => setState("idle"), Math.min(2400, reply.length * 22));
    }, 900);
  }, []);

  const value = useMemo<TutorValue>(
    () => ({
      messages,
      state,
      isOpen,
      open: () => setOpen(true),
      close: () => setOpen(false),
      send,
      suggestions:
        messages.length <= 1
          ? ["Po słowach łączących?", "Nie wiem, podpowiedz", "Pokaż mi przykład"]
          : ["Spróbuję przeredagować", "Daj wskazówkę", "Gotowa"],
    }),
    [messages, state, isOpen, send],
  );

  return <TutorContext.Provider value={value}>{children}</TutorContext.Provider>;
}

export function useTutor(): TutorValue {
  const ctx = useContext(TutorContext);
  if (!ctx) throw new Error("useTutor poza TutorProvider");
  return ctx;
}
