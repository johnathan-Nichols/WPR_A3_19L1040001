import React from 'react'

export default function Aside() {
    return (
        <aside>
            <h3>WPR</h3>
            <header>
                <h2>HTML Quiz</h2>
            </header>
            
            <ul>
                <li><a className="active" href='/'><i className="far fa-question-circle"></i> All questions</a></li>
                <li><a href='/add'><i className="far fa-plus"></i> New question</a></li>
            </ul>
        </aside>
    )
}
