import style from './Register.module.css'
import logo from '../../assets/logo.png'
import { Input } from '../../components/Input'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link } from 'react-router-dom'
import { Button } from '../../components/Button'
import { AiOutlineTag, AiOutlineMail, AiOutlineUnlock } from 'react-icons/ai'
import { api } from '../../server'

interface IFormValues {
  name: string;
  email: string;
  password: string;
}

export function Register() {
  const schema = yup.object().shape({
    name: yup.string()
      .required('Seu nome é obrigatório'),

    email: yup.string()
      .email('Digite um email válido')
      .required('Campo de email obrigatório'),

    password: yup.string()
      .min(6, 'Mínimo de 6 caracteres')
      .required('Campo de senha obrigatório'),

  });
  const { register, handleSubmit, formState: { errors } } = useForm<IFormValues>({ resolver: yupResolver(schema) })
  const submit = handleSubmit(async (data) => {
    const result = await api.post('/users', {
      name: data.name,
      email: data.email,
      password: data.password
    });
    console.log('subimt - resultado :', result);
  });
  return (
    <div className={style.background}>
      <div className={`container ${style.container}`}>
        <p className={style.menu}><Link to={'/'}>Home</Link> {'>'} Área de Cadastro</p>
        <div className={style.wrapper}>
          <div className={style.imagemLogo}>
            <img className={style.logo} src={logo} alt="" />
          </div>
          <div className={style.card}>
            <h2>Vamos criar sua conta?</h2>
            <form onSubmit={submit}>
              <Input error={errors.name && errors.name.message}
                placeholder="Ex: Joana da Silva"
                type='text' {...register('name', { required: true })}
                icon={<AiOutlineTag size={20} />}
              />

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
              <Button text='Cadastrar' />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
