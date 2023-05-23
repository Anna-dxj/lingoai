import React, {useState, useEffect, useRef} from 'react';
import { Row, Col, Form, Input, Button, Space, ConfigProvider, Modal } from 'antd';
import {SendOutlined} from '@ant-design/icons'
import UserResponse from '../UserResponse'
// import AiResponse from '../AiResponse'
import './style.css'

const GameEl = () => {
    const [formState, setFormState] = useState({input: ''});
    const [message, setMessage] = useState([])
    const [remainingTime, setRemainingTime] = useState(301);
    const [activeTimer, setActiveTimer] = useState(false);
    const [showText , setShowText] = useState(true);
    const [disabledEl, setDisabledEl] = useState(false);
    const [showModal, setShowModal] = useState(false);
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
            setDisabledEl(true);
            setShowModal(true);
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
        setShowText(false);
        setFormState({input: ''})
    }
    const handleReplayGame = () => {
        setMessage([]);
        setRemainingTime(301);
        setActiveTimer(false);
        setShowText(true);
        setDisabledEl(false);
        setShowModal(false);
    }
    const handleHideModal = () => {
        setShowModal(false);
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
                            <li><span className="list-item-main">Time limit</span> - The game will last for 5 minutes and starts when you submit your first word. Please note that checking the definition of a word will not pause the timer.</li>
                            <li><span className="list-item-main">Winning</span> - </li>
                        </ul>
                    </div>
                </Col>
            </Row>
            <Row justify="center">
                <div className="">
                    {/* If time, make sticky */}
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
                </div>
            </Row>
            <div className='game-card' ref={cardRef}>
                <p className={showText ? '' : 'hidden'}>Send a word to start your game!</p>
                <div>
                    {message.map(({id, content})=>{
                        return (<UserResponse id={id} content={content}/>)
                    })}
                </div>
                <div>
                    
                </div>
            </div>
            <div className="form-styles">
                <ConfigProvider theme={{
                    token: {
                        colorPrimary: '#3BC14A',
                    }
                }}>
                    <Form onFinish={handleFormSubmit} disabled={disabledEl}>
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
            <ConfigProvider theme={{
                token: {
                    colorPrimary: '#3BC14A'
                }
            }}>
                <Modal
                    title="Play again?"
                    okText="Yes"
                    centered
                    cancelText="No"
                    open={showModal}
                    onOk={handleReplayGame}
                    onCancel={handleHideModal}
                >
                    
                </Modal>
            </ConfigProvider>
        </div>
    )
}

export default GameEl;