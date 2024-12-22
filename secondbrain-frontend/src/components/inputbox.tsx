

interface InputboxProps {
    type: string;
    placeholder: string;
    label: string;
    labelSize: "xs" | "md" | "lg" | "xl" | "2xl" | "3xl";
    reference?: any;
}

const labelsizes = {
    "xs": "text-xs ",
    "md": "text-md ",
    "lg": "text-lg ",
    "xl": "text-xl ",
    "2xl": "text-2xl ",
    "3xl": "text-3xl "
}

export function Inputbox ({type, placeholder, label, labelSize, reference}: InputboxProps){

    return <div className="flex-col">
        <div className={labelsizes[labelSize] + "text-black dark:text-white font-semibold mx-2 mt-1 "}>{label}</div>
      <input ref={reference} type={type} placeholder={placeholder} className="text-gray-700 transition-all bg-gray-100 focus:bg-white rounded-lg p-2 mx-2 mb-3 mt-1 focus:text-gray-700 focus:outline-black focus:outline-md h-12 w-full place-self-center flex "></input>
    </div>
}