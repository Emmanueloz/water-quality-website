"use server";
import { QuestionRecoverUser } from "@/domain/models/QuestionRecover";
import { QuestionRecoverRepositoryImpl } from "@/infrastructure/repositories/QuestionRecoverRepositoryImpl";

const questionRecoverRepository = new QuestionRecoverRepositoryImpl();

export async function getIdUser(user: string) {
  return await questionRecoverRepository.getIdUser(user);
}

export async function getQuestionRecoverUserByUser(user: string) {
  const id = await questionRecoverRepository.getIdUser(user);

  if (!id) {
    return [];
  }

  return await questionRecoverRepository.getQuestionRecoverUserById(id);
}

export async function getQuestionRecoverUserById(
  id: number,
  showAnswer: boolean = false
) {
  return await questionRecoverRepository.getQuestionRecoverUserById(
    id,
    showAnswer
  );
}

export async function isValidAnswer(
  id: number,
  answer: string,
  idUser: number
) {
  return await questionRecoverRepository.isValidAnswer(id, answer, idUser);
}

export async function updateQuestionRecoverUser(
  idUser: number,
  questions: QuestionRecoverUser[]
) {
  return await questionRecoverRepository.update(idUser, questions);
}

export async function createQuestionRecoverUser(
  idUser: number,
  questions: QuestionRecoverUser[]
) {
  return await questionRecoverRepository.create(idUser, questions);
}
