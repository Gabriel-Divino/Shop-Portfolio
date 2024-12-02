import Head from "next/head"
import { Header } from ".."
import { useState } from "react";
import { Spinner,Alert } from "../comps/comps";


export const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export default function Register(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const [text,setText] = useState("Use o formulário abaixo para se registrar !")
    const [type_alert,setTypeAlert] = useState("primary")
    const [visible,setVisible] = useState(false)
  

  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // Reset errors
      setEmailError('');
      setPasswordError('');
      setConfirmPasswordError('');
  
      // Validate email
      if (!validateEmail(email)) {
        setEmailError('Email inválido');
        return;
      }
  
      // Validate password
      if (!validatePassword(password)) {
        setPasswordError('A senha deve ter pelo menos 6 caracteres');
        return;
      }
  
      // Confirm password
      if (password !== confirmPassword) {
        setConfirmPasswordError('As senhas não coincidem');
        return;
      }
  
      // Submit the form
      console.log('Email:', email, 'Password:', password);
      
      let form = {
        email:email,
        password:password
      }

      setVisible(true)

      fetch('/api/user/register',{
        method:"POST",
        headers:{
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(form)
      }).then(response=>response.json())
      .then(response=>{
          console.log(response)
          if(response['status'] == 'ok'){
            
            setText("Você foi Registrado com Sucesso !")
            setTypeAlert('success')

            localStorage.setItem('token',response['token'])
            localStorage.setItem('token-time',new Date().toISOString())
            localStorage.setItem('user',email)
            window.location = "/"
          }else{
            setText(response['error'])
            setTypeAlert('danger')
          }

          setVisible(false)
      })

    };


    return(
        <div>
            <Head>
                <title>Shop - Registrar</title>
            </Head>

            <Header />

            <Alert text={text} type={type_alert}/>
            <Spinner visible={visible} />

            <form onSubmit={handleSubmit} id="form">
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                type="email"
                className={`form-control ${emailError ? 'is-invalid' : ''}`}
                id="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                {emailError && <div className="invalid-feedback">{emailError}</div>}
            </div>

            <div className="mb-3">
                <label htmlFor="password" className="form-label">Senha</label>
                <input
                type="password"
                className={`form-control ${passwordError ? 'is-invalid' : ''}`}
                id="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                {passwordError && <div className="invalid-feedback">{passwordError}</div>}
            </div>

            <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">Confirmar Senha</label>
                <input
                type="password"
                className={`form-control ${confirmPasswordError ? 'is-invalid' : ''}`}
                id="confirmPassword"
                placeholder="Confirme sua senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {confirmPasswordError && <div className="invalid-feedback">{confirmPasswordError}</div>}
            </div>

            <button type="submit" className="btn btn-primary">Registrar</button>
            </form>

        </div>
    )


}