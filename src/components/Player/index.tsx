import { useContext, useEffect, useRef } from "react";
import Image from "next/image";

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import { usePlayer } from "../../contexts/PlayerContext";

import styles from "./styles.module.scss"

export default function Player(props){

    const audioRef = useRef<HTMLAudioElement>(null);
    const playButtonRef = useRef<HTMLButtonElement>(null);

    const {
        episodeList,
        currentEpisodeIndex,
        isPlaying,
        togglePlay,
        setPlayingState,
        playNext,
        playPrevious,
        hasNext,
        hasPrevious,
        isLooping,
        toggleLoop,
        spaceDivPauseRef,
        toggleShuffle,
        isShuffling
    } = usePlayer();

    useEffect(() => {
        if (!audioRef.current){
            return;
        }
        if (isPlaying){
            audioRef.current.play();
        }else{
            audioRef.current.pause();
        }
        playButtonRef.current.blur();
        spaceDivPauseRef.current.focus();
    }, [isPlaying]);

    const episode = episodeList[currentEpisodeIndex];

    return (
        <div className={styles.playerContainer}>
            <header>
                <img src="/playing.svg" alt="Tocando Agora"/>
                <strong>Tocando agora</strong>
            </header>
            {episode ? (
                <div className={styles.playingEpisode} >
                    <Image
                        width={592}
                        height={592}
                        src={episode.thumbnail}
                        objectFit='cover'
                    />
                    <strong>{episode.title}</strong>
                    <span>{episode.members}</span>
                </div>
            ) : (
                <div className={styles.emptyPlayer}>
                    <strong>Selecione um podcast para ouvir</strong>
                </div>
            )}
            <footer className={!episode ? styles.empty: ''}>
                <div className={styles.progress}>
                    <span>00:00</span>
                    <div className={styles.slider}>
                        {episode ? (
                            <Slider
                                trackStyle={{backgroundColor: "#04d362"}}
                                railStyle={{backgroundColor: '#9f75ff'}}
                                handleStyle={{borderColor: '#04d361'}}
                            />
                        ) : (
                            <div className={styles.emptySlider} />
                        )}
                    </div>
                    <span>00:00</span>
                </div>

                {episode && (
                    <audio
                        src={episode.url}
                        ref={audioRef}
                        autoPlay
                        loop={isLooping}
                        onPlay={() => setPlayingState(true)}
                        onPause={() => setPlayingState(false)}
                    />
                )}

                <div className={styles.buttons}>
                    <button
                        type="button"
                        disabled={!episode || episodeList.length === 1}
                        onClick={toggleShuffle}
                        className={isShuffling? styles.isActive: ''}
                        >
                            
                        <img src="/shuffle.svg" alt="Embaralhar"/>
                    </button>
                    <button type="button" disabled={!episode || !hasPrevious} onClick={playPrevious}>
                        <img src="/play-previous.svg" alt="Tocar Anterior"/>
                    </button>
                    <button ref={playButtonRef} type="button" disabled={!episode} className={styles.playButton} onClick={togglePlay}>
                        <img src={isPlaying? "/pause.svg": "/play.svg"} alt="Tocar"/>
                    </button>
                    <button type="button" disabled={!episode || !hasNext} onClick={playNext}>
                        <img src="/play-next.svg" alt="Tocar proximo"/>
                    </button>
                    <button type="button" disabled={!episode} onClick={toggleLoop} className={isLooping? styles.isActive: ''}>
                        <img src="/repeat.svg" alt="Repetir"/>
                    </button>
                </div>
            </footer>
        </div>
    );
}