import { EpisodePlayer } from "./EpisodePlayer";

export type PlayerContextData = {
    episodeList: EpisodePlayer[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    togglePlay: () => void;
    setPlayingState: (state: boolean) => void;
    play: (episode: EpisodePlayer) => void;
    playList: (list: EpisodePlayer[], index: number) => void;
    playNext: () => void;
    playPrevious: () => void;
    hasNext: boolean;
    hasPrevious: boolean;
    isLooping: boolean;
    toggleLoop: () => void;
    spaceDivPauseRef: any;
    toggleShuffle: () => void;
    isShuffling: boolean;
    clearPlayerState: () => void;
}