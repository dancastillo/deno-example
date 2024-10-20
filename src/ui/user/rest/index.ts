import type { FastifyInstance, FastifyRequest } from "npm:fastify@5.0.0";
import { UserService } from "../../../core/services/user/user.service.ts";

type FindOneByIdRequest = FastifyRequest<{ Params: { id: string } }>;

type CreateOneRequest = FastifyRequest<{ Body: { name: string } }>;

export default function (fastify: FastifyInstance) {
  const userService = new UserService();
  fastify.get("/users", async () => {
    const users = await userService.findAll();
    return {
      users,
    };
  });

  fastify.get("/user/:id", async (request: FindOneByIdRequest) => {
    const { id } = request.params;
    const user = await userService.findOneById(id);
    return {
      user,
    };
  });

  fastify.post("/user", async (request: CreateOneRequest) => {
    const { name } = request.body;
    const user = await userService.createOne(name);
    return {
      user,
    };
  });
}
