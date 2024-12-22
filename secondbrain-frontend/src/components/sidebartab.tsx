import { ReactElement } from "react";

interface SidebartabProps {
    text: string;
    icon: ReactElement;
    onClick: () => void;
}

export function SidebarTab ({icon,text, onClick}: SidebartabProps) {

    return <div onClick={onClick} className={"flex rounded-lg cursor-pointer dark:hover:bg-neutral-900 hover:bg-stone-100 gap-3 justify-start items-center px-2 py-2 mx-4 my-2 transition-all "}>
        <div className="text-gray-600 dark:text-white">
          {icon}
        </div>
        <span className="font-semibold text-gray-600 text-md dark:text-white">
            {text}
        </span>
    </div>
}