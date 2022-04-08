import Link from 'next/link';
import {
 MediaInterface,
 generateMediumStaticProps
} from '@/data/data'

import style from '@/styles/media/mediaList.module.scss'

export const getStaticProps = generateMediumStaticProps('books')

const MovieHomePage = ({media}: {media:MediaInterface[]}) => {
  return (
    <div className={style.root}>
      <h1 className={style.title}>Books. nerd</h1>
      <ul className={style.ul}>
        {
          media.map(book => (
            <li
              className={style.li}
              key={book.id}
            >
              <Link
                href={`/books/${book.id}`}
              >
                  {book.title}
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  )

}
export default MovieHomePage