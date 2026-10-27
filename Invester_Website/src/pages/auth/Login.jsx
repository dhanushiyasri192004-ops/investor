import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, TrendingUp, ShieldCheck, ArrowRight, ArrowLeft, AlertCircle } from 'lucide-react';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import { SystemAdaptabilityBar } from '../../components/common/SystemAdaptabilityBar';

export const Login = () => {
  const [identifier, setIdentifier] = useState(
    () => localStorage.getItem('ci_remember_identifier') || 'rahul.sharma@investor.com'
  );
  const [password, setPassword] = useState('Password@123');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!identifier.trim()) {
      setError('Please enter your email address or mobile number.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setIsLoading(true);
    try {
      await login(identifier.trim(), password, rememberMe);
      navigate('/investor/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        backgroundColor: 'var(--bg-app)',
        color: 'var(--text-main)'
      }}
      className="auth-split-wrapper"
    >
      {/* Left Panel: Deep Burgundy Brand Banner with City Skyline Graphic */}
      <div
        style={{
          flex: 1,
          backgroundColor: '#3B0A11',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '48px 48px',
          color: '#FFFFFF'
        }}
        className="auth-banner-panel"
      >
        {/* Background Visual Asset */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(/images/auth-banner.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center bottom',
            opacity: 0.92,
            zIndex: 1
          }}
        />

        {/* Gradient Overlay for Text Readability */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(43, 6, 12, 0.95) 0%, rgba(59, 10, 17, 0.7) 40%, rgba(35, 4, 9, 0.95) 100%)',
            zIndex: 2
          }}
        />

        {/* Brand Header */}
        <div style={{ position: 'relative', zIndex: 3, display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '10px',
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(200, 150, 62, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-gold-light)'
            }}
          >
            <TrendingUp size={24} />
          </div>
          <div>
            <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '24px', fontWeight: '800', lineHeight: 1 }}>
              Connect <span style={{ color: 'var(--color-gold)' }}>Invest</span>
            </div>
          </div>
        </div>

        {/* Hero Narrative on Banner */}
        <div style={{ position: 'relative', zIndex: 3, maxWidth: '440px', margin: 'auto 0' }}>
          <h2
            style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: '38px',
              fontWeight: '800',
              lineHeight: 1.15,
              color: '#FFFFFF',
              marginBottom: '12px',
              letterSpacing: '-0.02em'
            }}
          >
            Invest in Opportunities. <br />
            <span style={{ color: 'var(--color-gold)' }}>Build Your Future.</span>
          </h2>
          <p style={{ fontSize: '16px', color: '#E8DEDF', lineHeight: 1.6, fontWeight: '400' }}>
            Minimum tenures of 12-60 months with verified payouts and transparent portfolio intelligence.
          </p>
        </div>

        {/* Bottom Trust Badge */}
        <div
          style={{
            position: 'relative',
            zIndex: 3,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '13px',
            color: 'rgba(255,255,255,0.7)'
          }}
        >
          <ShieldCheck size={18} color="var(--color-gold)" />
          <span>Regulated Intermediary Platform & Dedicated Escrow Mechanics</span>
        </div>
      </div>

      {/* Right Panel: Clean Warm Form Panel */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '40px 32px',
          backgroundColor: 'var(--bg-app)'
        }}
        className="auth-form-panel"
      >
        {/* Header: Back to Home Link & Security Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '13px',
              fontWeight: '600',
              color: 'var(--color-primary)',
              textDecoration: 'none',
              padding: '6px 14px',
              borderRadius: '8px',
              backgroundColor: 'rgba(59, 10, 17, 0.05)',
              border: '1px solid rgba(59, 10, 17, 0.12)',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-primary)';
              e.currentTarget.style.color = '#FFFFFF';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(59, 10, 17, 0.05)';
              e.currentTarget.style.color = 'var(--color-primary)';
            }}
          >
            <ArrowLeft size={15} />
            <span>Back to Home</span>
          </Link>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12.5px',
              fontWeight: '600',
              color: 'var(--text-muted)'
            }}
          >
            <Lock size={14} color="var(--color-gold)" />
            <span>Secure Investor Portal</span>
          </div>
        </div>

        {/* Centered Sign In Card */}
        <div
          style={{
            maxWidth: '440px',
            width: '100%',
            margin: '0 auto',
            backgroundColor: 'var(--bg-surface)',
            borderRadius: '16px',
            border: '1px solid var(--border-color)',
            padding: '36px 32px',
            boxShadow: '0 8px 30px rgba(59, 10, 17, 0.06)'
          }}
          className="auth-card"
        >
          <div style={{ marginBottom: '28px' }}>
            <h1
              style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: '26px',
                fontWeight: '800',
                color: 'var(--text-main)',
                marginBottom: '6px'
              }}
            >
              Sign In to Your Portfolio
            </h1>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
              Please enter your credentials to access your active investments.
            </p>
          </div>

          {error && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 14px',
                backgroundColor: '#FEE2E2',
                border: '1px solid #FCA5A5',
                borderRadius: '8px',
                color: '#B91C1C',
                fontSize: '13px',
                marginBottom: '20px'
              }}
            >
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <Input
              label="Email Address or Mobile Number"
              type="text"
              name="identifier"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="e.g., mail@domain.com or 9876543210"
              required
              autoComplete="username"
            />

            <Input
              label="Password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              autoComplete="current-password"
            />

            {/* Remember Me & Forgot Password */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'var(--text-muted)' }}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ accentColor: 'var(--color-primary)', width: '16px', height: '16px', cursor: 'pointer' }}
                />
                <span>Remember me</span>
              </label>

              <Link
                to="/forgot-password"
                style={{ color: 'var(--color-primary)', fontWeight: '600', transition: 'color 0.2s' }}
              >
                Forgot password?
              </Link>
            </div>

            {/* Access Dashboard CTA */}
            <div style={{ marginTop: '8px' }}>
              <Button
                variant="primary"
                type="submit"
                fullWidth
                size="lg"
                isLoading={isLoading}
              >
                Access Dashboard
              </Button>
            </div>
          </form>

          {/* Quick Demo Credentials Autofill Helper */}
          <div
            style={{
              marginTop: '20px',
              padding: '10px 14px',
              backgroundColor: 'var(--bg-surface-subtle)',
              borderRadius: '8px',
              border: '1px dashed var(--border-color)',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Demo Account: </span>
              <strong>Rahul Sharma</strong>
            </div>
            <button
              type="button"
              onClick={() => {
                setIdentifier('rahul.sharma@investor.com');
                setPassword('Password@123');
              }}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-gold)',
                fontWeight: '700',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              Autofill
            </button>
          </div>

          {/* Sign Up Link */}
          <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '14px', color: 'var(--text-muted)' }}>
            Don't have an account?{' '}
            <Link
              to="/register"
              style={{
                color: 'var(--color-primary)',
                fontWeight: '700',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span>Sign Up</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Footer info */}
        <div style={{ textAlign: 'center', fontSize: '12px', color: 'var(--text-light)', marginTop: '24px' }}>
          © {new Date().getFullYear()} Connect Invest. All rights reserved.
        </div>
      </div>

      <SystemAdaptabilityBar />

      <style>{`
        @media (max-width: 900px) {
          .auth-split-wrapper {
            flex-direction: column;
          }
          .auth-banner-panel {
            min-height: 280px;
            padding: 32px 24px !important;
          }
          .auth-form-panel {
            padding: 24px 16px !important;
          }
        }
      `}</style>
    </div>
  );
};
