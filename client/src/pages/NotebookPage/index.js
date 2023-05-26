import React, { useState, useEffect } from 'react';
import { Row, Col, Spin, Button, ConfigProvider } from 'antd';
import './style.css';
import { useQuery, useMutation } from '@apollo/client';
import { REMOVE_WORD } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';
import Auth from '../../utils/auth';
const NotebookPage = () => {
  const { data, loading, error, refetch } = useQuery(QUERY_ME);
  const [deleteWord, { error: deleteError, data: deleteData }] =
    useMutation(REMOVE_WORD);
  const [savedWords, setSavedWords] = useState([]);
  const handleDelete = (event, wordId) => {
    event.preventDefault();
    if (!Auth.loggedIn()) {
      return (
        <h4 className="warning">
          You need to be logged in to see your notebook. Use the navigation link
          above to log in!
        </h4>
      );
    }
    deleteWord({ variables: { wordId } })
      .then(() => {
        // Handle successful deletion
        setSavedWords((prevWords) =>
          prevWords.filter((word) => word._id !== wordId)
        );
      })
      .catch((error) => {
        console.error(error);
        // Handle error
      });
  };
  useEffect(() => {
    if (deleteData) {
      // If deleteData exists, it means a deletion has occurred, so we refetch QUERY_ME
      refetch();
    }
  }, [deleteData, refetch]);
  if (loading) {
    return (
      <Row align="middle" justify="center">
        <Spin size="large" />;
      </Row>
    )
  }
  if (error) {
    return <div>Error fetching data</div>;
  }
  const user = data?.me;
  return (
    <div>
      {user ? (
        <div>
          <h2 className="page-title">Your Saved Words</h2>
          <div className="card-container">
            {user.savedWords.map(({ _id, original_text, en }) => (
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
            ))}
          </div>
        </div>
      ) : (
        <div>error!</div>
      )}
    </div>
  );
};

export default NotebookPage