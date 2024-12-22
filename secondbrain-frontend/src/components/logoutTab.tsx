import { LogoutIcon } from "../icons/logoutIcon";


export function LogoutTab ({onClick}:{onClick:()=> void}) {

     return <div onClick={onClick} className="flex rounded-lg cursor-pointer dark:hover:bg-red-950 hover:bg-red-100 gap-3 justify-start items-center px-2 py-2 mx-4 my-2 transition-all">
    <div className="text-red-400">
        <LogoutIcon size="lg"/>
    </div>
     <span className="font-semibold text-red-400 text-md">
        Log Out
    </span>
</div>
}