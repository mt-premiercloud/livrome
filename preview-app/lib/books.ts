export type Book = {
  id: string;
  title_fr: string;
  title_en: string;
  age_fr: string;
  age_en: string;
  theme_fr: string;
  theme_en: string;
  tag_fr: string;
  tag_en: string;
  pair: [string, string];
};

export const BOOKS: Book[] = [
  { id: "leo-stars", title_fr: "Les étoiles de Léo", title_en: "Léo and the Stars", age_fr: "3–6 ans", age_en: "Ages 3–6", theme_fr: "Coucher", theme_en: "Bedtime", tag_fr: "Un conte pour s'endormir sans peur.", tag_en: "A tale for falling asleep without fear.", pair: ["#5B2A6F", "#F4B942"] },
  { id: "forest", title_fr: "La forêt qui chuchote", title_en: "The Whispering Forest", age_fr: "4–7 ans", age_en: "Ages 4–7", theme_fr: "Aventure", theme_en: "Adventure", tag_fr: "Un voyage chez les créatures du bois.", tag_en: "A journey among the creatures of the wood.", pair: ["#6B9072", "#FFF8EC"] },
  { id: "ocean", title_fr: "Sous la grande vague", title_en: "Under the Great Wave", age_fr: "5–8 ans", age_en: "Ages 5–8", theme_fr: "Animaux", theme_en: "Animals", tag_fr: "Une amitié au fond de l'océan.", tag_en: "A friendship at the bottom of the sea.", pair: ["#2E5E7E", "#E8B4B8"] },
  { id: "balloon", title_fr: "Le ballon rouge", title_en: "The Red Balloon", age_fr: "3–5 ans", age_en: "Ages 3–5", theme_fr: "Émotions", theme_en: "Emotions", tag_fr: "Apprendre à lâcher prise, avec douceur.", tag_en: "Learning to let go, gently.", pair: ["#C44536", "#FFF8EC"] },
  { id: "lantern", title_fr: "La lanterne d'hiver", title_en: "The Winter Lantern", age_fr: "5–8 ans", age_en: "Ages 5–8", theme_fr: "Courage", theme_en: "Courage", tag_fr: "Un village, une lumière, un héros.", tag_en: "A village, a light, a hero.", pair: ["#3F1C4F", "#F4B942"] },
  { id: "garden", title_fr: "Le jardin de grand-maman", title_en: "Grandma's Garden", age_fr: "4–7 ans", age_en: "Ages 4–7", theme_fr: "Famille", theme_en: "Family", tag_fr: "Les saisons, la mémoire, et les confitures.", tag_en: "Seasons, memory, and jam jars.", pair: ["#8FB996", "#F5ECD9"] },
  { id: "letters", title_fr: "L'alphabet volant", title_en: "The Flying Alphabet", age_fr: "4–6 ans", age_en: "Ages 4–6", theme_fr: "Apprentissage", theme_en: "Learning", tag_fr: "26 lettres, 26 mini-aventures.", tag_en: "26 letters, 26 tiny adventures.", pair: ["#F4B942", "#3F1C4F"] },
  { id: "moon", title_fr: "La sœur de la lune", title_en: "The Moon's Sister", age_fr: "5–8 ans", age_en: "Ages 5–8", theme_fr: "Rêve", theme_en: "Dreams", tag_fr: "Une nuit, une promesse, un secret.", tag_en: "A night, a promise, a secret.", pair: ["#1E2B58", "#E8B4B8"] },
];

export function getBookById(id: string): Book | undefined {
  return BOOKS.find((b) => b.id === id);
}

export const DEFAULT_BOOK_ID = "leo-stars";
