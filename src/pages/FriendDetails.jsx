import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useTimeline } from '../context/TimelineContext'
import { useFriends } from '../context/FriendsContext'
import TimelineItem from '../components/TimelineItem'
import StatsCard    from '../components/StatsCard'
import callIcon  from '../assets/call.png'
import textIcon  from '../assets/text.png'
import videoIcon from '../assets/video.png'

const STATUS_CONFIG = {
  overdue:      { label: 'Overdue',    color: '#EF4444', bg: '#FEF2F2' },
  'almost due': { label: 'Almost Due', color: '#F59E0B', bg: '#FFFBEB' },
  'on-track':   { label: 'On Track',   color: '#10B981', bg: '#ECFDF5' },
}

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const FOREST = '#1B4332'

export default function FriendDetails() {
  const { id }     = useParams()
  const navigate   = useNavigate()
  const { addEntry, getEntriesForFriend } = useTimeline()
  const { getFriendById, deleteFriend, archiveFriend, snoozeFriend } = useFriends()
  const [busy, setBusy]           = useState(null)
  const [actionBusy, setActionBusy] = useState(null)

  const friend = getFriendById(id)

  if (!friend) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-2xl font-bold text-gray-700">Friend not found</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 rounded-md text-white text-base font-semibold"
          style={{ backgroundColor: FOREST }}
        >
          Back to Home
        </button>
      </div>
    )
  }

  const status        = STATUS_CONFIG[friend.status] || STATUS_CONFIG['on-track']
  const friendEntries = getEntriesForFriend(friend.id)

  const handleCheckIn = (type) => {
    setBusy(type)
    const label = type.charAt(0).toUpperCase() + type.slice(1)
    setTimeout(() => {
      addEntry({ friendId: friend.id, friendName: friend.name, title: `${label} with ${friend.name}`, type })
      toast.success(`${label} logged with ${friend.name}!`)
      setBusy(null)
    }, 350)
  }

  const handleSnooze = () => {
    setActionBusy('snooze')
    setTimeout(() => {
      snoozeFriend(friend.id)
      toast.success(`Snoozed — ${friend.name} due in 2 more weeks`)
      setActionBusy(null)
    }, 300)
  }

  const handleArchive = () => {
    setActionBusy('archive')
    setTimeout(() => {
      archiveFriend(friend.id)
      toast.success(`${friend.name} archived`)
      navigate('/')
    }, 300)
  }

  const handleDelete = () => {
    setActionBusy('delete')
    setTimeout(() => {
      deleteFriend(friend.id)
      toast.success(`${friend.name} deleted`)
      navigate('/')
    }, 300)
  }

  const actionButtons = [
    { key: 'snooze',  label: 'Snooze 2 Weeks', icon: '🔔', textClass: 'text-gray-700', borderColor: '#E5E7EB', onClick: handleSnooze  },
    { key: 'archive', label: 'Archive',         icon: '🗃',  textClass: 'text-gray-700', borderColor: '#E5E7EB', onClick: handleArchive },
    { key: 'delete',  label: 'Delete',          icon: '🗑',  textClass: 'text-red-500',  borderColor: '#FECACA', onClick: handleDelete  },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-5 sm:gap-6 lg:gap-7">

          {/* ── LEFT COLUMN ──────────────────────────────── */}
          <div className="flex flex-col gap-5">

            {/* Profile card */}
            <div
              className="bg-white rounded-xl p-5 sm:p-7 flex flex-col items-center text-center gap-4"
              style={{ border: '1px solid #E5E7EB' }}
            >
              {/* Circular avatar */}
              <img
                src={friend.picture}
                alt={friend.name}
                className="w-24 h-24 rounded-full object-cover"
                style={{ border: '2px solid #E5E7EB' }}
              />

              {/* Name */}
              <p className="font-bold text-gray-900 text-xl leading-snug">
                {friend.name}
              </p>

              {/* Status badge */}
              <span
                className="text-sm font-bold px-4 py-1.5 rounded-full"
                style={{ color: status.color, backgroundColor: status.bg }}
              >
                {status.label}
              </span>

              {/* First tag */}
              {friend.tags[0] && (
                <span
                  className="text-sm font-bold px-4 py-1.5 rounded-full tracking-wide"
                  style={{ backgroundColor: '#D1FAE5', color: '#065F46' }}
                >
                  {friend.tags[0].toUpperCase()}
                </span>
              )}

              {/* Bio */}
              <p className="text-base text-gray-400 italic leading-relaxed">
                "{friend.bio}"
              </p>

              {/* Preferred contact */}
              <p className="text-sm text-gray-400">Preferred: email</p>
            </div>

            {/* Action buttons */}
            {actionButtons.map(({ key, label, icon, textClass, borderColor, onClick }) => (
              <button
                key={key}
                onClick={onClick}
                disabled={actionBusy !== null}
                className={`w-full bg-white flex items-center gap-3 px-6 py-4 rounded-xl text-base font-medium transition-colors hover:bg-gray-50 disabled:opacity-60 disabled:cursor-not-allowed ${textClass}`}
                style={{ border: `1px solid ${borderColor}` }}
              >
                {actionBusy === key ? (
                  <span
                    className="w-5 h-5 rounded-full border-2 animate-spin shrink-0"
                    style={{ borderColor: '#E5E7EB', borderTopColor: FOREST }}
                  />
                ) : (
                  <span className="text-lg">{icon}</span>
                )}
                {label}
              </button>
            ))}
          </div>

          {/* ── RIGHT COLUMN ─────────────────────────────── */}
          <div className="flex flex-col gap-6">

            {/* 3 stat cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5">
              <StatsCard label="Days Since Contact" value={friend.days_since_contact} />
              <StatsCard label="Goal (Days)"        value={friend.goal}               />
              <StatsCard label="Next Due"            value={formatDate(friend.next_due_date)} />
            </div>

            {/* Relationship Goal */}
            <div
              className="bg-white rounded-xl px-4 sm:px-6 md:px-7 py-5 sm:py-6"
              style={{ border: '1px solid #E5E7EB' }}
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-base font-semibold text-gray-800">Relationship Goal</p>
                <button
                  className="text-sm font-medium px-4 py-2 rounded-md transition-colors hover:bg-gray-100"
                  style={{ border: '1px solid #E5E7EB', color: '#374151' }}
                >
                  Edit
                </button>
              </div>
              <p className="text-base text-gray-600">
                Connect every <strong>{friend.goal} days</strong>
              </p>
            </div>

            {/* Quick Check-In */}
            <div
              className="bg-white rounded-xl px-4 sm:px-6 md:px-7 py-5 sm:py-6"
              style={{ border: '1px solid #E5E7EB' }}
            >
              <p className="text-base font-semibold text-gray-800 mb-5">Quick Check-In</p>

              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {[
                  { type: 'call',  icon: callIcon,  label: 'Call'  },
                  { type: 'text',  icon: textIcon,  label: 'Text'  },
                  { type: 'video', icon: videoIcon, label: 'Video' },
                ].map(({ type, icon, label }) => (
                  <button
                    key={type}
                    onClick={() => handleCheckIn(type)}
                    disabled={busy !== null}
                    className="flex flex-col items-center gap-3 py-6 rounded-xl text-base font-medium text-gray-700 transition-all hover:bg-gray-50 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ border: '1px solid #E5E7EB', backgroundColor: '#fff' }}
                  >
                    {busy === type ? (
                      <span
                        className="w-7 h-7 rounded-full border-2 animate-spin"
                        style={{ borderColor: '#E5E7EB', borderTopColor: FOREST }}
                      />
                    ) : (
                      <img src={icon} alt={label} className="w-8 h-8 object-contain" />
                    )}
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Interaction history */}
            {friendEntries.length > 0 && (
              <div
                className="bg-white rounded-xl px-4 sm:px-6 md:px-7 py-5 sm:py-6"
                style={{ border: '1px solid #E5E7EB' }}
              >
                <p className="text-base font-semibold text-gray-800 mb-3">
                  Interaction History
                </p>
                {friendEntries.map((entry, idx) => (
                  <TimelineItem
                    key={entry.id}
                    entry={entry}
                    isLast={idx === friendEntries.length - 1}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
