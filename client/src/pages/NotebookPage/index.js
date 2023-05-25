import React from 'react';
import './style.css';
import { QUERY_ME } from '../utils/queries';

const NotebookPage = () => {
  const { data } = useQuery(QUERY_ME);

  let user;
  if (Auth.loggedIn()) {
    user = data.user;
  }

  if (!Auth.loggedIn()) {
    return (
      <h4>
        You need to be logged in to see your notebook. Use the navigation link
        above to log in!
      </h4>
    );
  }

  return (
    <div>
      {user ? (
        <div>
          <h2>Your Saved Words</h2>
          {user.words.map(({ _id, original_text, en }) => (
            <div key={_id}>
              <Row align="middle" justify="space-between">
                <Col sm={24}>
                  <div className="instructions">
                    <h3 className="rules-title">
                      Saved Word in Spanish: {original_text}
                    </h3>
                    <div className="prompt">English Translation: {en}</div>
                    {/* <Button type="primary" className="button" htmlType='submit'>
                      Edit
                    </Button> */}
                    {/* <Button type="primary" className="button" htmlType='submit'>
                      Remove
                    </Button> */}
                  </div>
                </Col>
              </Row>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};
export default NotebookPage;
