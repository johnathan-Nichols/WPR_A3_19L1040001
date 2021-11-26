import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom'

export default function Aside() {
    const location = useLocation()
    const [activeMenu, setActiveMenu] = useState(['active', ''])

    useEffect(()=>{
        const loc = location.pathname.split('/')[1]
        switch (loc){
            case 'add':
                setActiveMenu(['','active'])
                break;
            case 'edit':
                setActiveMenu(['',''])
                break;
            case '':
            default:
                setActiveMenu(['active',''])
                break;
        }
    },[location])

    return (
        <aside>
            <h3>WPR</h3>
            <header>
                <h2>HTML Quiz</h2>
            </header>
            
            <ul>
                <li><a className={activeMenu[0]} href='/'><i className="far fa-question-circle"></i> All questions</a></li>
                <li><a className={activeMenu[1]} href='/add'><i className="far fa-plus"></i> New question</a></li>
            </ul>
        </aside>
    )
}
