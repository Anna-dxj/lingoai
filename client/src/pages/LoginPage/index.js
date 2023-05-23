import React, { useState } from 'react';
import LoginForm from '../../components/LoginForm'
import SignupForm from '../../components/SignUpForm'
import './style.css'

const LoginPage = () => {
    const [isLoginForm, setIsLoginForm] = useState(true)
    
    const handleFormToggle = () => {
        setIsLoginForm(!isLoginForm);
    }

    return (
        <main className='bg-color'>
            {isLoginForm ? (
                <h2 className="page-title">Login</h2>
            ) : (
                <h2 className="page-title">Signup</h2>
            )
            }
            <div className="form-card">
                {isLoginForm ? (
                    <div>
                        <LoginForm />
                        <p>
                            Don't have an account? 
                            <button className="signup-btn" onClick={handleFormToggle}>
                                Signup here!
                            </button>
                        </p>
                    </div>
                ): (
                    <div>
                        <SignupForm />
                        <p>
                            Already have an account? 
                            <button className="signup-btn" onClick={handleFormToggle}>
                                Login here!
                            </button>
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
}

export default LoginPage
