import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);  // Lista zadań
    const [loading, setLoading] = useState(true);  // Status ładowania
    const [error, setError] = useState(null);  // Obsługa błędów

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/')
            .then(response => {
                setTasks(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Błąd przy pobieraniu danych:', error);
                setError('Nie udało się pobrać danych.');
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Ładowanie...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Lista zadań</h1>
            {tasks.length === 0 ? (
                <p>Brak zadań do wyświetlenia.</p>
            ) : (
                <ul>
                    {tasks.map(task => (
                        <li key={task.id}>
                            {task.title} - {task.completed ? 'Zakończone' : 'W toku'}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TaskList;
