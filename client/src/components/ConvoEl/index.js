import React, {useState, useEffect, useRef} from 'react';
import { Row, Col, Form, Input, Button, Space, ConfigProvider } from 'antd';
import {SendOutlined} from '@ant-design/icons'
import {useMutation} from '@apollo/client';
import { SEND_USER_CHAT } from '../../utils/mutations';
import ResponseEl from '../ResponseEl'
import './style.css'

const ConvoEl = () => {
    const [formState, setFormState] = useState({input: ''});
    const [message, setMessage] = useState([])
    const [showCard , setShowCard] = useState(false);
    const [sendUserChat, {error}] = useMutation(SEND_USER_CHAT)
    // const cardRef = useRef(null)

    // useEffect(() => {
    //     scrollToBottom();
    // }, [message])

    // const scrollToBottom = () => {
    //     window.scrollTo(0, document.body.scrollHeight)
    // }

    const {TextArea} = Input;

    const handleChange = (event) => {
        const {name, value} = event.target; 

        setFormState({
            ...formState,
            [name]: value,
        })
    }
    const handleFormSubmit = async () => {
        if (!formState.input) {
            return;
        }
        const userInput = formState.input.trimEnd();
        try {
            const {data} = await sendUserChat({
                variables: {chat: userInput}
            });

            console.log(data)

            if (data) {
                const newMessage = {
                    id: message.length + 1,
                    content: userInput,
                    sender: 'user'
                }

                const newAiMessage = {
                    id: message.length+2,
                    content: data.sendUserChat.message,
                    sender: 'ai'
                }
                console.log(newMessage)
                console.log([...message, newMessage, newAiMessage])
                setMessage([...message, newMessage, newAiMessage])
                setShowCard(true);
                setFormState({input: ''})

            }
            
        } catch (err) {
            console.error(err)
        }
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
            <div className={showCard ? 'chat-card' : ''}>
                <div>
                    {message.map(({id, content, sender})=>{
                        return (<ResponseEl id={id} content={content} sender={sender} convo='convo'/>)
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
                                <TextArea 
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

export default ConvoEl;