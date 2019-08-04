import React from 'react'

const CategoryForms = props => {

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

    const options = _ => {
        return props.categories.map(category => {
            if (category.id === props.category.id) return
            return (
                <option key={category.path} value={category.id} >{category.path}</option>
            )
        })
    }

    return (
        <div className="user-forms">
            <div className="form-group">
                <label htmlFor="category">Nome</label>
                <input type="text" className="form-control" name="name"
                    value={props.category.name} onChange={props.changeFild}
                    placeholder="Nome da categoria..." disabled={disabled} />
            </div>
            <div className="form-group">
                <label htmlFor="parentId">Pai</label>
                <select className="form-control" name="parentId" onChange={props.changeFild}
                    value={props.category.parentId === null ? 'null' : props.category.parentId} disabled={disabled}>
                    <option value='null' >Selecione uma Categoria Pai...</option>
                    {options()}
                </select>
            </div>
            <button className={`btn ${btnMode.color} mr-2`} onClick={btnMode.fn} >{btnMode.label}</button>
            <button className="btn btn-secondary mr-2" onClick={_ => props.focus()} >Cancelar</button>
        </div>
    )
}

export default CategoryForms