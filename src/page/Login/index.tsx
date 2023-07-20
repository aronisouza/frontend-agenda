import style from './Login.module.css'
import logo from '../../assets/logo.png'
import { Input } from '../../components/Input'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link } from 'react-router-dom'
import { Button } from '../../components/Button'
import { AiOutlineMail, AiOutlineUnlock } from 'react-icons/ai'
import { userAuth } from '../../hooks/auth'

interface IFormValues {
  email: string;
  password: string;
}

export function Login() {
  const { signIn } = userAuth();
  const schema = yup.object().shape({
    email: yup.string()
      .email('Digite um email válido')
      .required('Campo de email obrigatório'),
    password: yup.string()
      .min(6, 'Mínimo de 6 caracteres')
      .required('Campo de senha obrigatório'),
  });
  const { register, handleSubmit, formState: { errors } } = useForm<IFormValues>({ resolver: yupResolver(schema) })
  const submit = handleSubmit(async ({ email, password }) => {
    try {
      signIn({ email, password });
    } catch (error) {
      console.log('erro no login',)
    }
  });
  return (
    <div className={style.background}>
      <div className={`container ${style.container}`}>
        <div className={style.wrapper}>
          <div>
            <img className={style.logo} src={logo} alt="" />
          </div>
          <div className={style.card}>
            <h2>Olá seja bem vindo!</h2>
            <form onSubmit={submit}>
              <Input error={errors.email && errors.email.message}
                placeholder="Email"
                type='text' {...register('email', { required: true })}
                icon={<AiOutlineMail size={20} />}
              />
              <Input error={errors.password && errors.password.message}
                placeholder="Senha"
                type='password' {...register('password', { required: true })}
                icon={<AiOutlineUnlock size={20} />}
              />
              <Button text='Entrar' />
            </form>
            <div className={style.register}>
              <span>
                Ainda não tem conta? <Link to={'/registro'}>Cadastre-se</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
