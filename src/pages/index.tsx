//SPA para qualquer aplicação react usando o useEffect(importar, chamar com o callback e uma lista de variaveis) e fetch, não é boa se precisa mostrar os dados logo quando carrega a pagina
//SSR apenas usando o next, exportando a função (async) getServerSideProps, ela é executada antes do enviar o html, toda vez que alguem entrar vai executar
//SSG o getStaticProps vai ser executado de acordo com o intervalo escolhido, só funciona em prod

export default function Home(props) {

  return (
    <>
      <p>{JSON.stringify(props.episodes)}</p>
    </>
  );
}

export async function getStaticProps(){
  const result = await fetch("http://localhost:3333/episodes");
  const data = await result.json();
  return {
    props: {
      episodes: data
    },
    revalidate: 60 * 60 * 8
  }
}