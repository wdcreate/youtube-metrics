import { useState } from 'react'

const DESCRIPTION = `go into your personal sanctuary of calm focus with this deep chillstep and lofi
playlist, perfectly curated for studying, coding, and deep work sessions. Whether you need
to concentrate on complex tasks or simply unwind with ambient sound, this mix delivers
hours of uninterrupted focus music.`

const MAX_LENGTH = 140

export default function ChannelInfo() {
  const [subscribed, setSubscribed] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const isLong = DESCRIPTION.length > MAX_LENGTH
  const visibleText = expanded
    ? DESCRIPTION
    : DESCRIPTION.slice(0, MAX_LENGTH)

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between py-4 border-t border-yt-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
            F
          </div>
          <div>
            <p className="text-yt-text text-sm font-semibold">Focusphere</p>
            <p className="text-yt-secondary text-xs mt-0.5">7K subscribers</p>
          </div>
        </div>

        <button
          onClick={() => setSubscribed((prev) => !prev)}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors shrink-0 ${
            subscribed
              ? 'bg-yt-surface hover:bg-yt-surface-hover text-yt-text'
              : 'bg-yt-text hover:bg-white/80 text-yt-bg'
          }`}
        >
          {subscribed ? 'Subscribed' : 'Subscribe'}
        </button>
      </div>

      <div className="bg-yt-surface rounded-xl p-3 hover:bg-yt-surface-hover transition-colors">
        <p className="text-yt-text text-sm">
          <span className="font-medium">
            737,241 views&nbsp;&nbsp;6 months ago&nbsp;&nbsp;
          </span>
          <span className="text-[#3ea6ff]">
            #codingmusic&nbsp;&nbsp;#chillstep&nbsp;&nbsp;#focusmusic
          </span>
        </p>

        <p className="text-yt-secondary text-sm mt-1">
          {visibleText}
          {!expanded && isLong && '...'}
        </p>

        {isLong && (
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="text-yt-text text-sm font-semibold mt-1 cursor-pointer transition-colors hover:text-yt-secondary"
          >
            {expanded ? 'Show less' : 'more'}
          </button>
        )}
      </div>
    </div>
  )
}