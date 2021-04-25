// vai ser chamado em todas as rotas toda vez que mudar
// Aqui o contexto vai ser realmente iniciado com o valor que for passado no value do [context].Provider
// Ao alterar o context, os componentes que estão utilizando o context serão alterados

import Header from "../components/Header";
import Player from "../components/Player";

import "../styles/global.scss";
import styles from '../styles/app.module.scss';

import React, { useState } from "react";

import { PlayerContext } from "../contexts/PlayerContext";

export default function MyApp({ Component, pageProps }) {

  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  function play(episode){
    console.log();
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function togglePlay(){
    setIsPlaying(!isPlaying);
  }

  function setPlayingState(state: boolean){
    setIsPlaying(state);
  }

  function spaceToggle(e){
    if (e.code == "Space" && !!episodeList.length){
      togglePlay();
    }
  }

  return (
    <PlayerContext.Provider value={{episodeList, currentEpisodeIndex, play, isPlaying, togglePlay, setPlayingState}}>
      <div className={styles.wrapper} onKeyDown={spaceToggle} tabIndex={-1}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerContext.Provider>
  );
}
