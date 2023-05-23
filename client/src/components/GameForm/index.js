import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import {LockOutlined, MailOutlined} from '@ant-design/icons'
import {Button, Form, Input, Select, Space} from 'antd'

import Auth from '../../utils/auth';
import './style.css'

const GameForm = () => {
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
    
    return (
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
                        // value={formState.language}
                        // onChange={handleChange}
                        />
                    </Space>
                </Form.Item>
                <Form.Item
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
                </Form.Item>
                <Form.Item>
                    <Button type="primary" className="login-form-button" htmlType='submit'>
                        Play WordChain
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" className="login-form-button" htmlType='submit'>
                        Practice Conversation
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default GameForm
