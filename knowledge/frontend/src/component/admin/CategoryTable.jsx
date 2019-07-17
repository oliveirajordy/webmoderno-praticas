import React from 'react'

const CategoryTable = props => {

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Nome</th>
                    <th>Caminho</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {props.categories.map(category => (
                    <tr key={category.name}>
                        <td>{category.id}</td>
                        <td>{category.name}</td>
                        <td>{category.path}</td>
                        <td>
                            <button className="btn btn-warning m-1" onClick={() => props.focus(category, 'edit')} ><i className="fa fa-pencil" ></i></button>
                            <button className="btn btn-danger m-1" onClick={() => props.focus(category, 'delete')} ><i className="fa fa-trash-o" ></i></button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default CategoryTable