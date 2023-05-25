import React, {useState} from 'react';
import {Button, Form, Select, Space, ConfigProvider, Row, Col} from 'antd'
import GameEl from '../GameEl'
import ConvoEl from '../ConvoEl'
import './style.css'


const GameForm = ( {isGameForm, setIsGameForm} ) => {
    const [showWordChain, setShowWordChain] = useState(false);
    const [showConvo, setShowConvo] = useState(false);
    const handleWordChain = () => {
        setShowWordChain(!showWordChain)
        setIsGameForm(!isGameForm);
    }

    const handleConvo = () => {
        setShowConvo(!showConvo)
        setIsGameForm(!isGameForm);
    }

    // const handleChange = (value) => {
    //     setLanguage(value);
    // }

    return (
        <div>
            {isGameForm ? (
                <Row>
                    <Col sm={24}>
                        <div className="form-card">
                            <ConfigProvider theme={{
                                token: {
                                    colorPrimary: '#4da167'
                                },
                            }}>
                                <Form
                                    className="login-form"
                                    layout="vertical"
                                    // onFinish={handleFormSubmit}
                                >
                                    {/* <Form.Item
                                        label="Language"
                                        name="language"
                                    >
                                        <Space wrap>
                                            <Select 
                                            className="card-text"
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
                                            // value={formState.language}
                                            // onChange={handleChange}
                                            />
                                        </Space>
                                    </Form.Item> */}
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
                                    <Row>
                                        <Col sm={24} md={11}>
                                            <Form.Item>
                                                <Button type="primary" className="login-form-button" htmlType='submit' onClick={handleWordChain}>
                                                    Play WordChain
                                                </Button>
                                            </Form.Item>
                                        </Col>
                                        <Col sm={24} md={{span: 11, offset: 2}}>
                                            <Form.Item>
                                                <Button type="primary" className="login-form-button" htmlType='submit' onClick={handleConvo}>
                                                    Practice Conversation
                                                </Button>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form>
                            </ConfigProvider>
                        </div>
                    </Col>
                </Row>
            ) : (
                <div>
                    {showWordChain && (
                        <div>
                            <Row justify="space-between" align="center">
                                <h2 className="page-title">Word Chain</h2>
                                <ConfigProvider theme={{
                                    token: {
                                        colorPrimary: '#4da167',
                                    },
                                }}>
                                    <Button className="btn" onClick={handleWordChain}>Return to Menu</Button>
                                </ConfigProvider>
                            </Row>
                            <GameEl />
                        </div>
                    )}
                    {showConvo && (
                        <div>
                            <Row justify="space-between" align="center">
                                <h2 className="page-title">Practice Convo</h2>
                                <ConfigProvider theme={{
                                    token: {
                                        colorPrimary: '#4da167',
                                    },
                                }}>
                                    <Button className="btn" onClick={handleConvo}>Return to Menu</Button>
                                </ConfigProvider>
                            </Row>
                            <ConvoEl />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default GameForm
