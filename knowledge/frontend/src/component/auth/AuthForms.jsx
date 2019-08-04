import React from 'react'
import './AuthForms.css'

const AuthForms = props => {

    return (
        <React.Fragment>
            {props.signupCheck && <input type="text" className="form-control mb-2" name='name' placeholder='Nome' value={props.name} onChange={props.changeFild} />}

            <input type="text" className="form-control mb-2" name="email" placeholder='E-Mail' value={props.email} onChange={props.changeFild} />
            <input type="password" className="form-control mb-2" name="password" placeholder='Senha' value={props.password} onChange={props.changeFild} />

            {props.signupCheck && <input type="password" className="form-control mb-2" name="confirmPassword" placeholder='Confirme a senha' value={props.confirmPassword} onChange={props.changeFild} />}

            <button className="btn btn-primary mb-1" onClick={props.signupCheck ? props.signup : props.signin} >{props.signupCheck ? 'Registrar' : 'Entrar'}</button>

            <a href='' className="mt-5" onClick={props.alterSign} >
                {<span>{props.signupCheck ?
                    'Já tem cadastro? Acesse o Login!' : 'Não tem cadastro? Registre-se aqui'}</span>}
            </a>
        </React.Fragment>
    )
}

export default AuthForms