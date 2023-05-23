import React, {useState, useEffect} from 'react';
import { Row, Col, Button, ConfigProvider } from 'antd';
import ChatInterfaceEl from '../ChatInterfaceEl'
import './style.css'

const GameEl = () => {
    const [expand, setExpand] = useState(false);
    const [hideBtn, setHideBtn] = useState(false);
    const [remainingTime, setRemainingTime] = useState(300);
    const [activeTimer, setActiveTimer] = useState(false);

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
    }, [activeTimer])

    const formatTimer = time => {
        const minutes = Math.floor(time/60);
        const seconds = time % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }

    const handleStartTimer = () => {
        setActiveTimer(true);
        setExpand(true);
        setHideBtn(true);
    }
    return (
        <div>
            <Row align="middle" justify="space-between">
                <Col sm={24} md={expand ? 24 : 18}>
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
                <Col sm={24} md={6}>
                    <Row justify="center">
                        <ConfigProvider theme={{
                            token: {
                                colorPrimary: '#3BC14A',
                            },
                        }}>
                            <Button 
                                size="large" 
                                type="primary"
                                onClick={handleStartTimer}
                                className={hideBtn ? 'hidden' : ''}
                            >
                                START
                            </Button>
                        </ConfigProvider>
                    </Row>
                </Col>
            </Row>
            <Row justify="center">
                <div className="timer-div">
                    <h4>Remaining Time: <span>{formatTimer(remainingTime)}</span></h4>
                </div>
            </Row>
        </div>
    )
}

export default GameEl;