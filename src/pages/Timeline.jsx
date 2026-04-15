import { useState } from 'react'
import { useTimeline } from '../context/TimelineContext'
import TimelineItem from '../components/TimelineItem'

export default function Timeline() {
  const { entries } = useTimeline()
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all'
    ? entries
    : entries.filter(e => e.type === filter)

  const sorted = [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {/* Page heading */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">Timeline</h1>

        {/* Dropdown filter */}
        <div className="relative inline-block mb-5 sm:mb-7">
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="appearance-none bg-white text-base text-gray-600 font-medium pl-4 pr-10 py-3 rounded-md cursor-pointer outline-none transition-colors hover:bg-gray-50"
            style={{ border: '1px solid #E5E7EB' }}
          >
            <option value="all">Filter Timeline</option>
            <option value="call">Call</option>
            <option value="text">Text</option>
            <option value="video">Video</option>
          </select>
          {/* Custom chevron */}
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </div>

        {/* List */}
        {sorted.length === 0 ? (
          <div className="flex flex-col items-center py-20 gap-3">
            <p className="text-gray-400 text-base font-medium">No interactions yet.</p>
            <p className="text-gray-400 text-base text-center max-w-xs">
              Head to a friend's profile and log a check-in.
            </p>
          </div>
        ) : (
          <div
            className="bg-white rounded-xl overflow-hidden"
            style={{ border: '1px solid #E5E7EB' }}
          >
            {sorted.map((entry, idx) => (
              <div key={entry.id} className="px-6">
                <TimelineItem
                  entry={entry}
                  isLast={idx === sorted.length - 1}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
