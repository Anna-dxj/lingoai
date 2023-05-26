import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import {LockOutlined, MailOutlined} from '@ant-design/icons'
import {Button, Form, Input, ConfigProvider} from 'antd'
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';

import Auth from '../../utils/auth';
import './style.css'

const LoginForm = () => {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error, data }] = useMutation(LOGIN_USER);
  
    const handleChange = (event) => {
      const { name, value } = event.target;
  
      setFormState({
        ...formState,
        [name]: value,
      });
    };
  
    const handleFormSubmit = async () => {
      try {
        const { data } = await login({
            variables: { 
                ...formState
            },
        });

        console.log('token received', data.login, data.user);
        Auth.login(data.login.token);
        console.log('token saved to local storage', Auth.getToken())
      } catch (e) {
        console.error(e);
      }
  
      setFormState({
        email: '',
        password: '',
      });
    };
    
    return (
        <div>
            {data ? (
                <p> 
                    Success! You may now head {' '}
                    <Link to="/home"> back to the homepage.</Link>
                </p>
            ) : (
                <ConfigProvider theme={{
                    token: {
                        colorPrimary: '#3BC14A',
                    },
                }}>
                    <Form
                        className="login-form"
                        layout="vertical"
                        onFinish={handleFormSubmit}
                    >
                        <Form.Item
                            label="Email"
                            name="Email"
                        >
                            <Input 
                                prefix={<MailOutlined className="site-form-item-icon" />}
                                type="email"
                                placeholder="email@email.com"
                                name="email"
                                value={formState.email}
                                onChange={handleChange}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="Password"
                        >
                            <Input 
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={formState.password}
                                onChange={handleChange}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" className="login-form-button" htmlType='submit'>
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                </ConfigProvider>
            )}

            {error && (
                <div>
                    {error.message}
                </div>
            )}
        </div>
    );
}

export default LoginForm
