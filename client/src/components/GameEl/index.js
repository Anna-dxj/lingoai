import React, {useState} from 'react';
import { Row, Col, Button, ConfigProvider } from 'antd';
import ChatInterfaceEl from '../ChatInterfaceEl'
import './style.css'

const GameEl = () => {
    const [setMed, useSetMed] = useState(18);

    const startTimer = () => {
        //Add timer logic
        // useSetMed(24);
    }
    return (
        <div>
            <Row align="middle" justify="space-between">
                <Col sm={24} md={18}>
                    <div className='instructions'>
                        <h3 className="rules-title">Rules of the game</h3>
                        <ul>
                            <li><span className="list-item-main">Starting</span> - Submit a word in Spanish to begin the game</li>
                            <li><span className="list-item-main">Validity</span> - Each word must be a valid dictionary word</li>
                            <li><span className="list-item-main">Chaining</span> - The word played subsequently must start with the letter of hte last word. For example, if the previous word is "casa", the next word must begin wiht an "a".</li>
                            <li><span className="list-item-main">No repeating words</span> - Players cannot use a word that has already been played in the current game.</li>
                            <li><span className="list-item-main">Time limit</span> - Words must be submitted within the timelimit. Please note that checking the definition of a word will not pause the timer.</li>
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
                                onClick={startTimer}
                                className="hidden"
                            >START</Button>
                        </ConfigProvider>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default GameEl;