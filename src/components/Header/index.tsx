// o componente recebe um parametro chamado props, dentro dele estão contido os paraametros passados dentro do html do componente e 
// o props.children são os componentes/conteudo dentro do html do componente
// ex: <Header param='exemplo'>
//      <p>Hello World</p>
//     </Header>
// o props desse componente vai conter
// props.children = <p>Hello world</p>
// props.param = 'exemplo'


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