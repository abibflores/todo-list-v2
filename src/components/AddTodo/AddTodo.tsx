'use client';

import { useState } from 'react';
import styles from './AddTodo.module.css';
import { postAddTodo } from '@/app/actions';


export const AddTodo = () =>{
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !author) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await postAddTodo(title, description, author);
      setTitle('');
      setDescription('');
      setAuthor('');
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Hubo un error al añadir el To-Do.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Añadir Nuevo To-Do</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        {error && <p className={styles.error}>{error}</p>}

        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
        />

        <textarea
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.textarea}
        ></textarea>

        <input
          type="text"
          placeholder="Autor"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className={styles.input}
        />

        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? 'Añadiendo...' : 'Añadir To-Do'}
        </button>
      </form>
    </div>
  );
}
