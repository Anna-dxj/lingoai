import React, {useState, useEffect, useRef} from 'react';
import {Modal, ConfigProvider, Row} from 'antd'
import './style.css'

const ResponseEl = ({id, content, sender}) => {
    const [openModal, setOpenModal] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const messageRef = useRef(null);
    
    useEffect(() => {
        if (sender==='ai') {
            const timer = setTimeout (() => {
                setShowMessage(true);
            }, 1400);

            return () => clearTimeout(timer)
        }
    }, [sender]);

    useEffect(() => {
        messageRef.current.scrollIntoView({behavior: 'smooth'})
    }, [])

    const handleSave = () => {
        // SAVE DATA TO USER
        setOpenModal(false);
    }

    const handleTranslation = () => {
        console.log('works')
        setOpenModal(true);
    }

    const handleCloseModal = () => {
        setOpenModal(false);
    }
    return (
        <div ref={messageRef}>
            { sender === 'user' ? (
                <div key={id}>
                    <div className="user-response">
                        <p className="sender">You:</p>
                        <p className="content user-message">{content}</p>
                    </div>
                </div>
            ) : (
                <div >
                    <div key={id}>
                        <div className="ai-response">
                            <div className={showMessage ? '' : 'hidden'}>
                                <p className="sender">LingoAI:</p>
                                <p className='content ai-message'>
                                    <button onClick={handleTranslation}>{content}</button>
                                </p>
                            </div>
                            <div className={showMessage ? 'hidden' : 'loading-container'}>
                                <div className = 'ai-message content'>
                                    <div className='dot-container'>
                                        <Row>
                                            <div className='dot'>
                                            </div>
                                            <div className='dot'>
                                            </div>
                                            <div className='dot'>
                                            </div>
                                        </Row>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ConfigProvider theme = {{
                        token: {
                            colorPrimary: '#3BC14A',
                        }
                    }}>
                        <Modal
                            title={content}
                            open={openModal}
                            onOk={handleSave}
                            okText="Save"
                            onCancel={handleCloseModal}
                        >
                            <p>Spanish: {content}</p>
                            <p>English: TRANSLATION</p>
                        </Modal>
                    </ConfigProvider>
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

export default ResponseEl