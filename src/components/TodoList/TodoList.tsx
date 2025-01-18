import { getAllTodos } from '@/services/todoList';
import styles from './TodoList.module.css';
import { Todo } from '@/interfaces/Todo';
import { TodoListItem } from '../TodoListItem/TodoListItem';

export const TodoList = async () => {
  let todos: Todo[] = [];

  try {
    todos = await getAllTodos();
  } catch (error) {
    console.error('Error al cargar los To-Dos:', error);
  }

  return (
    <div className={styles.container}>
      {todos.length > 0 ? (
        <ul className={styles.todoList}>
          {todos.map(({ id, date, title, description, completed, author }: Todo) => (
            <TodoListItem key={id} id={id} title={title} description={description} completed={completed} date={date} author={author} />
          ))}
        </ul>
      ) : (
        <p className={styles.noTodos}>No hay To-Dos disponibles.</p>
      )}
    </div>
  );
}
