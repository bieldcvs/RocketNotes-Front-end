import { useState } from 'react';
import {Container , Form , Background} from './style';
import { Input } from "../../components/input";
import { Button } from "../../components/Button";
import { Link , useNavigate} from "react-router-dom";
import { api } from "../../service/api";


import { FiUser,FiMail , FiLock } from "react-icons/fi";

export function SignUp(){
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Navigate = useNavigate();

  function handleSignUp(){
    if (!name || !email || !password){
      return alert("Preencha todos os campos");
    }

    api.post("/users",{name,email,password})
    .then(() => {
      alert("Usuário cadastrado com sucesso!");
      Navigate("/");
    })
    .catch(error => {
      if(error.response){
        alert(error.response.data.message);
      } else{
        alert("Não foi possivel cadastrar .")
      }
    });
  }



  return(
    <Container>
        <Background/>
        <Form>
          <h1>Rocket Notes</h1>
          <p>Aplicação para salvar e gerenciar seus links úteis.</p>
          <h2>Crie sua conta</h2>

          <Input
          placeholder = "Nome"
          type="text"
          icon={FiUser}
          onChange={e => setName(e.target.value)}
          />
          <Input
          placeholder = "E-mail"
          type="text"
          icon={FiMail}
          onChange={e => setEmail(e.target.value)}
          />
          <Input
          placeholder = "Senha"
          type="password"
          icon={FiLock}
          onChange={e => setPassword(e.target.value)}
          />
         
         <Button title="Cadastrar" onClick={handleSignUp}/>
        
        <Link to='/'>Voltar para o login</Link>
        
        </Form>
      
    </Container>
  );
  
}