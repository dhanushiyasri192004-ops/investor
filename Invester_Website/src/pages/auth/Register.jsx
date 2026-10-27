import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, TrendingUp, ShieldCheck, ArrowRight, ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import { evaluatePasswordStrength, validateEmail, validateMobile } from '../../utils/validators';
import { SystemAdaptabilityBar } from '../../components/common/SystemAdaptabilityBar';

export const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    termsAccepted: true
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const passwordStrength = evaluatePasswordStrength(formData.password);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim()) {
      setError('Please provide your full legal name as it appears on your PAN card.');
      return;
    }

    if (!validateEmail(formData.email)) {
      setError('Please provide a valid email address.');
      return;
    }

    if (!validateMobile(formData.mobile)) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match. Please re-enter.');
      return;
    }

    if (!formData.termsAccepted) {
      setError('You must accept the Terms & Conditions and Risk Disclosures to proceed.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await register({
        name: formData.name.trim(),
        email: formData.email.trim(),
        mobile: formData.mobile.trim(),
        password: formData.password,
        termsAccepted: formData.termsAccepted
      });

      // Guide the investor directly to OTP verification / KYC onboarding
      navigate('/verify-otp', {
        state: {
          email: formData.email,
          mobile: formData.mobile,
          otpCode: res.data?.otpCode
        }
      });
    } catch (err) {
      setError(err.message || 'Registration failed. Please check your information.');
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
      {/* Left Panel: Deep Burgundy Brand Banner */}
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
          <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '24px', fontWeight: '800' }}>
            Connect <span style={{ color: 'var(--color-gold)' }}>Invest</span>
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
          <span>Regulated Intermediary Platform & Institutional Due Diligence</span>
        </div>
      </div>

      {/* Right Panel: Clean Warm Form Panel */}
      <div
        style={{
          flex: 1.1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '36px 32px',
          backgroundColor: 'var(--bg-app)'
        }}
        className="auth-form-panel"
      >
        {/* Header: Back to Home Link & Security Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
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
            <span>Secure Registration Portal</span>
          </div>
        </div>

        {/* Centered Registration Card */}
        <div
          style={{
            maxWidth: '480px',
            width: '100%',
            margin: '0 auto',
            backgroundColor: 'var(--bg-surface)',
            borderRadius: '16px',
            border: '1px solid var(--border-color)',
            padding: '32px 30px',
            boxShadow: '0 8px 30px rgba(59, 10, 17, 0.06)'
          }}
          className="auth-card"
        >
          {/* Multi-step progress indicator matching Image 4 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '20px',
              fontSize: '12.5px',
              fontWeight: '600'
            }}
          >
            <span
              style={{
                backgroundColor: 'rgba(200, 150, 62, 0.15)',
                color: 'var(--color-gold-hover)',
                padding: '4px 12px',
                borderRadius: '20px',
                border: '1px solid rgba(200, 150, 62, 0.3)'
              }}
            >
              Step 1 of 2: Register Account
            </span>
            <span style={{ color: 'var(--text-light)' }}>—</span>
            <span style={{ color: 'var(--text-muted)' }}>2. KYC Verification</span>
          </div>

          <div style={{ marginBottom: '22px' }}>
            <h1
              style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: '26px',
                fontWeight: '800',
                color: 'var(--text-main)',
                marginBottom: '4px'
              }}
            >
              Create Your Account
            </h1>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Complete steps to explore approved projects and track payouts.
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
                marginBottom: '18px'
              }}
            >
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <Input
              label="Full Legal Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full legal name as per PAN"
              required
              autoComplete="name"
            />

            <Input
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g., mail@domain.com"
              required
              autoComplete="email"
            />

            <Input
              label="Mobile Number"
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="98765 43210"
              prefix="+91"
              required
              autoComplete="tel"
            />

            {/* Password with Strength Meter */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }} className="auth-password-grid">
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '600' }}>Password *</label>
                  {formData.password && (
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: '700',
                        color: passwordStrength.color,
                        padding: '1px 6px',
                        borderRadius: '4px',
                        backgroundColor: `${passwordStrength.color}15`
                      }}
                    >
                      {passwordStrength.label}
                    </span>
                  )}
                </div>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                  autoComplete="new-password"
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>
                  Confirm Password *
                </label>
                <Input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  required
                  autoComplete="new-password"
                />
              </div>
            </div>

            {/* T&C Checkbox matching Image 4 */}
            <div style={{ marginTop: '4px' }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', cursor: 'pointer', fontSize: '12.5px', color: 'var(--text-muted)' }}>
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  style={{
                    accentColor: 'var(--color-primary)',
                    width: '16px',
                    height: '16px',
                    marginTop: '2px',
                    cursor: 'pointer'
                  }}
                />
                <span>
                  I agree to the <strong>Terms & Conditions</strong> and understand the <strong>Risk Disclosures</strong>.
                </span>
              </label>
            </div>

            {/* Golden Register Button matching Image 4 */}
            <div style={{ marginTop: '10px' }}>
              <Button
                variant="gold"
                type="submit"
                fullWidth
                size="lg"
                isLoading={isLoading}
              >
                Register & Continue
              </Button>
            </div>
          </form>

          {/* Already registered */}
          <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '13.5px', color: 'var(--text-muted)' }}>
            Already registered?{' '}
            <Link
              to="/login"
              style={{
                color: 'var(--color-primary)',
                fontWeight: '700'
              }}
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Footer info */}
        <div style={{ textAlign: 'center', fontSize: '12px', color: 'var(--text-light)', marginTop: '20px' }}>
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
            min-height: 260px;
            padding: 32px 24px !important;
          }
          .auth-form-panel {
            padding: 24px 16px !important;
          }
          .auth-password-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
