import { useRef } from "react";
import Header from "./components/Header/Header";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer";
import VideoInfo from "./components/VideoInfo/VideoInfo";
import ChannelInfo from "./components/VideoInfo/ChannelInfo";
import Sidebar from "./components/Sidebar/Sidebar";
import { useEngagementMetrics } from "./hooks/useEngagementMetrics";

export default function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEngagementMetrics(videoRef);

  return (
    <div className="min-h-screen bg-yt-bg">
      <Header />
      <main className="flex flex-col lg:flex-row gap-4 lg:gap-6 px-0 sm:px-4 lg:px-6 py-0 sm:py-4 max-w-[1800px] mx-auto">
        <div className="flex-1 min-w-0">
          <div className="sm:rounded-xl overflow-hidden">
            <VideoPlayer videoRef={videoRef} />
          </div>
          <div className="px-3 sm:px-0">
            <VideoInfo />
            <ChannelInfo />
          </div>
        </div>

        <aside className="w-full lg:w-[402px] lg:shrink-0 px-3 sm:px-0 pb-6 lg:pb-0">
          <Sidebar />
        </aside>
      </main>
    </div>
  );
}
