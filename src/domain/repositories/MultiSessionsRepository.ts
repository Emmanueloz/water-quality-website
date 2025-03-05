import { IMultiSessions } from "@/domain/models/MultiSessions";

export interface IMultiSessionsRepository {
  create(multiSessions: IMultiSessions): Promise<IMultiSessions>;
  getAllByUserId(userId: number): Promise<IMultiSessions[]>;
  getByToken(userId: number, token: string): Promise<IMultiSessions | null>;
  deleteByToken(userId: number, token: string): Promise<boolean>;
  deleteByUserId(userId: number, excludeToken: string): Promise<void>;
}
