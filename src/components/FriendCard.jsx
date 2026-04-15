import { useNavigate } from 'react-router-dom'

const STATUS_CONFIG = {
  overdue:      { label: 'Overdue',    color: '#EF4444', bg: '#FEF2F2' },
  'almost due': { label: 'Almost Due', color: '#F59E0B', bg: '#FFFBEB' },
  'on-track':   { label: 'On Track',   color: '#10B981', bg: '#ECFDF5' },
}

export default function FriendCard({ friend }) {
  const navigate = useNavigate()
  const status   = STATUS_CONFIG[friend.status] || STATUS_CONFIG['on-track']

  return (
    <article
      onClick={() => navigate(`/friend/${friend.id}`)}
      onKeyDown={e => e.key === 'Enter' && navigate(`/friend/${friend.id}`)}
      role="button"
      tabIndex={0}
      aria-label={`View ${friend.name}`}
      className="bg-white rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 flex flex-col items-center text-center p-4 sm:p-5 lg:p-6 gap-3"
      style={{ border: '1px solid #E5E7EB' }}
    >
      {/* Circular avatar */}
      <img
        src={friend.picture}
        alt={friend.name}
        className="w-20 h-20 rounded-full object-cover bg-gray-100"
        style={{ border: '2px solid #E5E7EB' }}
      />

      {/* Name */}
      <h3 className="font-bold text-base text-gray-900 leading-tight mt-1">
        {friend.name}
      </h3>

      {/* Days since contact */}
      <p className="text-sm text-gray-400">{friend.days_since_contact}d ago</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 justify-center">
        {friend.tags.slice(0, 2).map(tag => (
          <span
            key={tag}
            className="text-sm px-2.5 py-0.5 rounded-full font-medium"
            style={{ backgroundColor: '#ECFDF5', color: '#065F46' }}
          >
            {tag.toUpperCase()}
          </span>
        ))}
      </div>

      {/* Status badge */}
      <span
        className="mt-1 text-sm font-semibold px-4 py-1.5 rounded-full"
        style={{ color: status.color, backgroundColor: status.bg }}
      >
        {status.label}
      </span>
    </article>
  )
}
