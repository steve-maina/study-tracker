type buttonTypes = "submit" |"reset" |"button"

export default function FormButtons({type,children, disabled=false,onClick}:{type:buttonTypes;children:React.ReactNode;disabled?:boolean;onClick:(event:React.MouseEvent<HTMLElement>)=>void}) {
    return <button disabled={disabled} type={type} onClick={onClick}className="border-2 border-gray-600">{children}</button>
}