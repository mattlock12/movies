import Link from 'next/link';
import {
 MediaInterface,
 generateMediumStaticProps
} from '@/data/data'

import style from '@/styles/media/mediaList.module.scss'

export const getStaticProps = generateMediumStaticProps('tv')

const MovieHomePage = ({media}: {media:MediaInterface[]}) => {
  return (
    <div className={style.root}>
      <h1 className={style.title}>Television</h1>
      <ul className={style.ul}>
        {
          media.map(tv => (
            <li
              className={style.li}
              key={tv.id}
            >
              <Link
                href={`/tv/${tv.id}`}
              >
                  {tv.title}
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  )

}
export default MovieHomePage