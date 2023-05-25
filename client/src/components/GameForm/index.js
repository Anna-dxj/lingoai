import React, { useState } from 'react';
import {Button, Form, Input, Select, Space} from 'antd'
import GameEl from '../GameEl'
import ConvoEl from '../ConvoEl'
import './style.css'


const GameForm = ( {isGameForm, setIsGameForm} ) => {
    const [language, setLanguage] = useState("Choose your language")
    const [selectedOption, setSelectedOption] = useState(null);
    
    const handleWordChain = () => {
        setSelectedOption('wordChain');
        setIsGameForm(!isGameForm);
    }

    const handleConvo = () => {
        setSelectedOption('convo');
        setIsGameForm(!isGameForm);
    }

    const handleChange = (value) => {
        setLanguage(value);
    }

    return (
        <div>
            {isGameForm ? (
                <div>
                    <Form
                        className="login-form"
                        layout="vertical"
                        // onFinish={handleFormSubmit}
                    >
                        <Form.Item
                            label="Language"
                            name="language"
                        >
                            <Space wrap>
                                <Select 
                                defaultValue="What language would you like to learn?"
                                // style={{
                                //     width: 500,
                                // }}
                                options=
                                {[
                                    {
                                        value: 'Spanish',
                                        label: 'Spanish',
                                    },
                                    {
                                        value: 'French',
                                        label: 'French',
                                        disabled: true,
                                    },
                                    {
                                        value: 'Italian',
                                        label: 'Italian',
                                        disabled: true,
                                    },
                                    ]}
                                name="language"
                                value={language}
                                onChange={handleChange}
                                />
                            </Space>
                        </Form.Item>
                        {/* Commented out to add to Practice Convo Component */}
                        {/* <Form.Item
                            label="Topic"
                            name="topic"
                        >
                            <Input 
                                type="text"
                                placeholder="What topic would you like to discuss?"
                                name="topic"
                                // value={formState.topic}
                                // onChange={handleChange}
                            />
                        </Form.Item> */}
                        <Form.Item>
                            <Button type="primary" className="login-form-button" htmlType='submit' onClick={handleWordChain}>
                                Play WordChain
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" className="login-form-button" htmlType='submit' onClick={handleConvo}>
                                Practice Conversation
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            ) : (
                <div>
                    {selectedOption === 'wordChain' ? <GameEl /> : null}
                    {selectedOption === 'convo' ? <ConvoEl /> : null}
                </div>
            )}
        </div>
    );
}

export default GameForm
