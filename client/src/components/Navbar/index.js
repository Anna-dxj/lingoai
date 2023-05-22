import {React} from 'react';
import { Menu, Row, Col, ConfigProvider } from 'antd';
import {Link} from 'react-router-dom';

import 'antd/dist/antd'
import './style.css'

const Navbar = () => {
    return (
        <nav>
            <Row align="middle">
                <Col sm={14}>
                    <h1 className="title">
                        <Link to="/home" className="home-link">
                            LingoAI
                        </Link>
                    </h1>
                </Col>
                <Col sm={10}>
                    <ConfigProvider theme={{
                        token: {
                            // ColorPrimary changes the underline color & text on active & hover
                            // & acvive color 
                            // colorPrimary: 'red',
                            // // Changes background color of menu & submenu
                            // colorBgBase: 'purple',
                            // // changes background color of main part of menu
                            // colorBgContainer: 'pink',
                            // // Changes background color of active submenu
                            // colorPrimaryBg: 'green',
                            // // Changes background hover of inactive submenu 
                            // colorBgTextHover: 'orange',
                        }
                    }}>
                        <Menu mode="horizontal" className="custom-menu">
                            {/* For "custom" styling: 
                                - colorGbContainer (string) -> fill background color  
                                - colorTextDisabled - color of text in disabled state
                                - controlItemBgActive - color when active*/}
                            <Menu.Item className="menu-item-red">
                                <Link to="/notebook" className="menu-link">Notebook</Link>
                            </Menu.Item>
                            <Menu.Item className="custom-menu-item">
                                <Link to="/wordchain">Play WordChain</Link>
                            </Menu.Item>
                            <Menu.Item className="custom-menu-item">
                                <Link to='/practicechat'>Practice Conversation</Link>
                            </Menu.Item>
                            {/* */}
                            <Menu.Item className="custom-menu-item">
                                <Link to='/account'>Account Settings</Link>
                            </Menu.Item>
                            {/* {
                                Auth.loggedIn() ? (
                                    <Menu.Item>
                                        <Link to='/home' onClick={Auth.logout}>Logout</Link>
                                    </Menu.Item>
                                ) : (
                                    <Menu.Item>
                                        <Link to='/login'> Login</Link>
                                    </Menu.Item>
                                )
                            } */}
                        </Menu>
                    </ConfigProvider>
                </Col>
            </Row>
        </nav>
    )
}

export default Navbar