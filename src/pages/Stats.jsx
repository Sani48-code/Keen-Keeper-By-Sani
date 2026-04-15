import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
} from 'recharts'
import { useTimeline } from '../context/TimelineContext'

/* Colors matching the screenshot: Text=purple, Call=forest green, Video=medium green */
const TYPE_COLORS = {
  Text:  '#7C3AED',
  Call:  '#1B4332',
  Video: '#52B788',
}

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  const d = payload[0]
  return (
    <div
      className="px-3 py-2 rounded-lg text-xs font-semibold shadow-lg"
      style={{ backgroundColor: '#1B4332', color: '#fff' }}
    >
      {d.name}: {d.value}
    </div>
  )
}

const CustomLegend = ({ payload }) => (
  <div className="flex items-center justify-center gap-6 mt-3 flex-wrap">
    {payload.map(entry => (
      <div key={entry.value} className="flex items-center gap-1.5">
        <span
          className="w-2.5 h-2.5 rounded-full shrink-0"
          style={{ backgroundColor: entry.color }}
        />
        <span className="text-base text-gray-600">{entry.value}</span>
      </div>
    ))}
  </div>
)

export default function Stats() {
  const { getCounts } = useTimeline()
  const counts = getCounts()

  const pieData = [
    { name: 'Text',  value: counts.text  || 0 },
    { name: 'Call',  value: counts.call  || 0 },
    { name: 'Video', value: counts.video || 0 },
  ].filter(d => d.value > 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {/* Page heading */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">
          Friendship Analytics
        </h1>

        {/* Chart card */}
        <div
          className="bg-white rounded-xl px-4 sm:px-6 py-5 sm:py-6"
          style={{ border: '1px solid #E5E7EB' }}
        >
          <p className="text-base font-semibold text-gray-700 mb-4">
            By Interaction Type
          </p>

          {pieData.length === 0 ? (
            <div className="flex flex-col items-center py-16 gap-3">
              <p className="text-gray-400 text-base">
                No interactions logged yet. Start checking in with friends!
              </p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={4}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, i) => (
                    <Cell
                      key={`cell-${i}`}
                      fill={TYPE_COLORS[entry.name] ?? '#9CA3AF'}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend content={<CustomLegend />} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  )
}
