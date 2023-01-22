const NavBar: React.FC = () => {
    return (
        <div>
            <ul role="menubar" className="flex">
                <li role="none">
                    <a role="menuitem" href="/images">Images</a>
                </li>
                <li role="none">
                    <a role="menuitem" href="/images">Predictions</a>
                </li>
            </ul>
        </div>
    )
}

export default NavBar