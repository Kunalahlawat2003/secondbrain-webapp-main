import { SecondBrainIcon } from "../icons/secondbrainicon";


export function LoginTopbar () {

    return <div className="bg-white dark:bg-black dark:outline-none fixed top-0 left-0 w-full outline outline-gray-300 outline-1 flex items-center px-2 py-3 gap-2 cursor-pointer">
        <SecondBrainIcon size="2xl" />
        <div className="font-bold dark:text-white text-2xl">Second Brain</div>
    </div>
}