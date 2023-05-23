import React, { useState } from 'react';
import GameForm from '../../components/GameForm';
import './style.css';

const WrongPage = () => {
    return (
        <main>
            <h2 className="page-title">
                How would you like to learn?
            </h2>
            <div className="form-card">
                <GameForm />
            </div>
        </main>
    )
}

export default WrongPage;