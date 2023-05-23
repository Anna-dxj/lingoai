import React, {useState, useEffect, useRef} from 'react';
import { Row, Col, Form, Input, Button, Space, ConfigProvider } from 'antd';
import {SendOutlined} from '@ant-design/icons'
import UserResponse from '../UserResponse'
// import AiResponse from '../AiResponse'
import './style.css'

const GameEl = () => {
    const [formState, setFormState] = useState({input: ''});
    const [message, setMessage] = useState([])
    const [remainingTime, setRemainingTime] = useState(301);
    const [activeTimer, setActiveTimer] = useState(false);
    const [showCard , setShowCard] = useState(false);
    const cardRef = useRef(null)

    useEffect(() => {
        scrollToBottom();
    }, [message])

    useEffect(() => {
        let timer;
        if (activeTimer) {
            timer = setInterval(()=>{
                setRemainingTime(prevTime => prevTime-1);
            }, 1000);
        }

        if (remainingTime===0) {
            clearInterval(timer);
        }

        return () => clearInterval(timer)
    }, [activeTimer, remainingTime])

    const scrollToBottom = () => {
        window.scrollTo(0, document.body.scrollHeight)
    }
    const formatTimer = time => {
        const minutes = Math.floor(time/60);
        const seconds = time % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }

    const handleChange = (event) => {
        const {name, value} = event.target; 

        setFormState({
            ...formState,
            [name]: value,
        })
    }
    const handleFormSubmit = () => {
        if (!formState.input) {
            return;
        }
        const userInput = formState.input.trimEnd();

        const newMessage = {
            id: message.length + 1,
            content: userInput,
        }

        setMessage([...message, newMessage])
        // LOGIC TODO:
        // 1. send this input to api
        console.log([...message, newMessage])
        setActiveTimer(true);
        setShowCard(true);
        setFormState({input: ''})
    }
    return (
        <div>
            <Row align="middle" justify="space-between">
                <Col sm={24}>
                    <div className='instructions'>
                        <h3 className="rules-title">Rules of the game</h3>
                        <ul>
                            <li><span className="list-item-main">Starting</span> - Submit a word in Spanish to begin the game</li>
                            <li><span className="list-item-main">Validity</span> - Each word must be a valid dictionary word</li>
                            <li><span className="list-item-main">Chaining</span> - The word played subsequently must start with the letter of hte last word. For example, if the previous word is "casa", the next word must begin wiht an "a".</li>
                            <li><span className="list-item-main">No repeating words</span> - Players cannot use a word that has already been played in the current game.</li>
                            <li><span className="list-item-main">Time limit</span> - The game will last for 5 minutes. Please note that checking the definition of a word will not pause the timer.</li>
                            <li><span className="list-item-main">Winning</span> - </li>
                        </ul>
                    </div>
                </Col>
            </Row>
            <Row justify="center">
                <div className="timer-div">
                    <h4>Remaining Time: {
                            remainingTime <= 300 ? (
                                <span className={remainingTime <= 5 ? 'red' : ''}>{formatTimer(remainingTime)}</span>
                                ) : (
                                <span>5:00</span>
                            )
                        }
                    </h4>
                </div>
            </Row>
            <div className={showCard ? 'game-card' : 'hidden'} ref={cardRef}>
                <div>
                    {message.map(({id, content})=>{
                        return (<UserResponse id={id} content={content}/>)
                    })}
                </div>
                <div>
                    
                </div>
            </div>
            <div className="form-styles">
                <ConfigProvider>
                    <Form onFinish={handleFormSubmit}>
                        <Form.Item>
                            <Space.Compact className='form-input'>
                                <Input 
                                    type="text"
                                    name="input"
                                    value={formState.input}
                                    onChange={handleChange}
                                />
                                <Button htmlType='submit'><SendOutlined/></Button>
                            </Space.Compact>
                        </Form.Item>
                    </Form>
                </ConfigProvider>
            </div>
        </div>
    )
}

export default GameEl;