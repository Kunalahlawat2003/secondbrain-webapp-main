import { useRecoilState } from "recoil";
import { PlusIcon } from "../icons/plusicon";
import { ShareIcon } from "../icons/shareicon";
import { SidebarIcon } from "../icons/sidebarIcon";
import { Button } from "./button";
import { SidebarAtom } from "../atoms/sidebarAtom";
import { Apptitle } from "./AppTitle";
import { AddContentAtom } from "../atoms/AddContentAtom";
import { ShareContentAtom } from "../atoms/ShareContentAtom";
import { DeleteContentAtom } from "../atoms/DeleteContentAtom";
import { useShare } from "./useShare";


export function Topbar () {

    const [, setDeleteContentOpen] = useRecoilState(DeleteContentAtom);
    const [ShareContentOpen, setShareContentOpen] = useRecoilState(ShareContentAtom);
    const [AddContentOpen, setAddContentOpen] = useRecoilState(AddContentAtom);
    const[sidebaropen, setSidebarOpen] = useRecoilState(SidebarAtom);
    const fetchShareLink = useShare();

    return <div className="bg-white dark:bg-black dark:border-none w-full h-[8%] lg:h-[6%] xl:h-[8%] items-center  justify-between flex px-2 border border-gray-200 fixed top-0 left-0 z-20">
        <div className="lg:hidden flex dark:text-white dark:hover:text-gray-200 hover:text-gray-600 cursor-pointer" onClick={() => {
            setSidebarOpen(!sidebaropen), setAddContentOpen(false), setShareContentOpen(false), setDeleteContentOpen(false)
        }}>
          <SidebarIcon size="xl"/>
        </div>
        <div className="lg:flex hidden cursor-pointer mt-5">
            <Apptitle/>
        </div>
        <div className="flex">
          <Button variant="secondary" onClick={() => {setShareContentOpen(!ShareContentOpen), setSidebarOpen(false), setAddContentOpen(false), setDeleteContentOpen(false), fetchShareLink()}} text="Share Brain" rounded="md" fontsize="semibold" startIcon={<ShareIcon size="lg"/>}/>
          <Button variant="primary" onClick={() => {setAddContentOpen(!AddContentOpen), setSidebarOpen(false), setShareContentOpen(false), setDeleteContentOpen(false)}} text="Add Brain" rounded="md" fontsize="semibold" startIcon={<PlusIcon size="lg"/>}/>
        </div>
    </div>
}