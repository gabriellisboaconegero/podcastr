// como é uma pagina estatica dinamica, ou seja ela é estatica mas depende do slug (http://localhost:3000/episode/slug)
// ou seja, a rot episode vai ser chamada mas com um parametro que é o slug
// para ter acesso as informações de parrametro usamos o hook useRouter
// para poder usar o getStaticProps é preciso configurar o getStaticPath


import { GetStaticPaths, GetStaticProps } from "next";
// import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

import { EpisodeFormated } from "../../types/EpisodeFormated";

import {api}  from '../../services/api';

import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

import { convertDurationToTimeString } from "../../utils/convertDurationToTimeString";

import styles from './episode.module.scss';

type EpisodeProps = {
    episode: EpisodeFormated;
}


export default function Episode({episode}: EpisodeProps){

    // const router = useRouter();

    return (
        <div className={styles.episode}>
            <div className={styles.thumbnailContainer}>
                <Link href='/'>
                    <button>
                        <img src="/arrow-left.svg" alt="Voltar"/>
                    </button>
                </Link>
                <Image
                width={700}
                height={160}
                src={episode.thumbnail}
                alt={episode.title}
                objectFit="cover"
                />
                <button>
                    <img src="/play.svg" alt="Tocar episódio"/>
                </button>
            </div>

            <header>
                <h1>{episode.title}</h1>
                <span>{episode.members}</span>
                <span>{episode.publishedAt}</span>
                <span>{episode.durationString}</span>
            </header>
            <div className={styles.episodeDescription} dangerouslySetInnerHTML={{__html: episode.description}}/>
        </div>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking'
    }
}


export const getStaticProps: GetStaticProps = async (ctx) => {

    // esse ctx é o que vai ser passado no slug, e algumas coisas a mais
    
    const { id } = ctx.params;

    const {data} = await api.get(`/episodes/${id}`);

    const episode:EpisodeFormated = {
        id: data.id,
        title: data.title,
        thumbnail: data.thumbnail,
        members: data.members,
        publishedAt: format(parseISO(data.published_at), "d MMM yy", {locale: ptBR}),
        duration: Number(data.file.duration),
        durationString: convertDurationToTimeString(data.file.duration),
        description: data.description,
        url: data.file.url
      };


    return{
        props: {
            episode
        },
        revalidate: 60 * 60 * 24 //24 hours
    }
}