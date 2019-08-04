import React from 'react'

const Pagination = props => {

    const pages = []
    const rows = Math.ceil(props.count / props.limit)

    for (let i = 1; i <= rows; i++) {
        const active = props.page === i ? true : false
        pages.push(
            <li key={i} className={`page-item ${active ? 'disabled' : ''}`} onClick={_ => props.nextPage(i)}>
                <a className="page-link">{i}</a>
            </li>
        )
    }

    const previous = _ => {
        if (props.page > 1) props.nextPage(props.page - 1)
    }

    const next = _ => {
        if (props.page < rows) props.nextPage(props.page + 1)
    }

    return (
        <nav>
            <ul className="pagination">
                <li className={`page-item ${props.page === 1 ? 'disabled' : ''}`} onClick={previous}>
                    <a className='page-link'>
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>

                {pages}

                <li className={`page-item ${props.page === rows ? 'disabled' : ''}`} onClick={next}>
                    <a className='page-link'>
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination