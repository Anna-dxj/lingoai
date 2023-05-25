import React, {useState} from 'react';
import {Button, Form, Select, Space, ConfigProvider, Row, Col, Modal} from 'antd'
import GameEl from '../GameEl'
import ConvoEl from '../ConvoEl'
import './style.css'


const GameForm = ( {isGameForm, setIsGameForm} ) => {
    const [showWordChain, setShowWordChain] = useState(false);
    const [showConvo, setShowConvo] = useState(false);
    const [showForm, setShowForm] = useState(true);
    const [pauseGame, setPauseGame] = useState(false);
    const [activeTimer, setActiveTimer] = useState(false);
    const [showInstructions, setShowInstructions] = useState(true);
    const [showReplay, setShowReplay] = useState(false)
    const [clearChat, setClearChat] = useState(false);
    const handleWordChain = () => {
        setShowWordChain(!showWordChain)
        setIsGameForm(!isGameForm);
    }

    const handleConvo = () => {
        setShowConvo(!showConvo)
        setIsGameForm(!isGameForm);
    }

    
    const handleNewPrompt = () => {
        setShowForm(!showForm);
    }

    const handleClear = () => {
        setClearChat(!clearChat);
    }

    const handleHideInstructions = () => {
        setShowInstructions(!showInstructions)
        console.log(showInstructions)
    }

    const handlePause = () => {
        setPauseGame(true);
        setActiveTimer(false);
        setShowReplay(false)
    }

    const handleQuit = () => {
        setPauseGame(false);
        setShowReplay(true);
    }

    const handleResume = () => {
        setPauseGame(false);
        setActiveTimer(true);
        setShowReplay(false);
    }


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
                                >
                                    {/* Future Dev: add language option
                                    <Form.Item
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
                                    <div className='btn-menu-div'>
                                        <Row>
                                            <Space size={7}>
                                                <Button onClick={handleWordChain}>Return to Menu</Button>
                                                {activeTimer && (
                                                    <Button onClick={handlePause}>Pause</Button>
                                                )}
                                                <Button onClick={handleHideInstructions}>
                                                    {showInstructions ? 'Hide Instructions' : 'Show Instructions'}
                                                </Button>
                                            </Space>
                                        </Row>
                                    </div>
                                </ConfigProvider>
                            </Row>
                            <GameEl setActiveTimer={setActiveTimer} activeTimer={activeTimer} showReplay={showReplay} setShowReplay={setShowReplay} showInstructions={showInstructions} setShowInstructions={setShowInstructions}/>
                            <ConfigProvider theme = {{
                                token: {
                                    colorPrimary: '#3BC14A',
                                }
                            }}>
                                <Modal
                                title="Game Paused"
                                closable={false}
                                open={pauseGame}
                                centered
                                okText="Quit Game"
                                onOk={handleQuit}
                                cancelText="Resume Game"
                                onCancel={handleResume}
                                >
                                    Your game is paused with time remaining. 
                                    Do you want to quit game?
                                </Modal>
                            </ConfigProvider>
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
                                    <div className='btn-menu-div'>
                                        <Row>
                                            <Space size={7}>
                                                <Button onClick={handleConvo}>Return to Menu</Button>
                                                <Button onClick={handleNewPrompt}>New Prompt</Button>
                                                <Button onClick={handleClear}>Clear Convo</Button>
                                            </Space>
                                        </Row>
                                    </div>
                                </ConfigProvider>
                            </Row>
                            <ConvoEl showForm={showForm} setShowForm={setShowForm} clearChat={clearChat} setClearChat={setClearChat}/>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default GameForm
