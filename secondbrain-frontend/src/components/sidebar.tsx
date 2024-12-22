import { useRecoilState} from "recoil"
import { SidebarAtom } from "../atoms/sidebarAtom"
import { SidebarTab } from "./sidebartab";
import { YoutubeIcon } from "../icons/youtubeicon";
import { TwitterIcon } from "../icons/twiitericon";
import { DocumentIcon } from "../icons/documenticom";
import { AllIcon } from "../icons/allIcon";
import { LogoutTab } from "./logoutTab";
import { Apptitle } from "./AppTitle";
import { ActiveTab } from "../atoms/ActiveTabAtom";
import { useNavigate } from "react-router-dom";
import { DarkModeTab } from "./darkModeTab";
import { useState } from "react";


 export function  Sidebar () {
    const [sidebaropen, setSideBaropen] = useRecoilState(SidebarAtom);
    const [, setActiveTab] = useRecoilState(ActiveTab);
    const navigate = useNavigate();
    const [darkmode, setDarkmode] = useState(true);
    const storedValue = localStorage.getItem("theme");
    const expectedValue = "light";

    if(darkmode == true) {
        document.getElementById("html")?.classList.add("dark");
        localStorage.setItem("theme", "dark");
    } else if (storedValue === expectedValue){
        document.getElementById("html")?.classList.remove("dark");
    }
    else {
        document.getElementById("html")?.classList.remove("dark");
        localStorage.setItem("theme", "light");
    }

    const Tabs = [
        {Text: "All Notes", type:"All Notes", icon: <AllIcon size="lg"/>},
        {Text: "Videos", type:"youtube", icon: <YoutubeIcon size="lg"/>},
        {Text: "Tweet", type:"tweet", icon: <TwitterIcon size="lg"/>},
        {Text: "Documents", type:"text", icon: <DocumentIcon size="lg"/>},
    ]

    if(sidebaropen) {
        return <div className="bg-white dark:bg-black fixed top-[8%] left-0 lg:h-full h-[92%]  xl:w-96 lg:w-72 md:w-60 w-52 z-10 top-0 left-0 bottom-0  duration-300 overflow-hidden transition ">
            <Apptitle/>
            {Tabs.map((tab) =>(
                <SidebarTab 
                key={tab.Text}
                text={tab.Text}
                icon={tab.icon}
                onClick={() => {setActiveTab(tab.type),setSideBaropen(false)}}
                />
            ))}
            <DarkModeTab theme={darkmode} onClick={() =>setDarkmode(!darkmode)}/>
            <LogoutTab onClick={() => {localStorage.removeItem("token"), navigate("/signin")}}/>
        </div>
    }

    if(!sidebaropen) {
        return <div className="bg-white dark:bg-black fixed top-[8%] lg:top-[6%] xl:top-[8%] left-0 lg:h-full h-[92%]  xl:w-96 lg:w-72 w-0 z-9 top-0 left-0 bottom-0 duration-300 overflow-hidden ease-in-out">
            <div className="lg:block hidden">
              {Tabs.map((tab) =>(
                  <SidebarTab 
                  key={tab.Text}
                  text={tab.Text}
                  icon={tab.icon}
                  onClick={() => setActiveTab(tab.type)}
                  />
              ))}
              <DarkModeTab theme={darkmode} onClick={() => setDarkmode(!darkmode)}/>
              <LogoutTab onClick={() => {localStorage.removeItem("token"), navigate("/signin")}}/>
            </div>
        </div>
    }
}