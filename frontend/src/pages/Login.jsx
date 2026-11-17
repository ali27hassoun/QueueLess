import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Lock, ArrowRight } from 'lucide-react'
import queuelessLogo from '../assets/queueless-logo.png'
import '../styles/Login.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    if (
      email === 'student@queueless.com' &&
      password === 'student123'
    ) {
      sessionStorage.setItem('queuelessUser', email)
      setError('')
      navigate('/dashboard')
    } else {
      setError('Invalid email or password. Please try again.')
    }
  }

  return (
    <main className="login-page">
      <section className="login-brand">
        <div className="brand-content">
          <img
            src={queuelessLogo}
            alt="QueueLess"
            className="brand-logo"
          />

          <div className="brand-message">
            <span className="brand-tag">
              UNIVERSITY QUEUE MANAGEMENT
            </span>

            <h1>
              Your time matters.
              <br />
              Your queue shouldn't.
            </h1>

            <p>
              Skip the uncertainty. Manage your university service
              queues with a smarter, simpler experience.
            </p>
          </div>

          <div className="brand-footer">
            © 2026 QueueLess. All rights reserved.
          </div>
        </div>
      </section>

      <section className="login-section">
        <div className="login-container">
          <div className="login-heading">
            <span className="welcome-label">WELCOME BACK</span>
            <h2>Sign in to your account</h2>
            <p>Enter your university credentials to continue.</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">University Email</label>

              <div className="input-wrapper">
                <Mail size={19} />

                <input
                  id="email"
                  type="email"
                  placeholder="student@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>

              <div className="input-wrapper">
                <Lock size={19} />

                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {error && <p className="login-error">{error}</p>}

            <button type="submit" className="login-button">
              Sign In
              <ArrowRight size={19} />
            </button>
          </form>

          <div className="login-note">
            <span>SECURE STUDENT ACCESS</span>
            <p>QueueLess · University Services Portal</p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Login