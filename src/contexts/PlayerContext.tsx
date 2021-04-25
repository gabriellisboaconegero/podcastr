import {createContext, useContext, useRef, useState} from 'react';

import { EpisodePlayer } from '../types/EpisodePlayer';
import { PlayerContextData } from "../types/PlayerContextData";

//apesar de iniciar o contexto e dar um valor inicial ele é mais util apenas indicando o type do contexto do que realmente setando o inicial


export const PlayerContext = createContext({} as PlayerContextData);

export function PlayerContextPovider({children}){
    const [episodeList, setEpisodeList] = useState([]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLooping, setIslooping] = useState(true);
    const [isShuffling, setIsShuffling] = useState(false);

    const spaceDivPauseRef = useRef<HTMLDivElement>(null);

    const hasNext = (currentEpisodeIndex + 1) < episodeList.length;
    const hasPrevious = currentEpisodeIndex > 0;

    function playList(list: EpisodePlayer[], index: number){
        setEpisodeList(list);
        setCurrentEpisodeIndex(index);
        setIsPlaying(true);
    }

    function play(episode) {
        setEpisodeList([episode]);
        setCurrentEpisodeIndex(0);
        setIsPlaying(true);
    }

    function togglePlay() {
        setIsPlaying(!isPlaying);
    }

    function toggleLoop() {
        setIslooping(!isLooping);
    }

    function toggleShuffle(){
        setIsShuffling(!isShuffling);
    }

    function setPlayingState(state: boolean) {
        setIsPlaying(state);
    }

    function spaceToggle(e) {
        if (e.code == "Space" && episodeList.length !== 0) {
            togglePlay();
        }
    }

    function playNext(){
        if (isShuffling){
            setCurrentEpisodeIndex(Math.floor(Math.random() * episodeList.length));
        } else if (hasNext){
            setCurrentEpisodeIndex(currentEpisodeIndex + 1);
        }
    }

    function playPrevious(){
        if (hasPrevious){
            setCurrentEpisodeIndex(currentEpisodeIndex - 1);
        }
    }

    const values = {
        episodeList,
        currentEpisodeIndex,
        play,
        isPlaying,
        togglePlay,
        setPlayingState,
        playList,
        playNext,
        playPrevious,
        hasNext,
        hasPrevious,
        isLooping,
        toggleLoop,
        spaceDivPauseRef,
        toggleShuffle,
        isShuffling,
    }

    return (
        <PlayerContext.Provider value={values}>
            <div ref={spaceDivPauseRef} onKeyDown={spaceToggle} tabIndex={-1}>
                {children}
            </div>
        </PlayerContext.Provider>
    );
}

export const usePlayer = () => useContext(PlayerContext);