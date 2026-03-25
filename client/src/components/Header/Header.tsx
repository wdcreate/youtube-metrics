import { useState } from 'react'
import { SearchBar } from './SearchBar'

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false)

  if (searchOpen) {
    return (
      <header className="sticky top-0 z-20 flex items-center gap-2 px-2 h-14 bg-yt-bg md:hidden">
        <button
          onClick={() => setSearchOpen(false)}
          className="p-2 rounded-full hover:bg-yt-surface text-yt-text transition-colors shrink-0"
        >
          <img src="/icons/arrow-back.svg" width="22" height="22" alt="" className="invert" />
        </button>

        <SearchBar autoFocus />

        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-yt-surface text-yt-text shrink-0">
          <img src="/icons/mic.svg" width="20" height="20" alt="" className="invert" />
        </button>
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between px-2 sm:px-4 h-14 bg-yt-bg">
      <div className="flex items-center gap-2 sm:gap-4">
        <button className="p-2 rounded-full hover:bg-yt-surface text-yt-text transition-colors">
          <img src="/icons/hamburger.svg" width="22" height="22" alt="" className="invert" />
        </button>
        <div className="flex items-center gap-1.5 cursor-pointer select-none">
          <img src="/icons/logo.svg" width="80" height="18" alt="YouTube" />
          <span className="text-yt-text font-semibold text-base tracking-tighter hidden sm:inline">
            YouTube
          </span>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-2 flex-1 max-w-2xl mx-4">
        <SearchBar withHover />
        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-yt-surface hover:bg-yt-surface-hover text-yt-text transition-colors">
          <img src="/icons/mic.svg" width="20" height="20" alt="" className="invert" />
        </button>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => setSearchOpen(true)}
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-yt-surface text-yt-text transition-colors"
        >
          <img src="/icons/search.svg" width="20" height="20" alt="" className="invert" />
        </button>

        <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-yt-border hover:bg-yt-surface text-yt-text text-sm font-medium transition-colors">
          <img src="/icons/create.svg" width="18" height="18" alt="" className="invert" />
          <span className="hidden lg:inline">Create</span>
        </button>

        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-yt-surface text-yt-text transition-colors">
          <img src="/icons/bell.svg" width="22" height="22" alt="" className="invert" />
        </button>
        <button className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-600 text-white text-sm font-bold">
          U
        </button>
      </div>
    </header>
  )
}