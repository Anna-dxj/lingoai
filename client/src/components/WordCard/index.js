import React from 'react';
import { Button, Row, Col } from 'antd'
import './wordCard.css'


const WordCard = () => {
    return (
        <div>
            <Row align="middle" justify="space-between">
                <Col sm={24}>
                    <div className='instructions'>
                        <h3 className="rules-title">Saved Word in Spanish</h3>
                        <div className='prompt'>
                            Translated word 
                        </div>
                        <Button type="primary" className="button" htmlType='submit'>
                            Edit
                        </Button>
                        <Button type="primary" className="button" htmlType='submit'>
                            Remove
                        </Button>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default WordCard