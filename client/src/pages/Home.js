import React from 'react';
import { useQuery } from '@apollo/client';

import ThoughtList from '../components/ThoughtList';
import ThoughtForm from '../components/ThoughtForm';

import { QUERY_THOUGHTS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const thoughts = data?.thoughts || [];

  //Use state for response message and user input(value)
  const [value, setValue] = useState(null);
  const [message, setMessage] = useState(null);

  //Send user input to ChatGPT API
  const [sendUserInput] = useMutation(SEND_USER_INPUT);
  const handleUserInput = async (input) => {
    try {
      const response = await sendUserInput({
        variables: { input },
      });
      const { id, message } = response.data.sendUserInput;
    } catch (error) {}
  };

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <ThoughtForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList
              thoughts={thoughts}
              title="Some Feed for Thought(s)..."
            />
          )}
        </div>
        {/* Testing ChatGPT call with a hard coded user input value */}
        <div>
          <form onSubmit={handleUserInput}>
            <input value="test"></input>
            <button type="submit"></button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Home;
