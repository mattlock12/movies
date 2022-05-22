import { remark } from "remark";
import html from "remark-html";
import style from "../pages/movies/movie.module.scss";

const FIRST_TAG_REGEX = /(\<[a-z]+\>)(\w)/;
const BREAK_TAG_REGEX = /([P]{3})([\w]+)(\/[P]{3})/g;

export default async function markdownToHtml(markdown: string) {
  const result = await remark().use(html).process(markdown);
  const resultString = result.toString();
  return resultString
    .replace(
      FIRST_TAG_REGEX,
      (_, openTag, firstLetter) =>
        `${openTag}<span class='${style.P}'>${firstLetter}</span>`
    )
    .replace(
      BREAK_TAG_REGEX,
      (_, openTag, letter, closeTag) =>
        `<span class=${style.P}>${letter}</span>`
    );
}
