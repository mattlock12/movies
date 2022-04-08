import path from 'path';
import {  GetStaticPaths, GetStaticProps } from 'next';
import { promises as fs } from 'fs';
import markdownToHtml from '@/utils/markdownToHtml'

export interface MediaInterface {
  id: number,
  title: string,
  dirname: string
}

export type MediaReview = {
  title: string,
  review: string
}

type mediumDir = 'movies' | 'books' | 'tv'

/**
 * used in the media/[id.tsx] files
 */
export function generateMediaStaticProps (mediumType: mediumDir) {
  const staticProps: GetStaticProps = async (ctx) => {

    const mediumDir = path.join(process.cwd(), `data/${mediumType}`)
    const jsonFile = await fs.readFile(path.join(mediumDir, 'data.json'), 'utf8')
    const dataJson: MediaInterface[] = JSON.parse(jsonFile)

      const myMedia = dataJson.filter((media) =>{
        const id = ctx?.params?.id;
        return media.id === Number(id);
      })[0]


    const mediaDirectory = path.join(process.cwd(), `data/${mediumType}/${myMedia.dirname}`)
    // const filenames = await fs.readdir(movieDirectory)
    const media = await fs.readFile(path.join(mediaDirectory, 'README.md'), 'utf8')
    const review = await markdownToHtml(media)
    // console.log('getstaticprops',movieJson)


    return {
      props: {
        title: myMedia.title,
        review
      }
    }
  }
  return staticProps;
}

export const generateMediaStaticPaths = (mediaType: mediumDir) => {

  const getStaticPaths: GetStaticPaths = async () => {
    // const markdownDirectory = path.join(process.cwd(), 'interviews');
    // const jsonFile = path.join(markdownDirectory, 'interviews.json');
    // const interviewJSON = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
    const mediumDirectory = path.join(process.cwd(), `data/${mediaType}`)
    const jsonFile = await fs.readFile(path.join(mediumDirectory, 'data.json'), 'utf8')
    const mediaJson: MediaInterface[]= JSON.parse(jsonFile)
    const paths = mediaJson.map((media) => ({
      params:{
        id: `${media.id}`,
      }
    }))
    // const paths = interviewJSON.map(interview => ({params: {id: interview.id}}));
    return {
      paths,
      fallback: false
    };
  }
  return getStaticPaths;
}

export const generateMediumStaticProps = (medium: mediumDir) => {
  const getStaticProps: GetStaticProps = async (ctx ) => {

    const mediumDirectory = path.join(process.cwd(), `data/${medium}`)
    const jsonFile = await fs.readFile(path.join(mediumDirectory, 'data.json'), 'utf8')
    const media = JSON.parse(jsonFile)

    return {
      props: {
        media
      }
    }
  }
  return getStaticProps;
}