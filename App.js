import React from 'react';
import TaskList from './components/TaskList';  // Import komponentu TaskList

// Główny komponent aplikacji
function App() {
    return (
        <div className="App">
            <TaskList />  {/* Wyświetla komponent TaskList */}
        </div>
    );
}

export default App;
