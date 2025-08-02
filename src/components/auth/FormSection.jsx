// components/FormSection.jsx
import React from 'react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

const FormSection = ({ isSignIn, toggleMode }) => {
  return (
    <div className="w-full md:w-1/2 flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-white rounded-xl shadow-xl transition-transform duration-500">
        {isSignIn ? (
          <SignInForm toggleMode={toggleMode} />
        ) : (
          <SignUpForm toggleMode={toggleMode} />
        )}
      </div>
    </div>
  );
};

export default FormSection;
