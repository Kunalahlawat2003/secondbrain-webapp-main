import { useRecoilValue } from "recoil"
import { ActiveTab } from "../atoms/ActiveTabAtom"
import { useEffect, useState } from "react"


export function TopTitle () {

    const activetab = useRecoilValue(ActiveTab)
    let [title, setTitle] = useState("");
    useEffect(() => {
      if(activetab == "All Notes") {
          setTitle("All Notes")
      } else if(activetab === "youtube") {
          setTitle("Videos")
      } else if(activetab === "tweet") {
        setTitle("Tweets")
      } else if(activetab === "text") {
        setTitle("Documents")
      }
    }, [activetab])

    return <div className="text-3xl text-black dark:text-white sm:mx-20 mx-10 pt-28 pb-16 font-semibold lg:translate-x-60 xl:translate-x-[24rem]">
        {title}
    </div>
}