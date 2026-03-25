import { type RefObject } from 'react'

const VIDEO_SRC =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'

interface VideoPlayerProps {
  videoRef: RefObject<HTMLVideoElement>
}

export default function VideoPlayer({ videoRef }: VideoPlayerProps) {
  return (
    <div className="w-full rounded-xl overflow-hidden bg-black">
      <video
        ref={videoRef}
        className="w-full block"
        width="1280"
        height="720"
        src={VIDEO_SRC}
        controls
        playsInline
      />
    </div>
  )
}
