import React from 'react';
import propTypes from 'prop-types';

function MessageBubble({ name, message, isSelf }) {
  return (
    <article
      className={`text-white rounded max-w-2xl p-2
      ${isSelf ? 'ml-auto bg-gray-500' : 'mr-auto bg-red-500'}
      `}
    >
      <h1 className="font-bold">{name}</h1>
      <p>{message}</p>
    </article>
  );
}

MessageBubble.propTypes = {
  name: propTypes.string.isRequired,
  message: propTypes.string.isRequired,
  isSelf: propTypes.bool.isRequired,
};

export default React.memo(MessageBubble);
