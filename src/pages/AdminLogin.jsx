import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Lock, Mail, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'

export default function AdminLogin() {
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    setLoading(true); setError('')
    try {
      const res = await api.post('/admin/login', data)
      login(res.data.token)
      navigate('/admin')
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'var(--color-bg)' }}
    >
      <div className="card p-8 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: 'rgba(1,105,111,0.1)' }}
          >
            <Lock size={24} style={{ color: 'var(--color-primary)' }} />
          </div>
          <h1 className="font-display text-2xl font-bold" style={{ color: 'var(--color-text)' }}>Admin Login</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>She Can Foundation Dashboard</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="label"><span className="flex items-center gap-1"><Mail size={13}/> Email</span></label>
            <input type="email"
              {...register('email', { required: 'Email is required' })}
              className={`input-field ${errors.email ? 'error' : ''}`}
              placeholder="admin@shecansf.org"
            />
            {errors.email && <p className="error-msg"><AlertCircle size={12}/>{errors.email.message}</p>}
          </div>

          <div>
            <label className="label"><span className="flex items-center gap-1"><Lock size={13}/> Password</span></label>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                {...register('password', { required: 'Password is required' })}
                className={`input-field pr-11 ${errors.password ? 'error' : ''}`}
                placeholder="••••••••"
              />
              <button type="button" onClick={() => setShowPw(p => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-80"
              >
                {showPw ? <EyeOff size={16}/> : <Eye size={16}/>}
              </button>
            </div>
            {errors.password && <p className="error-msg"><AlertCircle size={12}/>{errors.password.message}</p>}
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-xl text-sm"
              style={{ background: 'rgba(161,44,123,0.08)', color: '#a12c7b' }}
            >
              <AlertCircle size={15}/> {error}
            </div>
          )}

          <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3.5 mt-2">
            {loading
              ? <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg> Signing in...</>
              : <><Lock size={15}/> Sign In</>
            }
          </button>
        </form>
      </div>
    </div>
  )
}