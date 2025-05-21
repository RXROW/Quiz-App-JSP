export interface QuizData {
  title: string;
  description: string;
  group: string;
  questions_number: number;
  difficulty: "easy" | "medium" | "hard";
  type: "FE" | "BE" | "DO";
  schadule: string;
  duration: number;
  score_per_question: number;
}

export interface Group {
  _id: any;
  name: string;
}

export interface Quiz {
  _id: string;
  title: string;
  description: string;
  schadule?: string;
  duration: number;
  difficulty: string;
  type: string;
  code: number;
}
