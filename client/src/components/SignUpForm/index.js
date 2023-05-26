import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import {Button, Form, Input, ConfigProvider} from 'antd'
import {useMutation} from '@apollo/client'
import {ADD_USER} from '../../utils/mutations'
import Auth from '../../utils/auth'
import './style.css'

const SignUpForm = () => {
    const [formState, setFormState] = useState({ username: '', email: '', password: '' });
    const [addUser, { error, data }] = useMutation(ADD_USER);

    const handleChange = (event) => {
        const {name, value} = event.target; 
        setFormState({...formState, [name]: value})
    }

    const handleFormSubmit = async () => {
        try {
            const {data} = await addUser ({
                variables: {
                    ...formState
                }
            });
            console.log(data)
            Auth.login(data.addUser.token)
        } catch (err) {
            console.error(err)
        }

        setFormState({
            username: '',
            email: '',
            password: '',
        })
    }

    return (
        <div>
            {data ? (
                <p>
                    Success! You may now head {' '}
                    <Link to='/home'> back to the homepage.</Link>
                </p>
            ) : (
                <ConfigProvider theme={{
                    token: {
                        colorPrimary: '#3BC14A',
                    },
                }}
                >
                    <Form
                        className="login-form"
                        layout="vertical"
                        onFinish={handleFormSubmit}
                        initialValues={{
                            remember: true,
                        }}
                    >
                        <Form.Item
                            label="Username"
                            name="Username"
                        >
                            <Input 
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                placeholder="username"
                                name="username"
                                value={formState.username}
                                onChange={handleChange}
                            />
                        </Form.Item>
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
                                Signup
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
    )
}

export default SignUpForm