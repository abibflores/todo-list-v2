import { TodoList } from "@/components/TodoList/TodoList";
import styles from "./page.module.css";
import { AddTodo } from "@/components/AddTodo/AddTodo";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Todo list BA</h1>
      <AddTodo />
      <TodoList />
    </div>
  );
}
