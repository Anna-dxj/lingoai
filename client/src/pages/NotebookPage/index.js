import React, { useState, useEffect } from 'react';
import { Row, Col, Spin, Button } from 'antd';
import './style.css';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
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
    return <Spin size="large" />;
  }
  if (error) {
    return <div>Error fetching data</div>;
  }
  const user = data?.me;
  return (
    <div>
      {user ? (
        <div className="card-container">
          <h2>Your Saved Words</h2>
          {user.savedWords.map(({ _id, original_text, en }) => (
            <div key={_id}>
              <Row align="middle" justify="space-between">
                <Col sm={24}>
                  <div className="word-card">
                    <h3 className="rules-title">Spanish: {original_text}</h3>
                    <div className="prompt">English: {en}</div>
                    <Button 
                    type="primary" 
                    className="word-card-button"
                    >
                      Edit
                    </Button>
                    <Button
                      type="primary"
                      className="word-card-button"
                      onClick={(event) => handleDelete(event, _id)}
                    >
                      Remove
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>
          ))}
        </div>
      ) : (
        <div>error!</div>
      )}
    </div>
  );
};
export default NotebookPage;