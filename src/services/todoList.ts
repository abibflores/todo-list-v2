import { Todo } from "@/interfaces/Todo";

const API_URL = process.env.API_ROOT;
const PATH = "/todo-list-banco-azteca-demo";

export const getAllTodos = async (): Promise<Todo[]> => {
  const response = await fetch(`${API_URL}${PATH}`);

  if (!response.ok) {
    throw new Error("Error al obtener los To-Dos.");
  }

  const data = await response.json();

  return data.body?.items || [];
};
