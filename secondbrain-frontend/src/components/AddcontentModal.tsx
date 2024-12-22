import { useRef, useState } from "react";
import { CloseIcon } from "../icons/closeIcon";
import { Button } from "./button";
import { Inputbox } from "./inputbox";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { AddContentAtom } from "../atoms/AddContentAtom";
import { useRecoilState } from "recoil";
import { ContentAtom } from "../atoms/ContentAtom";


export function AddcontentModal ({open, onClose}:any) {

    const [, setContents] = useRecoilState(ContentAtom);
    let [addcontentError, setAddContentError] = useState("");
    const [AddContentOpen, setAddContentOpen] = useRecoilState(AddContentAtom);
    const typeRef = useRef<any>();
    const titleRef = useRef<any>();
    const contentRef = useRef<any>();
    const tagRef = useRef<any>();
    

    async function addcontent () {
        const type = typeRef.current.value;
        const title = titleRef.current.value;
        const content = contentRef.current.value;
        const tag = tagRef.current.value
        .split(",")
        //@ts-ignore
        .map(tag => tag.trim())
        //@ts-ignore
        .filter(tag => tag !== "");

        try {
          const responce = await axios.post(BACKEND_URL + "/api/v1/content/create", {
              type,
              title,
              content,
              tag
          }, {
              headers: {
                  "token": localStorage.getItem("token")
              }
          })
          if(responce.data.message === "Content Added") {
              setAddContentOpen(!AddContentOpen);
              
              const updatedContents = await axios.get(BACKEND_URL + "/api/v1/content/fetch", {
                headers: {
                    "token": localStorage.getItem("token")
                }
              })
              setContents(updatedContents.data.content);
          }
        } catch (error:any) {
            if(error.responce.data.message === "Error while creating content") {
                setAddContentError("Error while creating content")
            }
        }
        
    }

    return <div>
        {open && <div className="w-full h-full bg-transparent backdrop-blur fixed top-0 left-0 justify-center items-center z-10 flex">
            <div className="bg-white dark:bg-black rounded-md px-10 py-7 outline outline-1 outline-gray-300 flex-col justify-center">
                <div className="mb-5 cursor-pointer text-black dark:text-white dark:hover:text-gray-300 hover:text-gray-500 transition-all w-max" onClick={onClose}><CloseIcon size="xl"/></div>
                <div className="text-center dark:text-white font-bold font-sans text-2xl mb-5">Add a Brain</div>
                <div> 
                  <label className="text-black dark:text-white font-semibold mx-2 mt-1 ">Choose Your Type</label>
                </div>
                <select ref={typeRef} className="mx-2 mb-2 bg-gray-100 rounded-lg focus:outline-black focus:outline-md mb-3 focus:bg-white w-[90%]">
                    <option value="youtube">Youtube</option>
                    <option value="tweet">Tweet</option>
                    <option value="text">Text</option>
                </select>
                <Inputbox reference={titleRef} type="text" placeholder="Enter Your Title" label="Title" labelSize="md"/>
                <Inputbox reference={contentRef} type="text" placeholder="Enter Your Content" label="Content" labelSize="md"/>
                <Inputbox reference={tagRef} type="text" placeholder="Eg: #politics, #fun" label="Tags" labelSize="md"/>
                <div className="justify-center flex mt-2">
                  <Button onClick={addcontent} variant="primary" text="Add Brain" rounded="md" fontsize="medium" fullwidth={true}/>
                  <div className="mt-2 text-center break-words">{addcontentError}</div>
                </div>
            </div>
        </div>}
    </div>
}