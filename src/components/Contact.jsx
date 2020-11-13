import React from 'react';
import propTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

function Contact({ name, image, unreadCount, isOnline, link }) {
  return (
    <NavLink to={link} className="contents">
      <article className="flex my-2 p-2">
        <div className="relative">
          <img src={image} alt={name} className="rounded-full shadow-md w-16" />
          <span
            className={`absolute bottom-0  right-0 h-4 w-4 rounded-full 
            ${isOnline ? 'bg-green-500' : 'bg-red-500'}
              `}
          />
        </div>

        <div className="flex justify-between w-full mt-2">
          <h1 className="font-bold text-xl mx-2">{name}</h1>

          {unreadCount > 0 && (
            <span className="flex justify-center items-center bg-red-600 text-white rounded-full h-6 w-6">
              {unreadCount}
            </span>
          )}
        </div>
      </article>
    </NavLink>
  );
}

Contact.propTypes = {
  name: propTypes.string.isRequired,
  image: propTypes.string.isRequired,
  unreadCount: propTypes.number,
  isOnline: propTypes.bool.isRequired,
  link: propTypes.string.isRequired,
};

Contact.defaultProps = {
  unreadCount: 0,
};

export default React.memo(Contact);
