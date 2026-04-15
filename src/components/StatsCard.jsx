export default function StatsCard({ label, value }) {
  return (
    <div
      className="bg-white flex flex-col items-center justify-center py-8 px-5 rounded-xl"
      style={{ border: '1px solid #E5E7EB' }}
    >
      <p className="text-4xl font-bold text-gray-900 leading-none text-center">
        {value}
      </p>
      <p className="text-base text-gray-500 mt-2.5 text-center">{label}</p>
    </div>
  )
}
