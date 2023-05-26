import React from 'react';
import { Button, Row, Col, ConfigProvider } from 'antd'
import './wordCard.css'


const WordCard = ({_id, original_text, en,  handleDelete}) => {
    return (
        <div key={_id}>
            <Row align="middle" justify="space-between">
                <Col sm={24}>
                    <div className="word-card">
                      <h3 className="rules-title">Spanish: {original_text}</h3>
                      <div className="prompt">English: {en}</div>
                      <ConfigProvider theme={{
                        token: {
                          colorPrimary: '#4da167'
                        }
                      }}>
                        <Button
                          type="primary"
                          className="word-card-button"
                          onClick={(event) => handleDelete(event, _id)}
                        >
                          Remove
                        </Button>
                      </ConfigProvider>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default WordCard