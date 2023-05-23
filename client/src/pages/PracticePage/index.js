import React from 'react';
import { Row, Col, Button, ConfigProvider} from 'antd';
import ConvoEl from '../../components/ConvoEl'
import GameEl from '../../components/GameEl'
import './style.css'

const PracticePage = () => {
    return (
        <div>
            <h2 className="page-title">Practice</h2>
            {/* {Render if chose game} */}
            {/* <GameEl />  */}
            <ConvoEl />
        </div>
    )
}

export default PracticePage;