import { useState } from 'react'

const FOREST = '#1B4332'

const INITIAL_FORM = {
  name:    '',
  email:   '',
  bio:     '',
  tags:    '',
  goal:    '14',
  picture: '',
}

export default function AddFriendModal({ onClose, onAdd }) {
  const [form, setForm]         = useState(INITIAL_FORM)
  const [errors, setErrors]     = useState({})
  const [submitting, setSubmitting] = useState(false)

  const setField = (key, val) => {
    setForm(prev => ({ ...prev, [key]: val }))
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    const g = Number(form.goal)
    if (!form.goal || isNaN(g) || g < 1) e.goal = 'Enter a valid number of days (min 1)'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setSubmitting(true)
    setTimeout(() => {
      const goalDays = Number(form.goal)
      const due = new Date()
      due.setDate(due.getDate() + goalDays)

      const tags = form.tags
        .split(',')
        .map(t => t.trim())
        .filter(Boolean)

      const picture = form.picture.trim()
        || `https://ui-avatars.com/api/?name=${encodeURIComponent(form.name.trim())}&background=1B4332&color=fff&size=200&bold=true`

      onAdd({
        name:               form.name.trim(),
        email:              form.email.trim(),
        bio:                form.bio.trim() || 'A new connection.',
        tags:               tags.length ? tags : ['friend'],
        goal:               goalDays,
        picture,
        days_since_contact: 0,
        status:             'on-track',
        next_due_date:      due.toISOString().split('T')[0],
      })

      setSubmitting(false)
      onClose()
    }, 300)
  }

  const inputClass = (err) =>
    `w-full px-4 py-3 rounded-lg text-base text-gray-800 outline-none transition-colors focus:ring-2 focus:ring-opacity-30`

  const inputStyle = (err) => ({
    border: `1.5px solid ${err ? '#EF4444' : '#E5E7EB'}`,
    focusRingColor: FOREST,
  })

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[92vh] overflow-y-auto shadow-2xl">

        {/* ── Header ── */}
        <div
          className="flex items-center justify-between px-5 sm:px-7 pt-5 sm:pt-7 pb-4 sm:pb-5"
          style={{ borderBottom: '1px solid #F3F4F6' }}
        >
          <div>
            <h2 className="text-xl font-bold text-gray-900">Add a Friend</h2>
            <p className="text-sm text-gray-400 mt-0.5">Fill in the details below</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 transition-colors text-2xl leading-none"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* ── Form ── */}
        <form onSubmit={handleSubmit} className="px-5 sm:px-7 py-5 sm:py-6 flex flex-col gap-5">

          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={e => setField('name', e.target.value)}
              placeholder="e.g. John Smith"
              className={inputClass(errors.name)}
              style={inputStyle(errors.name)}
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={e => setField('email', e.target.value)}
              placeholder="john@example.com"
              className={inputClass(false)}
              style={inputStyle(false)}
            />
          </div>

          {/* Bio */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">Bio</label>
            <textarea
              value={form.bio}
              onChange={e => setField('bio', e.target.value)}
              placeholder="How did you meet? What do you do together?"
              rows={3}
              className={`${inputClass(false)} resize-none`}
              style={inputStyle(false)}
            />
          </div>

          {/* Tags */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">
              Tags{' '}
              <span className="text-gray-400 font-normal">(comma-separated)</span>
            </label>
            <input
              type="text"
              value={form.tags}
              onChange={e => setField('tags', e.target.value)}
              placeholder="e.g. college, close friend, gym"
              className={inputClass(false)}
              style={inputStyle(false)}
            />
          </div>

          {/* Goal + Picture row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">
                Goal <span className="text-gray-400 font-normal">(days)</span>
              </label>
              <input
                type="number"
                min="1"
                value={form.goal}
                onChange={e => setField('goal', e.target.value)}
                className={inputClass(errors.goal)}
                style={inputStyle(errors.goal)}
              />
              {errors.goal && (
                <p className="text-xs text-red-500">{errors.goal}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">
                Picture URL{' '}
                <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                type="url"
                value={form.picture}
                onChange={e => setField('picture', e.target.value)}
                placeholder="https://…"
                className={inputClass(false)}
                style={inputStyle(false)}
              />
            </div>
          </div>

          {/* Picture preview */}
          {form.picture && (
            <div className="flex items-center gap-3">
              <img
                src={form.picture}
                alt="preview"
                className="w-12 h-12 rounded-full object-cover"
                style={{ border: '2px solid #E5E7EB' }}
                onError={e => { e.target.style.display = 'none' }}
              />
              <p className="text-xs text-gray-400">Photo preview</p>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-lg text-base font-medium text-gray-600 transition-colors hover:bg-gray-50"
              style={{ border: '1.5px solid #E5E7EB' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 py-3 rounded-lg text-base font-semibold text-white transition-opacity hover:opacity-90 active:opacity-80 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ backgroundColor: FOREST }}
            >
              {submitting ? 'Adding…' : 'Add Friend'}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}
