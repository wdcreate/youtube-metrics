export function SearchBar({ autoFocus = false, withHover = false }) {
  return (
    <div className="flex flex-1 h-10 rounded-full border border-yt-border overflow-hidden">
      <input
        autoFocus={autoFocus}
        type="text"
        placeholder="Search"
        className="flex-1 bg-[#121212] px-4 text-yt-text text-sm outline-none placeholder:text-yt-secondary"
      />
      <button
        className={`px-4 bg-yt-surface border-l border-yt-border text-yt-secondary ${
          withHover ? 'hover:bg-yt-surface-hover transition-colors' : ''
        }`}
      >
        <img src="/icons/search.svg" width="20" height="20" alt="" className="invert" />
      </button>
    </div>
  )
}
