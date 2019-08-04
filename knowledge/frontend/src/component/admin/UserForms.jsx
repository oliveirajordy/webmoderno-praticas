import React from 'react'

const UserForms = props => {

    const btnMode = {}
    let disabled = false

    if (props.mode === 'save') {
        btnMode.color = 'btn-primary'
        btnMode.label = 'Salvar'
        btnMode.fn = props.save
    } else if (props.mode === 'delete') {
        btnMode.color = 'btn-danger'
        btnMode.label = 'Deletar'
        btnMode.fn = props.remove
        disabled = true
    } else if (props.mode === 'edit') {
        btnMode.color = 'btn-warning'
        btnMode.label = 'Editar'
        btnMode.fn = props.save
    }

    return (
        <div className="user-forms">
            <div className="form-row">
                <div className="form-group col-6">
                    <label htmlFor="name">Nome</label>
                    <input type="text" className="form-control"
                        name="name" placeholder="Informe o nome do usuário..."
                        value={props.user.name} onChange={props.changeFild}
                        disabled={disabled} />
                </div>
                <div className="form-group col-6">
                    <label htmlFor="email">E-Mail</label>
                    <input type="email" className="form-control"
                        name="email" placeholder="Infome o e-mail do usuário..."
                        value={props.user.email} onChange={props.changeFild}
                        disabled={disabled} />
                </div>
            </div>
            <div className="form-group my-3">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox"
                        name="admin" onChange={props.changeFild}
                        checked={props.user.admin} disabled={disabled} />
                    <label htmlFor="admin" className="form-check-label">Administrador</label>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-6">
                    <label htmlFor="password">Senha</label>
                    <input type="password" className="form-control"
                        name="password" placeholder="Infome a senha do usuário"
                        value={props.user.password} onChange={props.changeFild}
                        disabled={disabled} />
                </div>
                <div className="form-group col-6">
                    <label htmlFor="confimPassword">Confirme a Senha</label>
                    <input type="password" className="form-control"
                        name="confirmPassword" placeholder="Confirme a senha do usuário"
                        value={props.user.confirmPassword} onChange={props.changeFild}
                        disabled={disabled} />
                </div>
            </div>
            <button className={`btn ${btnMode.color} mr-2`} onClick={btnMode.fn} >{btnMode.label}</button>
            <button className="btn btn-secondary mr-2" onClick={() => props.focus()} >Cancelar</button>
        </div>
    )
}

export default UserForms