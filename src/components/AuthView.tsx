import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Sparkles, Shield } from 'lucide-react';

interface AuthViewProps {
  onAuthComplete: (user: { id: string; email: string; username: string }) => void;
}

export function AuthView({ onAuthComplete }: AuthViewProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock successful authentication
    const userData = {
      id: '1',
      email: formData.email,
      username: formData.username || formData.email.split('@')[0]
    };
    
    onAuthComplete(userData);
    setIsLoading(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const features = [
    {
      icon: Sparkles,
      title: 'AI-Powered Captions',
      description: 'Transform moments into poetic memories'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your memories, your control'
    },
    {
      icon: User,
      title: 'Creative Community',
      description: 'Connect with like-minded creators'
    }
  ];

  return (
    <div className="mobile-vh mobile-vw flex flex-col">
      {/* Modern Header */}
      <div className="flex items-center justify-center py-20 android-status-bar-fix">
        <div className="flex items-center space-x-4 animate-fade-in-up">
          <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center shadow-modern">
            <span className="text-white font-bold text-3xl">S</span>
          </div>
          <h1 className="text-4xl font-bold text-white">
            SnapCap
          </h1>
        </div>
      </div>

      {/* Auth Form */}
      <div className="flex-1 flex items-center justify-center mobile-padding-lg">
        <div className="w-full max-w-md animate-fade-in-up">

          {/* Modern Tab Switcher */}
          <div className="glass-card p-2 mb-12">
            <div className="flex">
              <button
                className={`flex-1 py-4 px-6 text-base font-semibold rounded-xl transition-all duration-200 ${
                  isLogin
                    ? 'gradient-primary text-white shadow-modern-sm'
                    : 'text-white/60 hover:text-white'
                }`}
                onClick={() => setIsLogin(true)}
              >
                Log In
              </button>
              <button
                className={`flex-1 py-4 px-6 text-base font-semibold rounded-xl transition-all duration-200 ${
                  !isLogin
                    ? 'gradient-primary text-white shadow-modern-sm'
                    : 'text-white/60 hover:text-white'
                }`}
                onClick={() => setIsLogin(false)}
              >
                Sign Up
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? 'login' : 'signup'}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-white mb-4">
                    {isLogin ? 'Welcome back' : 'Create your account'}
                  </h2>
                  <p className="text-gray-400 text-lg">
                    {isLogin 
                      ? 'Log in to see photos and videos from friends' 
                      : 'Sign up to see photos and videos from your friends'
                    }
                  </p>
                </div>

                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="username" className="text-white">Username</Label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="username"
                        type="text"
                        placeholder="Username"
                        value={formData.username}
                        onChange={(e) => handleInputChange('username', e.target.value)}
                        className="instagram-input pl-12"
                        required={!isLogin}
                      />
                    </div>
                  </motion.div>
                )}

                <div className="space-y-6">
                  <div className="relative">
                    <Mail className="absolute left-5 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="modern-input pl-14"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="relative">
                    <Lock className="absolute left-5 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="modern-input pl-14 pr-14"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-5 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors p-2"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className="instagram-input pl-12"
                        required={!isLogin}
                      />
                    </div>
                  </motion.div>
                )}

                {isLogin && (
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="modern-button text-base font-semibold disabled:opacity-50"
                >
                  {isLoading ? (
                    <span>{isLogin ? 'Logging in...' : 'Signing up...'}</span>
                  ) : (
                    <span>{isLogin ? 'Log In' : 'Sign Up'}</span>
                  )}
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-gray-900/50 text-gray-400">or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="glass border-white/10 text-white hover:bg-white/5 h-12"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Google
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="glass border-white/10 text-white hover:bg-white/5 h-12"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
                  </Button>
                </div>

                <p className="text-center text-sm text-gray-400">
                  By signing {isLogin ? 'in' : 'up'}, you agree to our{' '}
                  <button className="text-indigo-400 hover:text-indigo-300 transition-colors">
                    Terms of Service
                  </button>{' '}
                  and{' '}
                  <button className="text-indigo-400 hover:text-indigo-300 transition-colors">
                    Privacy Policy
                  </button>
                </p>
              </form>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}