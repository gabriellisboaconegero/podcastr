import {createContext} from 'react';
import { PlayerContextData } from "../types/PlayerContextData";

//apesar de iniciar o contexto e dar um valor inicial ele é mais util apenas indicando o type do contexto do que realmente setando o inicial


export const PlayerContext = createContext({} as PlayerContextData);