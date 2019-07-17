import React from 'react'

const UsersTable = props => {

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Nome</th>
                    <th>E-Mail</th>
                    <th>Administrador</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {props.users.map(user => (
                    <tr key={user.email}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.admin ? 'Sim' : 'Não'}</td>
                        <td>
                            <button className="btn btn-warning m-1" onClick={() => props.focus(user, 'edit')} ><i className="fa fa-pencil" ></i></button>
                            <button className="btn btn-danger m-1" onClick={() => props.focus(user, 'delete')} ><i className="fa fa-trash-o" ></i></button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default UsersTable