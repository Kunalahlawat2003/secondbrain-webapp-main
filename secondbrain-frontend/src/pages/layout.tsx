import { useRecoilState } from "recoil"

import { DeleteContentAtom } from "../atoms/DeleteContentAtom"
import { DeleteContentModal } from "../components/DeleteContentModal";
import { ShareContentModal } from "../components/ShareContentModal";
import { AddcontentModal } from "../components/AddcontentModal";
import { Topbar } from "../components/topbar";
import { Sidebar } from "../components/sidebar";
import { TopTitle } from "../components/toptitle";
import { ContentSpace } from "../components/contentspace";
import { AddContentAtom } from "../atoms/AddContentAtom";
import { ShareContentAtom } from "../atoms/ShareContentAtom";


export function Layout () {
  const [AddContentOpen, setAddContentOpen] = useRecoilState(AddContentAtom);
  const [ShareContentOpen, setShareContentOpen] = useRecoilState(ShareContentAtom);
  const [DeleteContentOpen, setDeleteContentOpen] = useRecoilState(DeleteContentAtom);

    return <div className="bg-stone-100 dark:bg-neutral-900 min-h-full">
      <DeleteContentModal open={DeleteContentOpen} onClose={() => {
        setDeleteContentOpen(false);
      }}/>
      <ShareContentModal open={ShareContentOpen} onClose={() => {
        setShareContentOpen(false);
      }}/>
      <AddcontentModal open={AddContentOpen} onClose={() => {
        setAddContentOpen(false);
      }}/>
        <Topbar/>
        <div className="flex">
            <div>
                <Sidebar/>
            </div>
          <div>
            <TopTitle/>
            <ContentSpace/>
          </div>
        </div>
    </div>
}