import React, { useEffect, useState } from 'react';  // Hooki React do stanu i efektów
import axios from 'axios';  // Biblioteka do obsługi zapytań HTTP

// Komponent wyświetlający listę zadań
const TaskList = () => {
    const [tasks, setTasks] = useState([]);  // Stan przechowujący listę zadań

    // Hook useEffect - uruchamia funkcję po załadowaniu komponentu
    useEffect(() => {
        // Pobiera listę zadań z API Django
        axios.get('http://127.0.0.1:8000/api/tasks/')
            .then(response => setTasks(response.data))  // Aktualizuje stan z listą zadań
            .catch(error => console.error('Błąd przy pobieraniu danych:', error));  // Obsługuje błędy
    }, []);  // [] oznacza, że efekt uruchomi się tylko raz po zamontowaniu komponentu

    return (
        <div>
            <h1>Lista zadań</h1>
            <ul>
                {/* Iteracja po zadaniach i ich wyświetlanie */}
                {tasks.map(task => (
                    <li key={task.id}>
                        {task.title} - {task.completed ? 'Zakończone' : 'W toku'}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
