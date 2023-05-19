import React from 'react'
import {LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import {Button, Form, Input} from 'antd'

const SignUpForm = () => {
    return (
        <Form
            className="login-form"
            layout="vertical"
        >
            <Form.Item
                label="Username"
                name="Username"
            >
                <Input 
                    Prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="username"
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
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" className="login-form-button">
                    Signup
                </Button>
            </Form.Item>
        </Form>
    )
}

export default SignUpForm