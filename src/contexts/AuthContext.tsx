import { ReactNode, createContext, useState } from 'react'
import { api } from '../server';
import { isAxiosError } from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface IAuthProvider {
  children: ReactNode;
}

interface IAuthContextDada {
  signIn: ({ email, password }: ISignIn) => void;
  signOut: () => void;
  user: IUserData
}

interface IUserData{
  name: string;
  email: string;
  avatar_url: string;
}

interface ISignIn {
  email: string;
  password: string;
}

export const AuthContext = createContext({

} as IAuthContextDada);

export function AuthProvider({ children }: IAuthProvider) {

  const [user, setUser] = useState(()=>{
    const user =localStorage.getItem('user:agenda-edf');
    if(user){
      return JSON.parse(user);
    }
    return{};
  })
  const navigate = useNavigate();
  async function signIn({ email, password }: ISignIn) {
    try {
      const { data } = await api.post('/users/auth', {
        email,
        password
      });
      const { token, refresh_token, user } = data;
      const usuario = {
        name: user.name,
        email: user.email,
        avatar_url: user.avatar_url
      }
      localStorage.setItem('token:agenda-edf', token);
      localStorage.setItem('refresh_token:agenda-edf', refresh_token);
      localStorage.setItem('user:agenda-edf', JSON.stringify(usuario));
      navigate('/dashboard');
      toast.success(`Seja bem vindo, ${usuario.name}`);
      setUser(usuario);
      return data;
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
      else {
        toast.error('Não conseguimos realizar o login. Tente mais tarde!')
      }
      console.log('Erro signIn');
    }
  }

  function signOut() {
    localStorage.removeItem('token:agenda-edf');
    localStorage.removeItem('refresh_token:agenda-edf');
    localStorage.removeItem('user:agenda-edf');
    navigate('/');
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, user }}>
      {children}
    </AuthContext.Provider>
  );
}