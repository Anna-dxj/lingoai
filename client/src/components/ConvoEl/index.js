import React, {useState, useEffect} from 'react';
import { Row, Col, Form, Input, Button, Space, ConfigProvider, Modal, Select } from 'antd';
import {SendOutlined} from '@ant-design/icons'
import {useMutation} from '@apollo/client';
import { SEND_USER_CHAT } from '../../utils/mutations';
import ResponseEl from '../ResponseEl'
import './style.css'

const ConvoEl = ({showForm, setShowForm, clearChat, setClearChat}) => {
    const [formState, setFormState] = useState({input: ''});
    const [message, setMessage] = useState([])
    const [showCard , setShowCard] = useState(false);
    const [sendUserChat, {error}] = useMutation(SEND_USER_CHAT);
    const [showPromptCard, setShowPromptCard] = useState(false);
    const [promptTxt, setPromptTxt] = useState('')
    const [promptFormState, setShowPromptFormState] = useState([])

    const {TextArea} = Input;

    useEffect(() => {
        if (clearChat) {
            setMessage([]);
            setFormState({input: ''})
            setClearChat(!clearChat)
            setShowCard(false);
        }
    }, [clearChat, setClearChat])

    const handlePromptChange = (value) => {
        setShowPromptFormState({
            ...promptFormState,
            input: value,
        })
    }

    const handlePromptSubmission = () => {
        if (promptFormState.input === 'travel') {
            setPromptTxt('A dónde quieres viajar?')
        } else if (promptFormState.input === 'cooking') {
            setPromptTxt('Sabes cocinar?')
        } else if (promptFormState.input === 'sports') {
            setPromptTxt('Cuál es tu deporte favorito?')
        } else if (promptFormState.input === 'shopping') {
            setPromptTxt('Te gusta ir de compras o comprar cosas en línea?')
        } else if (promptFormState.input === 'family') {
            setPromptTxt('Tienes hermanos?')
        } else if (promptFormState.input === 'free') {
            setPromptTxt('Free chat')
        } else {
            return;
        }
        setShowPromptCard(true);
        setShowForm(!showForm);
        setMessage([])
        setShowCard(false)
    }

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
                            <p className={showPromptCard ? 'hidden' : ''}>Please select a prompt</p>
                            <p className={showPromptCard ? '' : 'hidden'}>{promptTxt}</p>
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
                <ConfigProvider theme = {{
                        token: {
                            colorPrimary: '#3BC14A',
                        }
                    }}>
                        <Modal
                            title="Choose a prompt!"
                            open={showForm}
                            centered
                            closable={false}
                            footer={[
                            ]}
                        >
                            <Form>
                                <Form.Item
                                    name="input"
                                    // label="select"
                                    rules={[{required: true, message: 'Please select a prompt!'}]}
                                >
                                    <Select 
                                        placeholder="Please select a prompt"
                                        value={formState.input}
                                        onChange={handlePromptChange}
                                        options={[
                                            {
                                                name: 'travel',
                                                value: 'travel',
                                                label: 'Travel'
                                            },
                                            {
                                                name: 'cooking',
                                                value: 'cooking',
                                                label: 'Cooking'
                                            },
                                            {
                                                name: 'sports',
                                                value: 'sports',
                                                label: 'Sports'
                                            },
                                            {
                                                name: 'shopping', 
                                                value: 'shopping',
                                                label: 'Shopping'
                                            },
                                            {
                                                name: 'family',
                                                value: 'family',
                                                label: 'Family'
                                            },
                                            {
                                                name: 'free-chat',
                                                value: 'free',
                                                label: 'Free chat'
                                            },
                                        ]}
                                    >
                                    </Select>
                                </Form.Item>
                                <Row justify='center'>
                                    <Button className="form-btn" onClick={handlePromptSubmission}>Let's go</Button>
                                </Row>
                            </Form>
                        </Modal>
                    </ConfigProvider>
            </div>
        </div>
    )
}

export default ConvoEl;