

export interface iconProps {
    size: "sm" | "md" | "lg" | "xl" | "2xl";
}

 export const sizeClasses = {
    "sm": "size-4 ",
    "md": "size-5 ",
    "lg": "sm:size-6 size-5 ",
    "xl": "xl:size-7 lg:size-10 size-7 ",
    "2xl": "size-10 "
}