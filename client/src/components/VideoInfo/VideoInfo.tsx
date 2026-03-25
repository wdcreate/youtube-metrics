import { useState } from 'react'

export default function VideoInfo() {
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)

  const handleLike = () => {
    setLiked((prev) => !prev)
    if (disliked) setDisliked(false)
  }

  const handleDislike = () => {
    setDisliked((prev) => !prev)
    if (liked) setLiked(false)
  }

  return (
    <div className="mt-3">
      <h1 className="text-yt-text font-semibold text-base sm:text-lg leading-snug">
        Flow Locked – Deep Chillstep for Studying &amp; Focus
      </h1>

      <div className="flex items-center gap-2 mt-1">
        <span className="text-yt-secondary text-sm">737K views</span>
        <span className="text-yt-secondary text-sm">·</span>
        <span className="text-yt-secondary text-sm">6 months ago</span>
      </div>

      <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1 no-scrollbar">
        <div className="flex items-center bg-yt-surface rounded-full overflow-hidden shrink-0">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 hover:bg-yt-surface-hover transition-colors ${liked ? 'text-white' : 'text-yt-text'}`}
          >
            <img src="/icons/thumb-up.svg" width="20" height="20" alt="" className="invert" />
            <span className="text-sm font-medium">7.6K</span>
          </button>
          <div className="w-px h-5 bg-yt-border" />
          <button
            onClick={handleDislike}
            className={`px-3 py-2 hover:bg-yt-surface-hover transition-colors ${disliked ? 'text-white' : 'text-yt-text'}`}
          >
            <img src="/icons/thumb-down.svg" width="20" height="20" alt="" className="invert" />
          </button>
        </div>

        <button className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-yt-surface hover:bg-yt-surface-hover rounded-full text-yt-text text-sm font-medium transition-colors shrink-0">
          <img src="/icons/share.svg" width="18" height="18" alt="" className="invert" />
          Share
        </button>

        <button className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-yt-surface hover:bg-yt-surface-hover rounded-full text-yt-text text-sm font-medium transition-colors shrink-0">
          <img src="/icons/save.svg" width="18" height="18" alt="" className="invert" />
          Save
        </button>

        <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-yt-surface hover:bg-yt-surface-hover rounded-full text-yt-text text-sm font-medium transition-colors shrink-0">
          <img src="/icons/clip.svg" width="18" height="18" alt="" className="invert" />
          Clip
        </button>

        <button className="w-9 h-9 flex items-center justify-center bg-yt-surface hover:bg-yt-surface-hover rounded-full text-yt-text transition-colors shrink-0">
          <img src="/icons/more.svg" width="20" height="20" alt="" className="invert" />
        </button>
      </div>
    </div>
  )
}
