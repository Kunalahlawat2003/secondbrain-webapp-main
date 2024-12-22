import axios from "axios";
import { useEffect} from "react";
import { BACKEND_URL } from "../config";
import { useRecoilState } from "recoil";
import { ContentAtom } from "../atoms/ContentAtom";


export function useContent () {

    const [contents, setContents]: any = useRecoilState(ContentAtom);

    useEffect(() => {
        async function fetchContents () {
          const response = await axios.get(BACKEND_URL + "/api/v1/content/fetch", {
              headers: {
                  "token": localStorage.getItem("token")
              }
          })
          setContents(response.data.content)
        }
        fetchContents();
    }, [])

    return contents;
}