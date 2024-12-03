import { HttpError } from "wasp/server";
import {
  type GetTasks,
  type CreateTask,
  type UpdateTask,
  type DeleteTasks,
} from "wasp/server/operations";
import { type Task } from "wasp/entities";

//Using TypeScript's new 'satisfies' keyword, it will infer the types of the arguments and return value
export const getTasks = ((_args, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  return context.entities.Task.findMany({
    where: { user: { id: context.user.id } },
    orderBy: { id: "asc" },
  });
}) satisfies GetTasks<void, Task[]>;

type CreateArgs = Pick<Task, "description">;

export const createTask: CreateTask<CreateArgs, Task> = async (
  { description },
  context
) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  return context.entities.Task.create({
    data: {
      description,
      user: { connect: { id: context.user.id } },
    },
  });
};

type UpdateArgs = Pick<Task, "id" | "isDone">;

export const updateTask: UpdateTask<UpdateArgs> = async (
  { id, isDone },
  context
) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  return context.entities.Task.update({
    where: {
      id,
    },
    data: { isDone },
  });
};

export const deleteTasks: DeleteTasks<Task["id"][]> = async (
  idsToDelete,
  context
) => {
  return context.entities.Task.deleteMany({
    where: {
      id: {
        in: idsToDelete,
      },
    },
  });
};
