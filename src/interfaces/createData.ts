import { Category, Discipline, Teacher, TeacherDiscipline, Term, Test, User } from "@prisma/client";

export type CreateUser = Omit<User, "id">
export type CreateCategory = Omit<Category, "id">
export type CreateTest = Omit<Test, "id">
export type CreateTeacher = Omit<Teacher, "id">
export type CreateDiscipline = Omit<Discipline, "id">
export type CreateTeacherDiscipline = Omit<TeacherDiscipline, "id">
export type CreateTerm = Omit<Term, "id">