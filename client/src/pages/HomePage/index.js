import React, { useState } from 'react';
import GameForm from '../../components/GameForm';
import './style.css';
const HomePage = () => {
    const [isGameForm, setIsGameForm] = useState(true)

    const handleGameToggle = () => {
        setIsGameForm(!isGameForm);
    }

    return (
        <main>
            {isGameForm ? (
                <h2 className="page-title">How would you like to learn?</h2>
            ) : (
                <h2 className="page-title"></h2>
            )
            }   
            <div className="form-card">
                <GameForm 
                    isGameForm={isGameForm}
                    setIsGameForm={setIsGameForm}
                />
            </div>
        </main>
    );
}

export default HomePage;

