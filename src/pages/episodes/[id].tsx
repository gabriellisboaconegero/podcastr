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

    // if (router.isFallback){
    //     return <p>Carregando...</p>
    // }

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


//Como a rota depende de um input ou seja ela é dinamica, o next nã vai gerar uma static page, pois os paths estão vazios
// caso coloque um path com os parametros que devem ser gerados estaticamentes, aquela rota com o slug vai ser gerada estaticamente na build
// o fallack determina o comportamento da pagina que não foi gerada estaticamente
// fallback
//      false: retorna 404 se a pagia não foi gerada estaticamente, ou seja se a pagina não estiver nos paths, 404
//      true: se a pagina não foi gerada estaticamente (novamete, não está nos paths) ele vai retornar o conteudo porem a requisição ou seja, aquilo que ocorreria na build se fosse gerada estaticamente vai ser feita pelo browser(client-side).Por rodar no client-side, ao fazer a build o next não vai conseeguir montar a pagina estatica que utiliza essa variavel, pois ele tem um dalay e não esta rodando no server, para consertar isso, usamos o useRouter para verificar se está em um fallback e lidar com isso
//      blocking: ele faz a requisição e todo o script no server next.js e o usuario só vai ser redirecionado para a pagina depois que o html for gerado nesse server intermediario, diferente do true, que rediceriona para a pagina, faz a requisição e só depois devolve o html


export const getStaticPaths: GetStaticPaths = async () => {

    const { data } = await api.get("episodes", {
        params: {
          _limit: 2,
          _sort: 'published_at',
          _order: 'desc'
        }
    });

    const paths = data.map(episode => {
        return{
            params: {
                id: episode.id
            }
        } 
    });

    return {
        paths,
        fallback: "blocking"
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