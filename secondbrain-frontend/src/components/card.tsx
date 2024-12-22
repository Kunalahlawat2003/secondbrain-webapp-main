import { DeleteIcon } from "../icons/deleteicon";
import { DocumentIcon } from "../icons/documenticom";
import { ShareIcon } from "../icons/shareicon";
import "../App.css";
import { YoutubeIcon } from "../icons/youtubeicon";
import { TwitterIcon } from "../icons/twiitericon";
import { DeleteContentAtom } from "../atoms/DeleteContentAtom";
import { useRecoilState } from "recoil";
import { SidebarAtom } from "../atoms/sidebarAtom";
import { ObjectId } from "mongodb";
import { ContentIdAtom } from "../atoms/ContentIdAtom";
import { loadTwitterScript } from "./TwitterScript";
import { useEffect } from "react";

interface Cardprops {
    title: string;
    content: string;
    type: "tweet" | "youtube" | "text";
    tags: string[];
    date: any;
    contentId: ObjectId;
}

export function Card ({title, content, tags, type, date, contentId}: Cardprops) {

    const [, setDeleteContentOpen] = useRecoilState(DeleteContentAtom);
    const[, setSidebarOpen] = useRecoilState(SidebarAtom);
    const [, setSelectedContentId]: any = useRecoilState(ContentIdAtom);

    useEffect(() => {
        loadTwitterScript(); // Load or reinitialize Twitter widgets
      }, [content]);

    return <div className="bg-white dark:bg-black rounded-lg border-gray-200 border h-max min-h-[473px] min-w-[305.6px]  max-w-[333px] p-4 flex-col">
        <div className="flex justify-between mb-5">
            <div className="flex gap-2 items-center">
              <div className="text-gray-500 dark:text-white items-center">
                  {type === "text" && <DocumentIcon size="md"/>}
                  {type === "youtube" && <YoutubeIcon size="md"/>}
                  {type === "tweet" && <TwitterIcon size="md"/>}
              </div>
              <div className="font-semibold dark:text-white text-black text-md cursor-pointer">
                  {title}
              </div>
            </div>

            <div className="flex gap-3 items-center">
                <div className="text-gray-500 dark:text-white dark:hover:text-gray-400 cursor-pointer hover:text-gray-700 transition-all">
                    <ShareIcon size="md"/>
                </div>
                <div className="text-gray-500 dark:text-white dark:hover:text-gray-400 cursor-pointer hover:text-gray-700 transition-all" onClick={() => {
                    setDeleteContentOpen(true), setSidebarOpen(false), setSelectedContentId(contentId)}}>
                    <DeleteIcon size="md"/>
                </div>
            </div>
        </div>

         <div className="scrollable-container dark:text-white text-black min-h-[320px] max-h-80 overflow-x-hidden scroll-m-92 mb-5 rounded-md content-center">
            {type === "youtube" && <iframe className="w-full rounded-md " 
            src={content.replace(/(?:https?:\/\/)?(?:www\.|m\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+).*$/, "https://www.youtube.com/embed/$1")}
            title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" allowFullScreen>
           </iframe>}

           {type === "tweet" && <blockquote data-theme="dark" className="twitter-tweet">
            <a href={content.replace("x.com", "twitter.com")}>
            </a>
            </blockquote>}

            {type === "text" && <p>{content}</p>}            
        </div>

        <div className="flex flex-wrap gap-2 mb-2 ">
            {tags.map((tag, index) => (
                <span
                    key={index}
                    className="col-span-1 bg-indigo-100 text-indigo-700 rounded-lg text-center cursor-pointer px-3"
                >
                    {tag}
                </span>
            ))}
        </div>

        <div className="text-gray-500">
            Added on {date}
        </div>
    </div>
}