import { IMultiSessions } from "@/domain/models/MultiSessions";

export interface IMultiSessionsRepository {
  create(multiSessions: IMultiSessions): Promise<IMultiSessions>;
  getAllByUserId(userId: number): Promise<IMultiSessions[]>;
  deleteByToken(token: string): Promise<void>;
  deleteByUserId(userId: number, excludeToken: string): Promise<void>;
}
