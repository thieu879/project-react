export interface Account {
  id: number;
  name: string;
  numberPhone: string;
  email: string;
  password: string;
  image: string;
  loginStatus:boolean,
  status: boolean;
  role: RoleType;
}

export enum RoleType {
  User = 1,
  Admin = 0,
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface UserAnswer{
    testId(testId: any): import("react").ReactNode;
    id: number,
    userId: number,
    examId: number,
    score: string
}
export interface Course {
    id: number,
    nameCourse: string
}

export interface Class {
    id: number,
    courseId: number,
    nameClass: string
}

export interface Subject {
    id: number,
    classId: number,
    nameSubject: string
}

export interface Test {
    id: number,
    subjectId: number,
    nameTest: string
}

export interface Question {
    option: any;
    id: number,
    testId: number,
    question: string,
    options: string[],
    answer: string
}
