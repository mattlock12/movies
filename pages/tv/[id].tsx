import { useRouter } from 'next/router';
import style from '@/styles/media/media.module.scss'
import {
  generateMediaStaticProps,
  generateMediaStaticPaths,
  MediaReview
} from '@/data/data'

const medium = 'tv';
// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export const getStaticProps = generateMediaStaticProps(medium)

export const getStaticPaths = generateMediaStaticPaths(medium)

const TV = (props: MediaReview) => {
  const router = useRouter()
  const { id } = router.query

  return (
    <div
      className={style.mediaContainer}
      dangerouslySetInnerHTML={{__html: props.review}}
    />
  )
}

export default TV


