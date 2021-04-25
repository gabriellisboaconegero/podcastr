import { EpisodePlayer } from "./EpisodePlayer";

export type PlayerContextData = {
    episodeList: EpisodePlayer[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    togglePlay: () => void;
    setPlayingState: (state: boolean) => void;
    play: (episode: EpisodePlayer) => void;
}