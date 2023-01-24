import { useLocation } from "react-router-dom"

type NavItemProps = {
    isActive?: boolean
    to?: string
    children?: string
}

const NavItem: React.FC<NavItemProps> = ({isActive = false, to, children}) => {
    const LinkComponent = isActive ? 'span' : 'a'
    return <li role="none">
        <LinkComponent role="menuitem" className={`h-full font-semibold flex items-center px-4 text-gray-700 rounded-sm ${isActive ? 'border-purple-500 border-b-4' : 'hover:bg-purple-50 hover:text-purple-600'}`} href={!isActive ? to : ''}>{children}</LinkComponent>
    </li>
}

const NavBar: React.FC = () => {
    const location = useLocation()
    const paths = [
        {
            path: "/",
            label: "Images",
        },
        {
            path: "/predictions",
            label: "Predictions",
        }
    ]
    return (
        <div>
            <ul role="menubar" className="flex items-stretch h-10">
                {paths.map(route => (<NavItem key={route.path} to={route.path} isActive={route.path === location.pathname}>{route.label}</NavItem>))}
            </ul>
        </div>
    )
}

export default NavBar