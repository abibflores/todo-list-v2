'use server'
import { Todo } from "@/interfaces/Todo";
import { revalidatePath } from "next/cache";

const API_URL = process.env.API_ROOT;
const PATH = '/todo-list-banco-azteca-demo';

export const patchUpdateTodoCompleted = async (id: string, date: string, completed: boolean): Promise<void> => {
    const response = await fetch(
    `${API_URL}${PATH}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, date, completed }),
      }
    );
  
    if (!response.ok) {
      throw new Error('Error al actualizar el estado del To-Do.');
    }

    revalidatePath("/");
  }

  export const postAddTodo = async (title: string, description: string, author: string): Promise<void> => {
    const date = Date.now();

    const newTodo: Todo = {
      id: `todo${date}`,
      date: String(date),
      author,
      completed: false,
      description,
      title,
    };

    const response = await fetch(
      `${API_URL}${PATH}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
      }
    );

    if (!response.ok) {
      throw new Error('Error al añadir el nuevo To-Do.');
    }
    revalidatePath("/");
    
  }

export const deleteTodo = async (id: string, date: string): Promise<void> => {
  const response = await fetch(
    `${API_URL}${PATH}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, date }),
    }
  );

  if (!response.ok) {
    throw new Error('Error al eliminar el To-Do.');
  }

  revalidatePath('/');
}