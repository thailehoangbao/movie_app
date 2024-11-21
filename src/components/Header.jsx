import PropsType from 'prop-types'
import { useState } from 'react'

const Header = ({onSearch}) => {
    const [search, setSearch] = useState('')
    return <div className="p-4 bg-black flex items-center justify-between">
        <div className="flex items-center space-x-4">
            <h1 className="text-[30px] uppercase font-bold text-red-700">movie</h1>
            <nav className="flex items-center space-x-4">
                <a href="#" className="text-white">Home</a>
                <a href="#" className="text-white">About</a>
                <a href="#" className="text-white">Contact</a>
            </nav>
        </div>
        <div className="space-x-4 flex items-center">
            <input type="text" className="p-4 text-black" placeholder="Search" onChange={(e) => setSearch(e.target.value)} value={search}/>
            <button className="p-2 text-white bg-red-700 rounded-md opacity-100 hover:opacity-80" onClick={() => onSearch(search)}>SEARCH</button>
        </div>
    </div>
}

Header.prototype = {
    onSearch: PropsType.func
}

export default Header;