import { createContext, useContext, useState, useCallback } from 'react'

const TimelineContext = createContext(null)

const initialEntries = [
  {
    id: 'init-1',
    friendId: 1,
    friendName: 'Alex Johnson',
    date: '2026-03-15',
    title: 'Call with Alex Johnson',
    type: 'call',
  },
  {
    id: 'init-2',
    friendId: 3,
    friendName: 'Michael Brown',
    date: '2026-04-09',
    title: 'Text with Michael Brown',
    type: 'text',
  },
  {
    id: 'init-3',
    friendId: 2,
    friendName: 'Sarah Williams',
    date: '2026-03-29',
    title: 'Video with Sarah Williams',
    type: 'video',
  },
  {
    id: 'init-4',
    friendId: 6,
    friendName: 'Olivia Taylor',
    date: '2026-04-04',
    title: 'Text with Olivia Taylor',
    type: 'text',
  },
  {
    id: 'init-5',
    friendId: 9,
    friendName: 'William Clark',
    date: '2026-04-11',
    title: 'Call with William Clark',
    type: 'call',
  },
]

export function TimelineProvider({ children }) {
  const [entries, setEntries] = useState(initialEntries)

  const addEntry = useCallback((entry) => {
    const newEntry = {
      ...entry,
      id: `entry-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      date: new Date().toISOString().split('T')[0],
    }
    setEntries((prev) => [newEntry, ...prev])
    return newEntry
  }, [])

  // Use == so numeric friendIds from JSON match string params from useParams
  const getEntriesForFriend = useCallback(
    (friendId) => entries.filter((e) => e.friendId == friendId),
    [entries]
  )

  const getCounts = useCallback(() => {
    return entries.reduce(
      (acc, e) => {
        acc[e.type] = (acc[e.type] || 0) + 1
        return acc
      },
      { call: 0, text: 0, video: 0 }
    )
  }, [entries])

  return (
    <TimelineContext.Provider
      value={{ entries, addEntry, getEntriesForFriend, getCounts }}
    >
      {children}
    </TimelineContext.Provider>
  )
}

export function useTimeline() {
  const ctx = useContext(TimelineContext)
  if (!ctx) throw new Error('useTimeline must be used inside TimelineProvider')
  return ctx
}
