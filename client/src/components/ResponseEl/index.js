import React from 'react';
import {Col, Row} from 'antd'
import './style.css'

const UserResponse = ({id, content, sender}) => {
    return (
        <div>
            { sender === 'user' ? (
                <div className=''>
                    <div className="user-response">
                        <p className="sender">You:</p>
                        <p className="content user-message">{content}</p>
                    </div>
                </div>
            ) : (
                <div className=''>
                    <div className="ai-response">
                        <p className="sender">LingoAI:</p>
                        <p className="content ai-message">{content}</p>
                    </div>
                </div>
            )}
        </div>
        // <Row>
        //     <div className={sender==='user' ? 'flex-start' : 'flex-end'}>
        //         <div key={id} className={sender === 'user' ? 'user-response' : 'ai-response'}>
        //             <p className="sender">{sender === 'user' ? 'User: ' : 'LingoAI: '}</p> 
        //             <p className="content">{content}</p>
        //         </div>
        //     </div>
        // </Row>
    )
}

export default UserResponse