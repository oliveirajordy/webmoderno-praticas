import React from 'react'

const CategoryForms = props => {

    const btnMode = {}

    if (props.mode === 'save') {
        btnMode.color = 'btn-primary'
        btnMode.label = 'Salvar'
        btnMode.fn = props.save
    } else if (props.mode === 'delete') {
        btnMode.color = 'btn-danger'
        btnMode.label = 'Deletar'
        btnMode.fn = props.remove
    } else if (props.mode === 'edit') {
        btnMode.color = 'btn-warning'
        btnMode.label = 'Editar'
        btnMode.fn = props.save
    }

    return (
        <div className="user-forms">
            <div className="form-group">
                <label htmlFor="category">Nome</label>
                <input type="text" className="form-control" name="name"
                    value={props.category.name} onChange={props.changeFild} />
            </div>
            <button className={`btn ${btnMode.color} mr-2`} onClick={btnMode.fn} >{btnMode.label}</button>
            <button className="btn btn-secondary mr-2" onClick={_ => props.focus()} >Cancelar</button>
        </div>
    )
}

export default CategoryForms