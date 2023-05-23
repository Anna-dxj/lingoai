import React from 'react';
import { Row, Col, Button, ConfigProvider} from 'antd';
import ConvoEl from '../../components/ConvoEl'
import GameEl from '../../components/GameEl'
import './style.css'

const PracticePage = () => {
    return (
        <div>
            {/* {Render if chose game} */}
            <GameEl /> 
            {/* <ConvoEl /> */}
        </div>
    )
}

export default PracticePage;