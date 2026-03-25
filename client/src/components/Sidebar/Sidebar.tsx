import { useState } from 'react'
import VideoCard from './VideoCard'
import { TABS, VIDEOS } from './data/sidebarData'

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState('All')

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`shrink-0 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab
                ? 'bg-yt-text text-yt-bg'
                : 'bg-yt-surface text-yt-text hover:bg-yt-surface-hover'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-1">
        {VIDEOS.map((video) => (
          <VideoCard key={video.id} {...video} />
        ))}
      </div>
    </div>
  )
}
