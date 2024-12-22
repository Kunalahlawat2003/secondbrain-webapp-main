import { useRecoilValue } from "recoil";
import { Card } from "./card";
import { useContent } from "./useContenthook";
import { ActiveTab } from "../atoms/ActiveTabAtom";



export function ContentSpace () {
    const contents = useContent();
    let activeTab = useRecoilValue(ActiveTab)

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

    const filteredContents = 
          activeTab === "All Notes"
             ? contents
             : contents.filter((contents:any) => contents.type === activeTab)

    return <div className="grid xl:grid-cols-9 sm:grid-cols-4 grid-cols-1 sm:px-20 px-10 mb-10 gap-5 justify-center lg:translate-x-60 xl:translate-x-[24rem]">

        {filteredContents.map(({type, title, content, tag, date, _id }: any) => 
        <div className="xl:col-span-3 sm:col-span-2 col-span-1">
          <Card 
            type={type} 
            key={_id} 
            contentId={_id} 
            title={title} 
            date={formatDate(date)} 
            content={content} 
            tags={tag}
           />
        </div> 
    )}
    </div>  
}