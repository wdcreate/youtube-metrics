import { VideoCardData } from "../../types/videocard";

export default function VideoCard({
  title,
  channel,
  views,
  timeAgo,
  duration,
  thumbnail,
}: VideoCardData) {
  return (
    <div className="flex gap-2 cursor-pointer rounded-xl hover:bg-yt-surface p-2 -mx-2 transition-colors">
      <div className="relative shrink-0 w-[168px] lg:w-40">
        <img
          src={thumbnail}
          alt={title}
          className="w-full aspect-video object-cover rounded-lg"
          loading="lazy"
        />
        <span className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 py-0.5 rounded font-medium">
          {duration}
        </span>
      </div>

      <div className="flex flex-col min-w-0 pt-0.5">
        <p className="text-yt-text text-sm font-medium leading-snug line-clamp-2">{title}</p>
        <p className="text-yt-secondary text-xs mt-1">{channel}</p>
        <p className="text-yt-secondary text-xs">
          {views} · {timeAgo}
        </p>
      </div>
    </div>
  )
}
