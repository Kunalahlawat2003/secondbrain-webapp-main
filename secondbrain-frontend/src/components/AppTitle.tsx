import { SecondBrainIcon } from "../icons/secondbrainicon";


export function Apptitle() {

    return <div className="flex gap-3 mb-5 px-4 py-2 items-center cursor-pointer">
        <div className="text-indigo-600">
          <SecondBrainIcon size="xl"/>
        </div>
        <div className="text-black dark:text-white font-bold lg:text-xl sm:text-lg text-md">
            SECOND BRAIN
        </div>
    </div>
}