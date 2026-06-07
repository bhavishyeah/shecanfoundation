import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut, Inbox, Users, Trash2, CheckCircle, RefreshCw, Search, Filter } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'
import toast from 'react-hot-toast'

const TABS = ['submissions', 'volunteers']

export default function AdminDashboard() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [tab, setTab] = useState('submissions')
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const endpoint = tab === 'submissions' ? '/admin/submissions' : '/admin/volunteers'
      const res = await api.get(endpoint)
      setData(res.data.data || [])
    } catch {
      toast.error('Failed to load data')
    } finally {
      setLoading(false)
    }
  }, [tab])

  useEffect(() => { fetchData() }, [fetchData])

  const handleDelete = async (id) => {
    if (!confirm('Delete this entry?')) return
    try {
      await api.delete(`/admin/${tab === 'submissions' ? 'submissions' : 'volunteers'}/${id}`)
      toast.success('Deleted successfully')
      setData(d => d.filter(i => i._id !== id))
    } catch {
      toast.error('Delete failed')
    }
  }

  const handleMarkReviewed = async (id) => {
    try {
      await api.patch(`/admin/submissions/${id}`, { status: 'reviewed' })
      toast.success('Marked as reviewed')
      setData(d => d.map(i => i._id === id ? { ...i, status: 'reviewed' } : i))
    } catch {
      toast.error('Update failed')
    }
  }

  const handleLogout = () => { logout(); navigate('/admin/login') }

  const filtered = data.filter(item => {
    const matchSearch = search
      ? item.name?.toLowerCase().includes(search.toLowerCase()) ||
        item.email?.toLowerCase().includes(search.toLowerCase())
      : true
    const matchStatus = filterStatus === 'all' ? true : item.status === filterStatus
    return matchSearch && matchStatus
  })

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg)' }}>
      {/* Header */}
      <header className="border-b sticky top-0 z-40 backdrop-blur-xl"
        style={{ background: 'rgba(249,248,245,0.92)', borderColor: 'var(--color-border)' }}
      >
        <div className="container-wide px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
              <circle cx="18" cy="18" r="17" stroke="var(--color-primary)" strokeWidth="2"/>
              <path d="M10 22 C10 16, 14 12, 18 12 C22 12, 26 16, 26 20" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
              <circle cx="18" cy="10" r="2.5" fill="var(--color-primary)"/>
              <path d="M13 26 L18 22 L23 26" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
            <div>
              <h1 className="font-display font-bold text-base" style={{ color: 'var(--color-text)' }}>Admin Dashboard</h1>
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>She Can Foundation</p>
            </div>
          </div>
          <button onClick={handleLogout} className="btn-outline text-sm px-4 py-2 flex items-center gap-2">
            <LogOut size={14}/> Logout
          </button>
        </div>
      </header>

      <main className="container-wide px-4 py-8">
        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Submissions', value: data.length, icon: Inbox },
            { label: 'New', value: data.filter(d => d.status === 'new').length, icon: Filter },
            { label: 'Reviewed', value: data.filter(d => d.status === 'reviewed').length, icon: CheckCircle },
            { label: 'Volunteers', value: tab === 'volunteers' ? data.length : '—', icon: Users },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="card p-4">
              <div className="flex items-center gap-2 mb-1">
                <Icon size={16} style={{ color: 'var(--color-primary)' }} />
                <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{label}</span>
              </div>
              <div className="font-display font-bold text-2xl" style={{ color: 'var(--color-text)' }}>{value}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 p-1 rounded-xl w-fit"
          style={{ background: 'var(--color-border)' }}
        >
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className="px-5 py-2 rounded-lg text-sm font-medium capitalize transition-all duration-200"
              style={{
                background: tab === t ? 'var(--color-surface)' : 'transparent',
                color: tab === t ? 'var(--color-text)' : 'var(--color-text-muted)',
                boxShadow: tab === t ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
              }}
            >
              {t === 'submissions' ? <span className="flex items-center gap-1.5"><Inbox size={14}/> Messages</span>
                : <span className="flex items-center gap-1.5"><Users size={14}/> Volunteers</span>}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-muted)' }} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name or email..."
              className="input-field pl-9 py-2 text-sm w-64"
            />
          </div>
          {tab === 'submissions' && (
            <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
              className="input-field py-2 text-sm w-36"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="reviewed">Reviewed</option>
            </select>
          )}
          <button onClick={fetchData} className="btn-outline py-2 px-4 text-sm flex items-center gap-1.5">
            <RefreshCw size={14}/> Refresh
          </button>
        </div>

        {/* Table */}
        {loading ? (
          <div className="space-y-3">
            {[1,2,3,4].map(i => <div key={i} className="skeleton h-16 w-full"/>)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="card text-center py-16">
            <Inbox size={40} className="mx-auto mb-3 opacity-30" />
            <p style={{ color: 'var(--color-text-muted)' }}>No {tab} found.</p>
          </div>
        ) : (
          <div className="card overflow-hidden p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left" style={{ borderColor: 'var(--color-border)' }}>
                    {['Name', 'Email', tab === 'submissions' ? 'Message' : 'Interest', 'Date', 'Status', 'Actions'].map(h => (
                      <th key={h} className="px-4 py-3 font-semibold text-xs uppercase tracking-wider"
                        style={{ color: 'var(--color-text-muted)' }}
                      >{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ divideColor: 'var(--color-border)' }}>
                  {filtered.map(item => (
                    <tr key={item._id} className="hover:opacity-80 transition-opacity">
                      <td className="px-4 py-3 font-medium" style={{ color: 'var(--color-text)' }}>{item.name}</td>
                      <td className="px-4 py-3" style={{ color: 'var(--color-text-muted)' }}>{item.email}</td>
                      <td className="px-4 py-3 max-w-xs" style={{ color: 'var(--color-text-muted)' }}>
                        <p className="truncate">{item.message || item.interest || '—'}</p>
                      </td>
                      <td className="px-4 py-3 text-xs whitespace-nowrap" style={{ color: 'var(--color-text-muted)' }}>
                        {new Date(item.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium"
                          style={{
                            background: item.status === 'reviewed' ? 'rgba(67,122,34,0.1)' : 'rgba(1,105,111,0.1)',
                            color: item.status === 'reviewed' ? '#437a22' : 'var(--color-primary)'
                          }}
                        >{item.status || 'new'}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {tab === 'submissions' && item.status !== 'reviewed' && (
                            <button onClick={() => handleMarkReviewed(item._id)}
                              className="p-1.5 rounded-lg hover:opacity-70 transition-opacity"
                              title="Mark reviewed"
                              style={{ background: 'rgba(67,122,34,0.1)', color: '#437a22' }}
                            >
                              <CheckCircle size={14}/>
                            </button>
                          )}
                          <button onClick={() => handleDelete(item._id)}
                            className="p-1.5 rounded-lg hover:opacity-70 transition-opacity"
                            title="Delete"
                            style={{ background: 'rgba(161,44,123,0.08)', color: '#a12c7b' }}
                          >
                            <Trash2 size={14}/>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}