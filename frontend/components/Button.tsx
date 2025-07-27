import Link from "next/link"

export interface ButtonProps{
    variants:"primary"|"secondary",
    size:"sm"|"md"|"lg",
    text:string,
    link:string
}

const VariantStyle={
    "primary":"inline-block bg-blue-600 text-white hover:bg-blue-700 transition-colors",
    "secondary":"bg-blue-200 text-blue-600"
}

const DefaultStyle  = "rounded-lg flex items-center justify-center gap-2 cursor-pointer"

const SizeStyle ={
    "sm":"py-1 px-2",
    "md":"py-2 px-4",
    "lg":"py-2 px-6"
}

export const Button=(props: ButtonProps)=>{
    return(<div>
        <Link href={props.link}className={`${VariantStyle[props.variants]} ${DefaultStyle} ${SizeStyle[props.size]}`}>{props.text}</Link>
    </div>)
}
{/* <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Login
              </button>
               <Link
              href={`colleges/${college.collegeId}`}
              className="mt-auto inline-block bg-indigo-600 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-700 transition"
            >
              View
            </Link> */}