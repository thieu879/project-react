export interface User{
    id: number,
    nameUser: string,
    birthday: string,
    numberPhone: string,
    email: string,
    password:string,
    imageUser: string,
    statusUser: boolean,
    role:number
}
export interface Admin{
    id: number,
    nameAdmin: string,
    birthday: string,
    numberPhone: string,
    email: string,
    password:string,
    imageAdmin: string,
    statusAdmin: boolean,
    role:number
}
export interface Course{
    id: number,
    nameCourse: number
}
export interface Class{
    id: number,
    courseId: number,
    nameClass: number
}
export interface Subject{
    id: number,
    classId: number,
    nameSubject: string
}
export interface Test{
    id: number,
    subjectId: number,
    nameTest: string
}
export interface Question{
    id: number,
    testId: number,
    question: string,
    opction: string[],
    indexOpction: number
}