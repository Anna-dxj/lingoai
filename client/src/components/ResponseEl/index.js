import React, { useState, useEffect, useRef } from 'react';
import { Modal, ConfigProvider, Row, Button } from 'antd'
import { useMutation, useQuery } from '@apollo/client';
import Auth from '../../utils/auth'
import { SEND_TRANSLATION, SAVED_WORD} from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';
import './style.css'

const ResponseEl = ({id, content, sender, game, convo}) => {
    const [openModal, setOpenModal] = useState(false);
    const [noSave, setNoSave] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [translatedText, setTranslatedText] = useState('')
    const [loadingDiv, setLoadingDiv] = useState(true);
    const messageRef = useRef(null);

    const [sendTranslation, {error: translationError}] = useMutation(SEND_TRANSLATION);
    const [savedWord, {error: saveWordError}] = useMutation(SAVED_WORD);
    const {loading, data} = useQuery(QUERY_ME);
    
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

    const handleSave = async () => {
        setOpenModal(false);
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        
        if (!token) {
            return false; 
        }
        
        console.log(data);
        
        for (const word of data.me.savedWords) {
            // console.log('ogtext', word.original_text);
            // console.log('content', content);
            if (word.original_text === content) {
                // console.log('why she no work')
                setNoSave(true);
                return;
            }
        }
    
        const saveTranslation = async () => {
            try {
                const {data} = await savedWord({
                    variables: {
                        original_text: content,
                        en: translatedText,
                    }
                })
                console.log('update', data)
            } catch (err) {
                console.error(err)
            }
        }

        saveTranslation();

    }

    const handleTranslation = async () => {
        //setTranslatedText & translatedText
        setOpenModal(true);
        const translateWord = content.trim();
        const {data} = await sendTranslation({
            variables: {
                word: translateWord,
            }
        })
        if (data) {
            setLoadingDiv(false);
        }
        setTranslatedText(data.sendTranslation.translated_text.en)
    }

    const handleCloseModal = () => {
        setOpenModal(false);
    }

    const handleCloseNotSave = () => {
        setNoSave(false);
    }
    return (
        <div ref={messageRef}>
            { sender === 'user' ? (
                <div key={id}>
                    <div className="user-response">
                        <p className="sender">{data.me.username}:</p>
                        <p className="content user-message">{content}</p>
                    </div>
                </div>
            ) : (
                <div >
                    <div key={id}>
                        <div className="ai-response">
                            <div className={showMessage ? '' : 'hidden'}>
                                <p className="sender">LingoAI:</p>
                                <p className={game ? 'content ai-message' : 'hidden'}>
                                    <button onClick={handleTranslation}>{content}</button>
                                </p>
                                <p className={convo ? 'content ai-message' : 'hidden'}>
                                    {content}
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
                            centered
                            closable={false}
                            onOk={handleSave}
                            okText="Save"
                            onCancel={handleCloseModal}
                        >
                            <div className={loadingDiv ? 'hidden' : ''}>
                                <p>Spanish: {content}</p>
                                <p>English: {translatedText}</p>
                            </div>
                            <div className={loadingDiv ? '' : 'hidden'}>
                                loading
                            </div>
                        </Modal>
                    </ConfigProvider>
                    <ConfigProvider theme = {{
                        token: {
                            colorPrimary: '#3BC14A',
                        }
                    }}>
                        <Modal
                            title="Already Saved!"
                            open={noSave}
                            centered
                            closable={false}
                            footer={[
                                <Button onClick={handleCloseNotSave}>Ok</Button>
                            ]}
                        >
                            <div>
                                <p>You already saved {content} to your Notebook!</p>
                            </div>
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