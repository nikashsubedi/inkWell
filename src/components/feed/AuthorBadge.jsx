// components/common/AuthorBadge.jsx
import React from 'react';

const AuthorBadge = ({ name, avatar, timestamp }) => {
  return (
    <div className="flex items-center space-x-3">
      <img
        src={avatar}
        alt={name}
        className="w-10 h-10 rounded-full object-cover"
      />
      <div>
        <h4 className="text-sm font-semibold text-gray-800">{name}</h4>
        <p className="text-xs text-gray-500">{timestamp}</p>
      </div>
    </div>
  );
};

export default AuthorBadge;
