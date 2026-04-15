import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import FriendCard      from '../components/FriendCard'
import SummaryCard     from '../components/SummaryCard'
import AddFriendModal  from '../components/AddFriendModal'
import { useTimeline } from '../context/TimelineContext'
import { useFriends }  from '../context/FriendsContext'

const FOREST = '#1B4332'

function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-28 gap-4">
      <div
        className="w-12 h-12 rounded-full border-4 animate-spin"
        style={{ borderColor: '#E5E7EB', borderTopColor: FOREST }}
      />
      <p className="text-base text-gray-400">Loading friends…</p>
    </div>
  )
}

export default function Home() {
  const [loading,     setLoading]     = useState(true)
  const [showModal,   setShowModal]   = useState(false)
  const { friends, addFriend } = useFriends()
  const { entries } = useTimeline()

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(t)
  }, [])

  const onTrack  = friends.filter(f => f.status === 'on-track').length
  const needAttn = friends.filter(f => f.status === 'overdue' || f.status === 'almost due').length

  const now = new Date()
  const thisMonth = entries.filter(e => {
    const d = new Date(e.date + 'T00:00:00')
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  }).length

  const summaryCards = [
    { label: 'Total Friends',           value: friends.length },
    { label: 'On Track',                value: onTrack        },
    { label: 'Need Attention',          value: needAttn       },
    { label: 'Interactions This Month', value: thisMonth      },
  ]

  const handleAdd = (data) => {
    addFriend(data)
    toast.success(`${data.name} added to your friends!`)
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── BANNER ─────────────────────────────────────── */}
      <section className="bg-white">
        <div className="max-w-4xl mx-auto px-8 pt-16 pb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Friends to keep close in your life
          </h1>
          <p className="text-base text-gray-500 mt-4 max-w-lg mx-auto leading-relaxed">
            Your personal shelf of meaningful connections. Browse, tend, and nurture
            the relationships that matter most.
          </p>

          <button
            onClick={() => setShowModal(true)}
            className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-md text-white text-base font-semibold transition-opacity hover:opacity-90 active:opacity-80"
            style={{ backgroundColor: FOREST }}
          >
            + Add a Friend
          </button>

          {/* Summary cards */}
          {!loading && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-12">
              {summaryCards.map(c => (
                <SummaryCard key={c.label} label={c.label} value={c.value} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── FRIENDS GRID ───────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-8 py-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Friends</h2>

        {loading ? (
          <LoadingSpinner />
        ) : friends.length === 0 ? (
          <div className="flex flex-col items-center py-20 gap-3">
            <p className="text-gray-400 text-base">No friends yet. Add your first one!</p>
            <button
              onClick={() => setShowModal(true)}
              className="px-5 py-2.5 rounded-md text-white text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ backgroundColor: FOREST }}
            >
              + Add a Friend
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {friends.map(f => <FriendCard key={f.id} friend={f} />)}
          </div>
        )}
      </section>

      {/* ── ADD FRIEND MODAL ───────────────────────────── */}
      {showModal && (
        <AddFriendModal
          onClose={() => setShowModal(false)}
          onAdd={handleAdd}
        />
      )}

    </div>
  )
}
