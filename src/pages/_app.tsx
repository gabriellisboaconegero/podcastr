// vai ser chamado em todas as rotas toda vez que mudar
// Aqui o contexto vai ser realmente iniciado com o valor que for passado no value do [context].Provider
// Ao alterar o context, os componentes que estão utilizando o context serão alterados

import Header from "../components/Header";
import Player from "../components/Player";

import "../styles/global.scss";
import styles from '../styles/app.module.scss';

import { PlayerContextPovider, PlayerContext } from "../contexts/PlayerContext";

export default function MyApp({ Component, pageProps }) {
    return (
        <PlayerContextPovider>
            <div className={styles.wrapper}>
                <main>
                    <Header />
                    <Component {...pageProps} />
                </main>
                <Player />
            </div>
        </PlayerContextPovider>
    );
}
