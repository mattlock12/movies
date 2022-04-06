import {  GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { promises as fs } from 'fs';
import path from 'path';
import markdownToHtml from '@/utils/markdownToHtml'
import {MovieInterface} from './index';
import style from './movie.module.scss'



type MovieReview = {
  title: string,
  review: string
}
// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export const getStaticProps: GetStaticProps = async (ctx ) => {

  const moviesDirectory = path.join(process.cwd(), 'data/movies')
  const jsonFile = await fs.readFile(path.join(moviesDirectory, 'movies.json'), 'utf8')
  const moviesJson: MovieInterface[] = JSON.parse(jsonFile)

    const myMovie = moviesJson.filter((movie) =>{
      const id = ctx?.params?.id;
      return movie.id === Number(id);
    })[0]


  const movieDirectory = path.join(process.cwd(), `data/movies/${myMovie.dirname}`)
  // const filenames = await fs.readdir(movieDirectory)
  const movie = await fs.readFile(path.join(movieDirectory, 'README.md'), 'utf8')
  const review = await markdownToHtml(movie)
  // console.log('getstaticprops',movieJson)


  return {
    props: {
      title: myMovie.movie,
      review
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  // const markdownDirectory = path.join(process.cwd(), 'interviews');
  // const jsonFile = path.join(markdownDirectory, 'interviews.json');
  // const interviewJSON = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
  const movieDirectory = path.join(process.cwd(), 'data/movies')
  const jsonFile = await fs.readFile(path.join(movieDirectory, 'movies.json'), 'utf8')
  const movieJson: MovieInterface[]= JSON.parse(jsonFile)
  const paths = movieJson.map((movie) => ({
    params:{
      id: `${movie.id}`,
    }
  }))
  // const paths = interviewJSON.map(interview => ({params: {id: interview.id}}));
  return {
    paths,
    fallback: false // See the "fallback" section below
  };
}

const Movie = (props: MovieReview) => {
  const router = useRouter()
  const { id } = router.query

  return (
    <div
      // className='container mx-auto'
      className={style.movieContainer}
      dangerouslySetInnerHTML={{__html: props.review}}
    />
  )
}

export default Movie


