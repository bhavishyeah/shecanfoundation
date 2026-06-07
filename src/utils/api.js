import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' }
})

// Auto-attach JWT for admin routes
api.interceptors.request.use(config => {
  const token = sessionStorage.getItem('scf_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default api