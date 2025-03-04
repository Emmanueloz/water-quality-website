import { IMultiSessions } from "@/domain/models/MultiSessions";

export interface IMultiSessionsRepository {
  create(multiSessions: IMultiSessions): Promise<IMultiSessions>;
  getAllByUserId(userId: number): Promise<IMultiSessions[]>;
  deleteByToken(userId: number, token: string): Promise<boolean>;
  deleteByUserId(userId: number, excludeToken: string): Promise<void>;
}
