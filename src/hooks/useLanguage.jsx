import { useNavigate, useParams } from "react-router-dom";

export default function useLanguage() {
  const { lang } = useParams();

  if (lang !== "en" && lang !== "fr" && lang !== "zh-Hans") {
    return { lang: "en" };
  }
  return { lang: lang };
}
