import { Nullable } from "../../../../common/types/index.ts";
import { postgresClient } from "../connection.ts";
import { UserModel } from "../models/user.model.ts";

export class UserRepository {
  constructor() {
  }

  public async findAll(): Promise<UserModel[]> {
    const users = await postgresClient().query("SELECT * FROM users");

    return users.rows as UserModel[];
  }

  public async findOneById(id: string): Promise<Nullable<UserModel>> {
    const user = await postgresClient().query(
      "SELECT * FROM users WHERE id = $1",
      [id],
    );
    if (user.rowCount === 0) {
      return null;
    }
    return user.rows[0] as UserModel;
  }

  public async createOne(user: UserModel): Promise<UserModel> {
    const { id, name } = user;
    await postgresClient().query(
      "INSERT INTO users (id, name) VALUES ($1, $2)",
      [id, name],
    );

    return user;
  }
}
