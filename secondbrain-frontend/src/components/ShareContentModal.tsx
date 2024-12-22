import { useRecoilValue } from "recoil";
import { CloseIcon } from "../icons/closeIcon";
import { UseShare } from "../atoms/useShareAtom";



export function ShareContentModal ({open, onClose}: any) {
    const shareableLink = useRecoilValue(UseShare)

    return <div>
            {open && <div className="w-full h-full bg-transparent backdrop-blur fixed top-0 left-0 justify-center items-center z-10 flex">
                <div className="bg-white dark:bg-black rounded-md p-5 max-w-[80%] outline outline-1 outline-gray-300 flex-col justify-center">
                    <div className="mb-5 cursor-pointer text-black dark:text-white dark:hover:text-gray-300 hover:text-gray-500 transition-all w-max" onClick={onClose}><CloseIcon size="xl"/></div>
                    <div className="text-center text-black dark:text-white font-bold font-sans text-2xl mb-5">Share Your Brains</div>
                    <div className="rounded-lg bg-gray-100 dark:bg-neutral-800 dark:text-white justify-center text-center p-5 focus:outline focus:outline-indigo-600 hover:outline hover:outline-indigo-600 transition-all duration-100 break-words">https://secondbrain-webapp-rosy.vercel.app/brain{shareableLink}</div>
                    <div className="text-center text-indigo-600 font-semibold mt-3">Copy this link to your clipboard!</div>
                </div>
            </div>}
        </div>
}