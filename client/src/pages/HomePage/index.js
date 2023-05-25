import React, { useState, useEffect } from 'react';
import GameForm from '../../components/GameForm';
import './style.css';
import Auth from '../../utils/auth'
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate()
    
    const isLoggedIn = Auth.loggedIn()
    
    useEffect(() => {
        if (!isLoggedIn) {
        navigate("/login", { replace: true });
        }
    })

    const [isGameForm, setIsGameForm] = useState(true)
    
    return (
        <main>
            {isGameForm && (
                <h2 className="page-title">How would you like to learn?</h2>
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