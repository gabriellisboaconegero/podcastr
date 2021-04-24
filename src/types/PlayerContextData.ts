import { EpisodePlayer } from "./EpisodePlayer";

export type PlayerContextData = {
    episodeList: EpisodePlayer[];
    currentEpisodeIndex: number;
    play: (episode: EpisodePlayer) => void;
}