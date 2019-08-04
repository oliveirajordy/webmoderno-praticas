import React from 'react'

import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

const ArticleForms = props => {

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

    const options = options => {
        return options.map(option => {
            return (
                <option key={option.name} value={option.id} >{option.path ? option.path : option.name}</option>
            )
        })
    }

    return (
        <div className="article-forms">
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" className="form-control" name="name"
                    value={props.article.name} onChange={props.changeFild}
                    placeholder="Nome do artigo" />
            </div>
            <div className="form-group">
                <label htmlFor="description">Descrição</label>
                <input type="text" className="form-control" name="description"
                    value={props.article.description} onChange={props.changeFild}
                    placeholder="Descrição do artigo" />
            </div>
            <div className="form-group">
                <label htmlFor="imageUrl">imagem (Url)</label>
                <input type="text" className="form-control" name="imageUrl" placeholder="Url da imagem"
                    value={props.article.imageUrl} />
            </div>
            <div className="form-group">
                <label htmlFor="categoryId">Categoria</label>
                <select name="categoryId" className="form-control" onChange={props.changeFild}
                    value={props.article.categoryId === null ? 'null' : props.article.categoryId} >
                    <option value='null' >Selecione uma categoria</option>
                    {options(props.categories)}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="usersId">Usuários</label>
                <select name="userId" className="form-control" onChange={props.changeFild}
                    value={props.article.userId === null ? 'null' : props.article.userId} >
                    <option value='null' >Selecione um usuario</option>
                    {options(props.users)}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="content">Conteudo</label>
                <CKEditor editor={ClassicEditor}
                    data={props.editorState}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        props.setEditorState(data)
                    }}
                    disabled={disabled} />
            </div>
            <button className={`btn ${btnMode.color} mr-2`} onClick={btnMode.fn} >{btnMode.label}</button>
            <button className="btn btn-secondary mr-2" onClick={_ => props.focus()} >Cancelar</button>
        </div>

    )
}

export default ArticleForms