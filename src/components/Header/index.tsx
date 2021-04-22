import format from "date-fns/format";
import { ptBR } from "date-fns/locale";

import styles from "./styles.module.scss"

export default function Header(props){

    const currentDate= format(new Date(), "EEEEEE, d MMMM", {
        locale: ptBR
    });

    return (
        <header className={styles.headerContainer}>
            <img src="/logo.svg" alt="Podcastr Logo"/>

            <p>O melhor para você ouvir sempre</p>

            <span>{currentDate}</span>
        </header>
    );
}