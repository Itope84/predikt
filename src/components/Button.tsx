type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary' | 'danger'
}

const Button: React.FC<ButtonProps> = ({ children, type = "button", variant = 'primary', ...props }) => {
    const variantStyleMap = {
        primary: 'bg-purple-500 text-white',
        secondary: 'border-2 border-purple-500 text-purple-700',
        danger: 'bg-red-500 text-white'
    }
    return <button className={`rounded-md px-4 py-2 font-semibold text-sm ${variantStyleMap[variant]}`} type={type} {...props}>{ children }</button>
}

export default Button