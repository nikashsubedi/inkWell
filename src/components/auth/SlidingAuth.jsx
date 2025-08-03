import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  PenTool, 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  ArrowRight,
  Github,
  Chrome,
  Facebook,
  Linkedin
} from 'lucide-react';

const SlidingAuth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/home';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (isSignUp && !formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (isSignUp && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      if (isSignUp) {
        await signup(formData.name, formData.email, formData.password);
      } else {
        await login(formData.email, formData.password);
      }
      navigate(from, { replace: true });
    } catch (error) {
      setErrors({ general: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setErrors({});
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-4"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`
      }}
    >
      <div className={`relative bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden w-full max-w-4xl min-h-[600px] transition-all duration-700 ease-in-out ${isSignUp ? 'right-panel-active' : ''}`}>
        
        {/* Sign Up Form */}
        <div className={`absolute top-0 h-full w-1/2 transition-all duration-700 ease-in-out ${isSignUp ? 'translate-x-full opacity-100 z-[5]' : 'translate-x-0 opacity-0 z-[1]'}`}>
          <form onSubmit={handleSubmit} className="bg-gray-900/90 backdrop-blur-sm flex flex-col items-center justify-center h-full px-12 text-center">
            <div className="flex items-center mb-8">
              <PenTool className="w-8 h-8 text-orange-400 mr-3" />
              <h1 className="text-3xl font-bold text-white">Create Account</h1>
            </div>
            
            <div className="flex space-x-3 mb-6">
              <button type="button" className="w-10 h-10 border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors">
                <Facebook className="w-5 h-5" />
              </button>
              <button type="button" className="w-10 h-10 border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors">
                <Github className="w-5 h-5" />
              </button>
              <button type="button" className="w-10 h-10 border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors">
                <Linkedin className="w-5 h-5" />
              </button>
            </div>
            
            <span className="text-white/70 text-sm mb-6">or use your email for registration</span>
            
            {errors.general && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-2 rounded-lg mb-4 text-sm">
                {errors.general}
              </div>
            )}
            
            <div className="space-y-4 w-full max-w-xs">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Name"
                  className="w-full bg-transparent border-none border-b border-white/50 text-center text-white placeholder-white/70 py-3 px-0 focus:border-orange-400 focus:outline-none transition-colors font-medium"
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
              </div>
              
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="w-full bg-transparent border-none border-b border-white/50 text-center text-white placeholder-white/70 py-3 px-0 focus:border-orange-400 focus:outline-none transition-colors font-medium"
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>
              
              <div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className="w-full bg-transparent border-none border-b border-white/50 text-center text-white placeholder-white/70 py-3 px-0 focus:border-orange-400 focus:outline-none transition-colors font-medium"
                />
                {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
              </div>
              
              <div>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm Password"
                  className="w-full bg-transparent border-none border-b border-white/50 text-center text-white placeholder-white/70 py-3 px-0 focus:border-orange-400 focus:outline-none transition-colors font-medium"
                />
                {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="mt-8 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 px-12 rounded-full uppercase tracking-wider text-sm transition-all duration-200 disabled:opacity-50 active:scale-95"
            >
              {isLoading ? 'Creating...' : 'Sign Up'}
            </button>
          </form>
        </div>

        {/* Sign In Form */}
        <div className={`absolute top-0 left-0 h-full w-1/2 z-[2] transition-all duration-700 ease-in-out ${isSignUp ? 'translate-x-full' : 'translate-x-0'}`}>
          <form onSubmit={handleSubmit} className="bg-gray-900/90 backdrop-blur-sm flex flex-col items-center justify-center h-full px-12 text-center">
            <div className="flex items-center mb-8">
              <PenTool className="w-8 h-8 text-orange-400 mr-3" />
              <h1 className="text-3xl font-bold text-white">Sign In</h1>
            </div>
            
            <div className="flex space-x-3 mb-6">
              <button type="button" className="w-10 h-10 border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors">
                <Facebook className="w-5 h-5" />
              </button>
              <button type="button" className="w-10 h-10 border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors">
                <Github className="w-5 h-5" />
              </button>
              <button type="button" className="w-10 h-10 border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors">
                <Linkedin className="w-5 h-5" />
              </button>
            </div>
            
            <span className="text-white/70 text-sm mb-6">or use your account</span>
            
            {errors.general && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-2 rounded-lg mb-4 text-sm">
                {errors.general}
              </div>
            )}
            
            <div className="space-y-4 w-full max-w-xs">
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="w-full bg-transparent border-none border-b border-white/50 text-center text-white placeholder-white/70 py-3 px-0 focus:border-orange-400 focus:outline-none transition-colors font-medium"
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>
              
              <div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className="w-full bg-transparent border-none border-b border-white/50 text-center text-white placeholder-white/70 py-3 px-0 focus:border-orange-400 focus:outline-none transition-colors font-medium"
                />
                {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="mt-8 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 px-12 rounded-full uppercase tracking-wider text-sm transition-all duration-200 disabled:opacity-50 active:scale-95"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        </div>

        {/* Overlay Container */}
        <div className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-700 ease-in-out z-[100] ${isSignUp ? '-translate-x-full' : 'translate-x-0'}`}>
          <div className={`bg-gradient-to-r from-orange-500 to-red-500 relative -left-full h-full w-[200%] transition-transform duration-700 ease-in-out ${isSignUp ? 'translate-x-1/2' : 'translate-x-0'}`}>
            
            {/* Welcome Back Panel */}
            <div className={`absolute top-0 flex flex-col justify-center items-center px-10 text-center h-full w-1/2 transition-transform duration-700 ease-in-out ${isSignUp ? 'translate-x-0' : '-translate-x-1/5'}`}>
              <h1 className="text-3xl font-bold text-white mb-4">Welcome Back!</h1>
              <p className="text-white/90 mb-8 leading-relaxed font-medium">
                To keep connected with us please login with your personal info
              </p>
              <button
                onClick={toggleMode}
                className="bg-transparent border-2 border-white text-white font-bold py-3 px-12 rounded-full uppercase tracking-wider text-sm hover:bg-white hover:text-orange-500 transition-all duration-300"
              >
                Sign In
              </button>
            </div>

            {/* Hello Friend Panel */}
            <div className={`absolute top-0 right-0 flex flex-col justify-center items-center px-10 text-center h-full w-1/2 transition-transform duration-700 ease-in-out ${isSignUp ? 'translate-x-1/5' : 'translate-x-0'}`}>
              <h1 className="text-3xl font-bold text-white mb-4">Hello, Friend!</h1>
              <p className="text-white/90 mb-8 leading-relaxed font-medium">
                Enter your personal details and start your journey with us
              </p>
              <button
                onClick={toggleMode}
                className="bg-transparent border-2 border-white text-white font-bold py-3 px-12 rounded-full uppercase tracking-wider text-sm hover:bg-white hover:text-orange-500 transition-all duration-300"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlidingAuth;
