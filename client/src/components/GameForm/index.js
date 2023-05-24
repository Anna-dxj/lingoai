import React from 'react';
import {Button, Form, Select, Space, ConfigProvider} from 'antd'
import GameEl from '../GameEl'
import ConvoEl from '../ConvoEl'
import './style.css'


const GameForm = ( {isGameForm, setIsGameForm} ) => {
    const handleWordChain = () => {
        setIsGameForm(!isGameForm);
    }

    const handleConvo = () => {
        setIsGameForm(!isGameForm);
    }

    return (
        <div>
            {isGameForm ? (
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
                    </ConfigProvider>
                </div>
            ) : (
                <GameEl /> ||
                <ConvoEl />
            )}
        </div>
    );
}
// Commented out potentially irrelevant code below, but keeping for reference

//     const [formState, setFormState] = useState({ language: '', topic: '' });
  
//     // update state based on form input changes
//     const handleChange = (event) => {
//       const { language, value } = event.target;
  
//       setFormState({
//         ...formState,
//         [language]: value,
//       });
//     };
  
    // submit form
    // const handleFormSubmit = async () => {
    // // Doesn't take event
    //   try {
    //     const { data } = await login({
    //         variables: { 
    //             ...formState
    //         },
    //     });
  
    //     Auth.login(data.login.token);
    //   } catch (e) {
    //     console.error(e);
    //   }
  
    //   // clear form values
    //   setFormState({
    //     language: '',
    //     topic: '',
    //   });
    // };
export default GameForm
