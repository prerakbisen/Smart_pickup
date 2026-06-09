import React, { useState } from 'react';
import Icon from '../../components/AppIcon';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ForgotPasswordModal from './components/ForgotPasswordModal';

const AuthenticationPortal = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <img src="/assets/images/icons8-university-64.png" alt=" Smart Pickup Logo" />
          </div>
          <h1 className="text-3xl font-semibold text-foreground mb-2">
            Smart Pickup
          </h1>
          <p className="text-muted-foreground">
            Secure access to your school pickup management system
          </p>
        </div>

        <div className="bg-card rounded-lg shadow-elevated border border-border overflow-hidden">
          <div className="flex border-b border-border">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 px-6 py-4 font-medium transition-all ${
                activeTab === 'login' ?'text-primary bg-primary/10 border-b-2 border-primary' :'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Icon 
                  name="LogIn" 
                  size={18} 
                  color={activeTab === 'login' ? 'var(--color-primary)' : 'currentColor'} 
                />
                <span>Login</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`flex-1 px-6 py-4 font-medium transition-all ${
                activeTab === 'register' ?'text-primary bg-primary/10 border-b-2 border-primary' :'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Icon 
                  name="UserPlus" 
                  size={18} 
                  color={activeTab === 'register' ? 'var(--color-primary)' : 'currentColor'} 
                />
                <span>Register</span>
              </div>
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'login' ? (
              <LoginForm onForgotPassword={() => setIsForgotPasswordOpen(true)} />
            ) : (
              <RegisterForm />
            )}
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            By continuing, you agree to our{' '}
            <button className="text-primary hover:underline">Terms of Service</button>
            {' '}and{' '}
            <button className="text-primary hover:underline">Privacy Policy</button>
          </p>
        </div>

        <div className="mt-8 p-4 bg-card rounded-lg border border-border">
          <div className="flex items-start gap-3">
            <Icon name="Shield" size={20} color="var(--color-success)" />
            <div>
              <p className="text-sm font-medium text-foreground mb-1">
                Secure & Compliant
              </p>
              <p className="text-xs text-muted-foreground">
                Your data is protected with enterprise-grade security and complies with educational privacy standards.
              </p>
            </div>
          </div>
        </div>
      </div>

      <ForgotPasswordModal 
        isOpen={isForgotPasswordOpen}
        onClose={() => setIsForgotPasswordOpen(false)}
      />
    </div>
  );
};

export default AuthenticationPortal;