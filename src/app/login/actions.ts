"use server";
import { QuestionRecoverUser } from "@/domain/models/QuestionRecover";
import { QuestionRecoverRepositoryImpl } from "@/infrastructure/repositories/QuestionRecoverRepositoryImpl";

const questionRecoverRepository = new QuestionRecoverRepositoryImpl();

export async function getIdUser(user: string) {
  return await questionRecoverRepository.getIdUser(user);  
}

export async function getQuestionRecoverUserByUser(user: string) {

  const id =  await questionRecoverRepository.getIdUser(user); 

  if (!id) {
    return null;
  }
  
  return await questionRecoverRepository.getQuestionRecoverUserById(id);
}

export async function isValidAnswer(answer: string, idUser: number) {
  return await questionRecoverRepository.isValidAnswer(answer, idUser);
}

export async function  updateQuestionRecoverUser(questionRecoverUser: QuestionRecoverUser) {
  return await questionRecoverRepository.update(questionRecoverUser);
}