//SPA para qualquer aplicação react usando o useEffect(importar, chamar com o callback e uma lista de variaveis) e fetch, não é boa se precisa mostrar os dados logo quando carrega a pagina
//SSR apenas usando o next, exportando a função (async) getServerSideProps, ela é executada antes do enviar o html, toda vez que alguem entrar vai executar
//SSG o getStaticProps vai ser executado na build e nunca vai mudar, ou seja vai ser o mesmo para sempre, porem se o parametro revalidate for passado ele vai ser chamado e modificado dentro do intervalo de tempo passado em segundos


// arquivo da ota home, ou seja aquele que aparece primeiro quando entra no site

import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";  //Utilizar o componente Link do next evita que todos os arquivos sejam carregados novamente

import { api } from "../services/api";

import { convertDurationToTimeString } from "../utils/convertDurationToTimeString";

import {format, parseISO} from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

import styles from "./home.module.scss";

import { EpisodeApi } from "../types/EpisodeApi";
import { HomeProps } from "../types/HomeProps";



export default function Home({allEpisodes, latestEpisodes}: HomeProps) {

  return (
    <div className={styles.homePage}>
      <section className={styles.latestEpisodes}>
        <h2>Últimos lançamentos</h2>

        <ul>
        {latestEpisodes.map(episode => {
          return (
            <li key={episode.id}>
              <Image
                width={192}
                height={192}
                src={episode.thumbnail}
                alt={episode.title}
                objectFit="cover"
              />

              <div className={styles.episodeDatails}>
                <Link href={`/episodes/${episode.id}`}>
                  <a>{episode.title}</a >
                </Link>
                
                <p>{episode.members}</p>
                <span>{episode.publishedAt}</span>
                <span>{episode.durationString}</span>
              </div>             

              <button className={styles.play}>
                <img src="/play-green.svg" alt="tocar episódio"/>
              </button>

            </li>
          );
        })}
      </ul>

      </section>

      <section className={styles.allEpisodes}>
        <h2>Todos os Episodios</h2>

        <table cellSpacing={0}>
          <thead>
            <th></th>
            <th>Podcast</th>
            <th>Integrantes</th>
            <th>Data</th>
            <th>Duração</th>
            <th></th>
          </thead>
          <tbody>
            {allEpisodes.map(episode => {
              return (
                <tr key={episode.id}>
                  <td style={{width: 72}}>
                    <Image
                      width={120}
                      height={120}
                      src={episode.thumbnail}
                      alt={episode.title}
                      objectFit="cover"
                    />
                  </td>
                  <td>
                    <Link href={`/episodes/${episode.id}`}>
                      <a>{episode.title}</a>
                    </Link>
                  </td>
                  <td>{episode.members}</td>
                  <td style={{width: 100}}>{episode.publishedAt}</td>
                  <td>{episode.durationString}</td>
                  <td>
                    <button>
                      <img src="/play-green.svg" alt="Tocar podacast"/>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>

        </table>

      </section>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get("episodes", {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc'
    }
  });
  
  const episodes = data.map((episode: EpisodeApi) => {
    return{
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), "d MMM yy", {locale: ptBR}),
      duration: Number(episode.file.duration),
      durationString: convertDurationToTimeString(episode.file.duration),
      description: episode.description,
      url: episode.file.url
    };
  });

  const latestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.length);
  
  return {
    props: {
      latestEpisodes,
      allEpisodes
    },
    revalidate: 60 * 60 * 8
  }
}