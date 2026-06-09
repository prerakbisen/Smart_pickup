import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!email) {
      setError('Email is required');
      return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError('');

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      
      setTimeout(() => {
        handleClose();
      }, 3000);
    }, 1500);
  };

  const handleClose = () => {
    setEmail('');
    setError('');
    setIsSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-card rounded-lg shadow-elevated border border-border">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-muted transition-colors"
          aria-label="Close modal"
        >
          <Icon name="X" size={20} color="var(--color-muted-foreground)" />
        </button>

        <div className="p-6">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
            <Icon name="KeyRound" size={24} color="var(--color-primary)" />
          </div>

          <h2 className="text-2xl font-semibold text-foreground mb-2">
            Reset Password
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            Enter your email address and we'll send you instructions to reset your password.
          </p>

          {isSuccess ? (
            <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
              <div className="flex items-start gap-3">
                <Icon name="CheckCircle2" size={20} color="var(--color-success)" />
                <div>
                  <p className="text-sm font-medium text-success mb-1">
                    Email Sent Successfully!
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Please check your inbox for password reset instructions.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email Address"
                type="email"
                name="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => {
                  setEmail(e?.target?.value);
                  setError('');
                }}
                error={error}
                required
              />

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  fullWidth
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="default"
                  fullWidth
                  loading={isLoading}
                  iconName="Send"
                  iconPosition="right"
                >
                  Send Reset Link
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;