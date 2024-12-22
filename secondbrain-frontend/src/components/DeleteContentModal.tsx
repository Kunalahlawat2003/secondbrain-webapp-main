import axios from "axios";
import { CloseIcon } from "../icons/closeIcon";
import { BACKEND_URL } from "../config";
import { useState } from "react";
import { ContentIdAtom } from "../atoms/ContentIdAtom";
import { useRecoilState } from "recoil";
import { ContentAtom } from "../atoms/ContentAtom";


export function DeleteContentModal ({open, onClose}: any) {
    const [errorMessage, setErrorMessage] = useState("");
    const [contentId]= useRecoilState(ContentIdAtom);
    const [, setContents] = useRecoilState(ContentAtom);

    async function deleteContent () {
        try {
            const response = await axios.delete(`${BACKEND_URL}/api/v1/content/delete/${contentId}`, {
                headers: {
                    "token": localStorage.getItem("token")
                }
            })
            if(response.data.message === "Content Deleted") {
              onClose();
              const updatedContents = await axios.get(BACKEND_URL + "/api/v1/content/fetch", {
                headers: {
                    "token": localStorage.getItem("token")
                }
              })
              setContents(updatedContents.data.content);
            }
        } catch (error: any) {
            if(error.response.data.message === "Error while deleteing content") {
                setErrorMessage("Error while deleting content")
            }
        }
    }

    return <div>
                {open && <div className="w-full h-full bg-transparent backdrop-blur fixed top-0 left-0 justify-center items-center z-10 flex">
                    <div className="bg-white dark:bg-black rounded-md p-5 max-w-[80%] outline outline-1 outline-gray-300 flex-col justify-center">
                        <div className="mb-5 cursor-pointer dark:text-white dark:hover:text-gray-300 hover:text-gray-500 transition-all w-max" onClick={onClose}><CloseIcon size="xl"/></div>
                        <div className="text-center dark:text-white font-bold font-sans text-2xl mb-5">Are you sure?</div>
                        <div className="flex gap-5">
                            <button onClick={deleteContent} className="bg-red-500 dark:hover:bg-red-800 hover:bg-red-600 text-white font-semibold focus:bg-red-600 transition-all px-4 py-2 rounded-lg">Yes, Delete</button>
                            <button className="bg-gray-200 dark:bg-neutral-600 dark:text-white dark:hover:bg-neutral-700 hover:bg-gray-300 font-semibold focus:bg-gray-300 transition-all px-4 py-2 rounded-lg">No, Cancel</button>
                        </div>
                        <div className="text-center text-red-400 font-semibold mt-3">This Change will be permanent!</div>
                        <div className="text-center text-xs">{errorMessage}</div>
                    </div>
                </div>}
            </div>
}