import axios from "axios";
import { BACKEND_URL } from "../config";
import { useRecoilState } from "recoil";
import { UseShare } from "../atoms/useShareAtom";


export function useShare () {
    const share = true;
    const [, setShareableLink] = useRecoilState(UseShare)

    async function fetchshareLink () {
    
        const response = await axios.post(BACKEND_URL + "/api/v1/link/brain/share", {
            share
        },{
            headers: {
                "token": localStorage.getItem("token")
            }
        })
        setShareableLink(response.data.message)
    }

    return fetchshareLink;
}