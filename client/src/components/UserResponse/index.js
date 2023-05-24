import React from 'react';

const UserResponse = ({id, content}) => {
    return (
        <div key={id}>
            {content}
        </div>
    )
}

export default UserResponse