import React, { useEffect, useState } from 'react';
import { Header } from '..';
import { Alert,Spinner } from '../comps/comps';
import { GetToken } from './login';
import Head from 'next/head';

export default function Address() {

    const [text,setText] = useState("Use o formulário abaixo para Gerenciar seu Endereço.")
    const [type_alert,setTypeAlert] = useState("primary")
    const [visible,setVisible] = useState(false)

    useEffect(()=>{
        setVisible(true)
        fetch('/api/user/address',{
            method:"GET",
            headers:{
                'Authorization':GetToken(),
                'Content-Type': 'application/json',
            },
        }).then(response=>response.json())
        .then(response=>{
            console.log(response)
            if(response['status'] == 'ok'){
                if(response['address'] != null) 
                setFormData(response['address'])
            }else{
                setText("Aconteceu Algum erro :(")
                setTypeAlert('danger')
            }
            setVisible(false)
        })
    },[])

  const [formData, setFormData] = useState({
    road: '',
    neighborhood: '',
    state: '',
    city: '',
    zip_code: '',
    number:''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Form Data:', formData);
    console.log(GetToken())
    
    setVisible(true)
    fetch('/api/user/address',{
        method:"POST",
        headers:{
            'Authorization':GetToken(),
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(formData)
    }).then(response=>response.json())
    .then(response=>{
        if(response['status'] == 'ok'){
            setText("Seu Endereço foi Salvo com Sucesso !")
            setTypeAlert('success')
        }else{
            setText("Aconteceu Algum erro :(")
            setTypeAlert('danger')
        }
        setVisible(false)
    })

  };

  return (
    <div>

        <Head>
            <title>Gerencie Seu Endereço de Entrega</title>
        </Head>
        <Header />
        <Alert text={text} type={type_alert}/>
        <Spinner visible={visible} />
      <div id="form">
        <p>
          <label>
            Rua:
          </label>
          <input 
              type="text" 
              name="road" 
              className="form-control" 
              value={formData.road}
              onChange={handleChange} 
            />
        </p>

        <p>
          <label>
            Bairro:

          </label>
          <input 
              type="text" 
              name="neighborhood" 
              className="form-control" 
              value={formData.neighborhood}
              onChange={handleChange} 
            />
        </p>
        <p>
          <label>
            Estado:

          </label>
          <input 
              type="text" 
              name="state" 
              className="form-control" 
              value={formData.state}
              onChange={handleChange} 
            />
        </p>
        <p>
          <label>
            Cidade:

          </label>
          <input 
              type="text" 
              name="city" 
              className="form-control" 
              value={formData.city}
              onChange={handleChange} 
            />
        </p>
        <p>
          <label>
            CEP:

          </label>
          <input 
              type="text" 
              name="zip_code" 
              className="form-control" 
              value={formData.zip_code}
              onChange={handleChange} 
            />
        </p>
        <p>
          <label>
            N°:

          </label>
          <input 
              type="text" 
              name="number" 
              className="form-control" 
              value={formData.number}
              onChange={handleChange} 
            />
        </p>
        <button type='button' onClick={handleSubmit} className='btn btn-primary'>Salvar</button>
      </div>
    </div>
  );
}
