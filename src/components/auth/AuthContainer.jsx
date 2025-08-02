// components/AuthContainer.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FormSection from './FormSection';

const AuthContainer = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const toggleMode = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen overflow-hidden relative bg-white"
    >
      <div className="relative h-screen w-full flex flex-col md:flex-row bg-[#E7FDEF]">
        {isSignIn ? (
          <>
            {/* Left: Curve with Welcome */}
            <motion.div
              key="signin-content"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="hidden md:flex w-1/2 h-full items-center justify-center relative overflow-hidden "
            >
              <div className="absolute w-[150%] h-[150%] bg-emerald-500 rounded-br-full -left-[50%] -top-[25%] shadow-xl"></div>
              <div className="z-10 text-white text-center px-10">
                <h2 className="text-5xl font-bold">Welcome</h2>
              </div>
            </motion.div>

            {/* Right: Sign In Form */}
            <div className="w-full md:w-1/2 h-full flex items-center justify-center ">
              <AnimatePresence mode="wait">
                <motion.div
                  key="signin"
                  initial={{ x: '100%', opacity: 0 }}
                  animate={{ x: '0%', opacity: 1 }}
                  exit={{ x: '-100%', opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="w-[100%]   max-w-lg p-8 bg-white rounded-2xl shadow-2xl mx-4"
                >
                  <FormSection isSignIn={true} toggleMode={toggleMode}  />
                </motion.div>
              </AnimatePresence>
            </div>
          </>
        ) : (
          <>
            {/* Left: Sign Up Form */}
            <div className="w-full md:w-1/2 h-full flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key="signup"
                  initial={{ x: '-100%', opacity: 0 }}
                  animate={{ x: '0%', opacity: 1 }}
                  exit={{ x: '100%', opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="w-[90%]  max-w-lg p-8 bg-white rounded-2xl shadow-2xl mx-4"
                >
                  <FormSection isSignIn={false} toggleMode={toggleMode} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: Curve with Join With Us */}
            <motion.div
              key="signup-content"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="hidden md:flex w-1/2 h-full items-center justify-center relative overflow-hidden"
            >
              <div className="absolute w-[150%] h-[150%] bg-emerald-500 rounded-bl-full -right-[50%] -top-[25%] shadow-xl"></div>
              <div className="z-10 text-white text-center px-10">
                <h2 className="text-5xl font-bold">Join with us</h2>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default AuthContainer;
