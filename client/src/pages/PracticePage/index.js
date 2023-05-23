import React from 'react';
import { Row, Col, Button, ConfigProvider} from 'antd';
import ChatInterfaceEl from '../../components/ChatInterfaceEl'
import GameEl from '../../components/GameEl'
import './style.css'

const PracticePage = () => {
    return (
        <div>
            {/* {Render if chose game} */}
            <GameEl /> 
            <ChatInterfaceEl />
        </div>
    )
}

export default PracticePage;