type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FC<ButtonProps> = ({ children, type= "button", ...props }) => {
    return <button className="rounded-md px-4 py-2 bg-purple-500 text-white font-semibold text-sm" type={type} {...props}>{ children }</button>
}

export default Button