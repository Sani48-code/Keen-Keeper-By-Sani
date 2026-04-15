import callIcon  from '../assets/call.png'
import textIcon  from '../assets/text.png'
import videoIcon from '../assets/video.png'

const TYPE_CONFIG = {
  call:  { icon: callIcon,  label: 'Call'  },
  text:  { icon: textIcon,  label: 'Text'  },
  video: { icon: videoIcon, label: 'Video' },
}

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

function splitTitle(title) {
  const spaceIdx = title.indexOf(' ')
  if (spaceIdx === -1) return { typeWord: title, rest: '' }
  return { typeWord: title.slice(0, spaceIdx), rest: title.slice(spaceIdx) }
}

export default function TimelineItem({ entry, isLast }) {
  const config             = TYPE_CONFIG[entry.type] || TYPE_CONFIG.call
  const { typeWord, rest } = splitTitle(entry.title)

  return (
    <div
      className="flex items-center gap-4 py-4"
      style={!isLast ? { borderBottom: '1px solid #F3F4F6' } : {}}
    >
      {/* Icon circle */}
      <div
        className="flex items-center justify-center w-11 h-11 rounded-full shrink-0"
        style={{ backgroundColor: '#1F2937' }}
      >
        <img
          src={config.icon}
          alt={config.label}
          className="w-5 h-5 object-contain"
          style={{ filter: 'brightness(0) invert(1)' }}
        />
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="text-base text-gray-800 leading-snug">
          <strong>{typeWord}</strong>{rest}
        </p>
        <p className="text-sm text-gray-400 mt-0.5">{formatDate(entry.date)}</p>
      </div>
    </div>
  )
}
