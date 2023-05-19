// import React, { useState } from 'react';
// import { useMutation } from '@apollo/client';
// import { LOGIN_USER } from '../utils/mutations';

// import Auth from '../utils/auth';

// const LoginForm = (props) => {
//   const [formState, setFormState] = useState({ email: '', password: '' });
//   const [login, { error, data }] = useMutation(LOGIN_USER);

//   // update state based on form input changes
//   const handleChange = (event) => {
//     const { name, value } = event.target;

//     setFormState({
//       ...formState,
//       [name]: value,
//     });
//   };

//   // submit form
//   const handleFormSubmit = async (event) => {
//     event.preventDefault();
//     console.log(formState);
//     try {
//       const { data } = await login({
//         variables: { ...formState },
//       });

//       Auth.login(data.login.token);
//     } catch (e) {
//       console.error(e);
//     }

//     // clear form values
//     setFormState({
//       email: '',
//       password: '',
//     });
//   };

//   return (
//     <form onSubmit={handleFormSubmit}>
//         <input
//             className="form-input"
//             placeholder="Your email"
//             name="email"
//               type="email"
//             value={formState.email}
//             onChange={handleChange}
//         />
//         <input
//             className="form-input"
//             placeholder="******"
//             name="password"
//             type="password"
//             value={formState.password}
//             onChange={handleChange}
//         />
//         <button
//             className="btn btn-block btn-primary"
//             style={{ cursor: 'pointer' }}
//             type="submit"
//         >
//             Submit
//         </button>
//         {error && (
//             <div className="my-3 p-3 bg-danger text-white">
//                 {error.message}
//             </div>
//         )}
//     </form>
//     )}


// export default LoginForm;

import React, { useState } from 'react';
import {LockOutlined, MailOutlined} from '@ant-design/icons'
import {Button, Form, Input} from 'antd'
import './style.css'

const LoginForm = () => {
    const [userFormData, setUserFormData] = useState({ email: '', password: '' });

    return (
        <Form
            className="login-form"
            layout="vertical"
        >
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
                    Login
                </Button>
            </Form.Item>
        </Form>
    );
}

export default LoginForm
