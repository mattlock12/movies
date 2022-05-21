import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { promises as fs } from "fs";
import path from "path";
import markdownToHtml from "@/utils/markdownToHtml";
import { MovieInterface } from "./index";
import style from "./movie.module.scss";
import { format } from "date-fns";

type MovieReview = {
  title: string;
  review: string;
  published: string;
};
// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export const getStaticProps: GetStaticProps = async (ctx) => {
  const moviesDirectory = path.join(process.cwd(), "data/movies");
  const jsonFile = await fs.readFile(
    path.join(moviesDirectory, "movies.json"),
    "utf8"
  );
  const moviesJson: MovieInterface[] = JSON.parse(jsonFile);

  const myMovie = moviesJson.find((movie) => {
    const id = ctx?.params?.id;
    return movie.id === Number(id);
  });

  const movieDirectory = path.join(
    process.cwd(),
    `data/movies/${myMovie?.dirname}`
  );
  // const filenames = await fs.readdir(movieDirectory)
  const movie = await fs.readFile(
    path.join(movieDirectory, "README.md"),
    "utf8"
  );
  const review = await markdownToHtml(movie);
  // console.log('getstaticprops',movieJson)

  return {
    props: {
      title: myMovie?.title,
      published: myMovie?.published,
      review,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // const markdownDirectory = path.join(process.cwd(), 'interviews');
  // const jsonFile = path.join(markdownDirectory, 'interviews.json');
  // const interviewJSON = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
  const movieDirectory = path.join(process.cwd(), "data/movies");
  const jsonFile = await fs.readFile(
    path.join(movieDirectory, "movies.json"),
    "utf8"
  );
  const movieJson: MovieInterface[] = JSON.parse(jsonFile);
  const paths = movieJson.map((movie) => ({
    params: {
      id: `${movie.id}`,
    },
  }));

  // const paths = interviewJSON.map(interview => ({params: {id: interview.id}}));
  return {
    paths,
    fallback: false, // See the "fallback" section below
  };
};

const Movie = (props: MovieReview) => {
  const router = useRouter();
  const { id } = router.query;

  // debugger;
  return (
    <div className={style.movieContainer}>
      <div className={"text-7xl mb-5"}>{props.title}</div>
      <div className={"text-xl mb-10 italic"}>
        {format(
          props.published ? new Date(props.published) : new Date(),
          "MMMM do, yyyy"
        )}
      </div>
      <div
        // className='container mx-auto'
        dangerouslySetInnerHTML={{ __html: props.review }}
      />
    </div>
  );
};

export default Movie;
