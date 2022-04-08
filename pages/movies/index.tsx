import Link from 'next/link';
import {
 MediaInterface,
 generateMediumStaticProps
} from '@/data/data'

import style from '@/styles/media/mediaList.module.scss'

export const getStaticProps = generateMediumStaticProps('movies')

const MovieHomePage = ({media}: {media:MediaInterface[]}) => {
  return (
    <div className={style.root}>
      <h1 className={style.title}>Movies</h1>
      <ul className={style.ul}>
        {
          media.map(movie => (
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
    </div>
  )

}
export default MovieHomePage