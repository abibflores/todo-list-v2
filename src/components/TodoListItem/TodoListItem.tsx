'use client'
import { Todo } from "@/interfaces/Todo"
import styles from "./TodoListItem.module.css"
import { useMemo, useState } from "react";
import { deleteTodo, patchUpdateTodoCompleted } from "@/app/actions";
import { Loader } from "../Loader/Loader";

export const TodoListItem = ({ id, date, title, description, completed, author }: Todo) => {
    const [loading, setLoading] = useState(false);
    
    const dateFormatted = useMemo(() => new Date(Number(date)).toLocaleDateString(), [date]);

    const handleUpdateTodo = async (id: string, date: string, completed: boolean) => {
        setLoading(true);
        try {
            await patchUpdateTodoCompleted(id, date, completed);
            setLoading(false);
        } catch (error) {
            console.error('Error al actualizar el To-Do:', error);
            setLoading(false);
        }
    }

    const handleDeleteTodo = async (id: string, date: string) => {
        setLoading(true);
        try {
            await deleteTodo(id, date);
            setLoading(false);
        } catch (error) {
            console.error('Error al eliminar el To-Do:', error);
            setLoading(false);
        }
    }

    return (
        <>
            <li key={id} className={styles.todoItem}>
                <h2 className={styles.todoTitle}>{title}</h2>
                <p className={styles.todoDescription}>{description}</p>
                <p className={styles.todoAuthor}>Autor: {author}</p>
                <p className={styles.todoDate}>Fecha: {dateFormatted}</p>
                <p className={styles.todoCompleted}>
                Estado: {completed ? 'Completado' : 'Pendiente'}
                </p>
                <button
                    className={styles.toggleButton}
                    onClick={() => handleUpdateTodo(id, date, !completed)}
                >
                    Marcar como {completed ? 'Pendiente' : 'Completado'}
                </button>
                <button
                    className={styles.deleteButton}
                    onClick={() => handleDeleteTodo(id, date)}
                >
                    Eliminar
                </button>
            </li>
            {loading && <Loader message="Actualizando..." />}
        </>
    )
}