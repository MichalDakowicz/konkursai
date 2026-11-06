// Logowanie na niby, dopóki nie ma backendu. Pamięć przeglądarki bywa zablokowana,
// więc trzymamy też flagę w pamięci, żeby logowanie działało przynajmniej do przeładowania.
const KEY = "nazwa.session";
let inMemory = false;

export function isLoggedIn(): boolean {
  if (inMemory) return true;
  try {
    return localStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

export function login(): void {
  inMemory = true;
  try {
    localStorage.setItem(KEY, "1");
  } catch {
    // zostaje flaga w pamięci
  }
}

export function logout(): void {
  inMemory = false;
  try {
    localStorage.removeItem(KEY);
  } catch {
    // nic do zrobienia
  }
}
