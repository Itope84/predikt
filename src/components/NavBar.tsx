type NavItemProps = {
    isActive?: boolean
    children?: string
}

const NavItem: React.FC<NavItemProps> = ({isActive = false, children}) => {
    const LinkComponent = isActive ? 'span' : 'a'
    return <li role="none">
        <LinkComponent role="menuitem" className={`h-full font-semibold flex items-center px-4 text-gray-700 rounded-sm ${isActive ? 'border-purple-500 border-b-4' : 'hover:bg-purple-50 hover:text-purple-600'}`} href={!isActive ? "/images" : ''}>{children}</LinkComponent>
    </li>
}

const NavBar: React.FC = () => {
    return (
        <div>
            <ul role="menubar" className="flex items-stretch h-10 bg-red-50">
                <NavItem isActive>Images</NavItem>
                <NavItem>Predictions</NavItem>
            </ul>
        </div>
    )
}

export default NavBar