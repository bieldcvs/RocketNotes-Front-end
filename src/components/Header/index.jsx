import { RiShutDownLine } from "react-icons/ri";
import { Container , Profile , Logout} from './style';
import {useAuth} from '../../hooks/auth';
import { api } from '../../service/api';
import { useNavigate } from 'react-router-dom';

export function Header(){
  const { singnOut, user } = useAuth();
  
  const navigate = useNavigate();
  function handleSignOut() {
    navigate("/");
    singnOut();
  }

  const avatarURL = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder;
 
  return(
    <Container>
      <Profile to="/profile">
         <img 
         src={avatarURL}
         alt={user.name}/>
         <div>
            <span>Bem-vindo!</span>
            <strong>{user.name}</strong>
         </div>
      </Profile>
      <Logout onClick={handleSignOut}>
        <RiShutDownLine/>
      </Logout>

    </Container>
  )
}