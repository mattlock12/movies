import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { promises as fs } from 'fs';
import path from 'path';
import Link from 'next/link';

import style from './movieList.module.scss'

export interface MovieInterface {
  id: number,
  title: string,
  dirname: string
}

export const getStaticProps: GetStaticProps = async (ctx ) => {

  const moviesDirectory = path.join(process.cwd(), 'data/movies')
  const jsonFile = await fs.readFile(path.join(moviesDirectory, 'data.json'), 'utf8')
  const movies = JSON.parse(jsonFile)

  return {
    props: {
      movies
    }
  }
}

const MovieHomePage = ({movies}: {movies:MovieInterface[]}) => {
  return <ul className={style.ul}>
    {
      movies.map(movie => (
        <li
          className={style.li}
          key={movie.id}
        >
          <Link
            href={`/movies/${movie.id}`}
          >
              {movie.title}
          </Link>
        </li>
      ))
    }
  </ul>

}
export default MovieHomePage