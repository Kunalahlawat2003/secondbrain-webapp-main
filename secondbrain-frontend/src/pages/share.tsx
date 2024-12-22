import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LoginTopbar } from "../components/loginTopbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Card } from "../components/card";


export function SharedPage () {
    const { shareId} = useParams();
    const [content, setContent] = useState<any>([]);
    let [username, setUsername] = useState<string>("")

    useEffect(() => {

        async function fetchContent() {
            try{
                const response = await axios.get(`${BACKEND_URL}/api/v1/link/brain/${shareId}`);
                setContent(response.data.content);
                setUsername(response.data.name);
            } catch (error) {

            }
        }
        fetchContent();
    }, [])

    function formatDate(dateString: any) {
        const date = new Date(dateString);
        return date.toLocaleString("en-US", {
            year: "2-digit",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        });
    }

    return <div className="bg-gray-100 dark:bg-neutral-900">
        <LoginTopbar/>
        <div className="font-bold dark:text-white sm:text-4xl text-3xl sm:px-20 px-10 pt-28 pb-10">{username}'s Brains</div>
        <div className="grid xl:grid-cols-9 sm:grid-cols-4 grid-cols-1 sm:px-20 px-10 pb-10 gap-5 justify-center">
            {content.map(({type, title, content, tag, date }: any) => <div className="xl:col-span-3 sm:col-span-2 col-span-1">
                    <Card type={type} contentId={content._id} title={title} date={formatDate(date)} content={content} tags={tag}/>
                    </div> )}
        </div>
    </div>
}