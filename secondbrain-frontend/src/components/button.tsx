import { ReactElement } from "react";


interface Buttonprops {
    variant: "primary" | "secondary";
    text: string;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    rounded: "sm" | "md" | "lg" | "xl" | "2xl";
    fontsize: "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold";
    onClick?: () => void;
    fullwidth?: boolean;
    loading?: boolean;
}

const VariantClasses = {
    "primary": "bg-indigo-600 text-white hover:bg-indigo-700 p-2 transition-all sm:text-base text-xs ",
    "secondary": "bg-indigo-200 text-indigo-600 hover:bg-indigo-300 p-2  transition-all sm:text-base text-xs "
}

const RoundedClasses = {
    "sm": "rounded-sm ",
    "md": "rounded-md ",
    "lg": "rounded-lg ",
    "xl": "rounded-xl ",
    "2xl": "rounded-2xl "
}

const Fontclasses = {
    "light": "font-light ",
    "normal": "font-normal ",
    "medium": "font-medium ",
    "semibold": "font-semibold ",
    "bold": "font-bold ",
    "extrabold": "font-extrabold ",
}

const defaultStyles ="m-1"

export function Button ({variant, text, startIcon, endIcon, rounded, fontsize, onClick, fullwidth, loading}: Buttonprops) {

    return <button onClick={onClick} className={"flex items-center gap-1 " + VariantClasses[variant] + "" + RoundedClasses[rounded] + "" + Fontclasses[fontsize] + "" + defaultStyles + `${fullwidth ? " w-full justify-center place-self-center" : ""} ${loading ? "opacity-45 hover:bg-indigo-600" : ""}`} disabled={loading}>
        {startIcon}
        {text}
        {endIcon}
    </button>
}