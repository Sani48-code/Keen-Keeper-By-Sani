import { createContext, useContext, useState, useCallback } from 'react'
import friendsData from '../data/friends.json'

const FriendsContext = createContext(null)

export function FriendsProvider({ children }) {
  const [friends, setFriends] = useState(friendsData)

  const deleteFriend = useCallback((id) => {
    setFriends(prev => prev.filter(f => f.id != id))
  }, [])

  const archiveFriend = useCallback((id) => {
    setFriends(prev => prev.filter(f => f.id != id))
  }, [])

  const snoozeFriend = useCallback((id) => {
    setFriends(prev => prev.map(f => {
      if (f.id != id) return f
      const due = new Date(f.next_due_date + 'T00:00:00')
      due.setDate(due.getDate() + 14)
      return {
        ...f,
        next_due_date: due.toISOString().split('T')[0],
        status: 'on-track',
      }
    }))
  }, [])

  const addFriend = useCallback((data) => {
    setFriends(prev => {
      const maxId = prev.reduce((m, f) => Math.max(m, f.id), 0)
      return [...prev, { ...data, id: maxId + 1 }]
    })
  }, [])

  const getFriendById = useCallback((id) => {
    return friends.find(f => f.id == id) || null
  }, [friends])

  return (
    <FriendsContext.Provider value={{ friends, addFriend, deleteFriend, archiveFriend, snoozeFriend, getFriendById }}>
      {children}
    </FriendsContext.Provider>
  )
}

export function useFriends() {
  const ctx = useContext(FriendsContext)
  if (!ctx) throw new Error('useFriends must be used inside FriendsProvider')
  return ctx
}
