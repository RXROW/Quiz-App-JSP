export interface Quiz {
    title: string;
    date: string;
    time: string;
    code: string;
    studentCount: number;
    isActive: boolean;
}

export interface Student {
    name: string;
    groupName: string;
    avgScore: number;
    apiData: StudentApiResponse;
}

// Define API response interfaces
export interface QuizApiResponse {
    _id: string;
    code: string;
    title: string;
    description: string;
    status: string;
    instructor: string;
    group: string;
    questions_number: number;
    questions: any[];
    schadule: string;
    duration: number;
    score_per_question: number;
    type: string;
    difficulty: string;
    updatedAt: string;
    createdAt: string;
    participants: number;
}

export interface StudentApiResponse {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    status: string;
    role: string;
    group: {
        _id: string;
        name: string;
        status: string;
        instructor: string;
        students: string[];
        max_students: number;
        updatedAt: string;
        createdAt: string;
    };
    avg_score: number;
}
  