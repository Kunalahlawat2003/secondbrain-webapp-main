import { MoonIcon } from "../icons/moonIcon";
import { SunIcon } from "../icons/sunIcon";


export function DarkModeTab ({onClick, theme}: {onClick:() => void, theme:boolean}){

    return <div onClick={onClick} className={"flex rounded-lg cursor-pointer dark:hover:bg-neutral-900 hover:bg-stone-100 gap-3 justify-start items-center px-2 py-2 mx-4 my-2 transition-all "}>
    <div className="text-gray-600 dark:text-white">
      {theme ? <MoonIcon size="lg" /> : <SunIcon size="lg" />}
    </div>
    <span className="font-semibold text-gray-600 text-md dark:text-white">
      {theme ? "Dark Mode" : "Light Mode"}
    </span>
</div>
}