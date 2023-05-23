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
    const [showCard , setShowCard] = useState(false);
    const cardRef = useRef(null)

    useEffect(() => {
        scrollToBottom();
    }, [message])

    const scrollToBottom = () => {
        window.scrollTo(0, document.body.scrollHeight)
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
        setShowCard(true);
        setFormState({input: ''})
    }
    return (
        <div>
            <Row align="middle" justify="space-between">
                <Col sm={24}>
                    <div className='instructions'>
                        <h3 className="rules-title">Prompt</h3>
                        <div className='prompt'>
                            Amir's hard-coded prompt
                        </div>
                    </div>
                </Col>
            </Row>
            <div className={showCard ? 'chat-card' : ''} ref={cardRef}>
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