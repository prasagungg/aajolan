export interface Obstacle {
  id: number;
  x: number;
  width: number;
  height: number;
  y: number; // Posisi vertikal (0 = tanah, >0 = melayang)
  type: "cactus" | "text"; // Tipe rintangan
  text?: string; // Teks untuk tipe 'text'
}
