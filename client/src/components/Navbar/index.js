import {React} from 'react';
import { Menu, Row, Col, ConfigProvider } from 'antd';
import {Link} from 'react-router-dom';

import 'antd/dist/antd'
import './style.css'
import Auth from '../../utils/auth'

const Navbar = () => {
    return (
        <nav>
            <Row align="middle">
                <Col sm={14}>
                    <h1 className="title">
                        <Link to="/" className="home-link">
                            LingoAI
                        </Link>
                    </h1>
                </Col>
                <Col sm={10}>
                    <ConfigProvider theme={{
                        token: {
                            colorPrimary: '#3BC14A',
                            colorBgBase: '#4D5057',
                            colorTextBase: '#3BC14A',
                            // lineType: 'none',
                            lineWidth: -1,
                        },
                    }}>
                        <Menu mode="horizontal" className="custom-menu">
                            {/* For "custom" styling: 
                                - colorGbContainer (string) -> fill background color  
                                - colorTextDisabled - color of text in disabled state
                                - controlItemBgActive - color when active*/}
                            
                            <Menu.Item className="menu-item-custom">
                                <Link to="/notebook" className="menu-link">Notebook</Link>
                            </Menu.Item>
                            {/* <Menu.Item className="custom-menu-item">
                                <Link to="/wordchain">Play WordChain</Link>
                            </Menu.Item>
                            <Menu.Item className="custom-menu-item">
                                <Link to='/practicechat'>Practice Conversation</Link>
                            </Menu.Item> */}
                            {/* */}
                            <Menu.Item className="menu-item-custom">
                                <Link to="/practice" className="menu-link">Practice</Link>
                            </Menu.Item>
                            {
                                Auth.loggedIn() ? (
                                    <Menu.Item className='menu-item-custom'>
                                        <Link to='/' onClick={Auth.logout}>Logout</Link>
                                    </Menu.Item>
                                ) : (
                                    <Menu.Item className='menu-item-custom'>
                                        <Link to='/login'> Login</Link>
                                    </Menu.Item>
                                )
                            }
                        </Menu>
                    </ConfigProvider>
                </Col>
            </Row>
        </nav>
    )
}

export default Navbar