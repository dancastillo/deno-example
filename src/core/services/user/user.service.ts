import { randomUUID } from "node:crypto";
import { UserRepository } from "../../../infrastucture/database/postgres/repositories/user.repository.ts";

export class UserService {
  private readonly db: UserRepository;

  constructor() {
    this.db = new UserRepository();
  }

  public async createOne(name: string) {
    const id = randomUUID();
    const user = await this.db.createOne({ id, name });
    return user;
  }

  public async findAll() {
    const users = await this.db.findAll();
    return users;
  }

  public async findOneById(id: string) {
    const user = await this.db.findOneById(id);
    return user;
  }
}
