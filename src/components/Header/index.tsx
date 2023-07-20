import style from './header.module.css';
import logo from '../../assets/logo.png'
import { BsPersonCircle } from 'react-icons/bs'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { userAuth } from '../../hooks/auth';

export function Header() {
  const { signOut, user } = userAuth();
  const [open, setOpen] = useState(false);
  return (
    <header className={style.background}>
      <div className={style.img}>
        <Link to={'/dashboard'}>
          <img src={logo} alt="" />
          <span>Encantos do Florescer</span>
        </Link>
      </div>
      <div className={style.profile}>
        <div className={style.dropdown} onClick={() => setOpen(!open)}>
          <BsPersonCircle size={20} />
          <span>{user.name}</span>
          {open && (
            <ul className={`${style.dropdownMenu} ${open && style.open}`}>
              <li className={style.dropdownMenuItem}>Agendamento</li>
              <li className={style.dropdownMenuItem}>Editar Perfil</li>
              <li className={style.dropdownMenuItem} onClick={signOut}>Sair</li>
            </ul>
          )}
        </div>
      </div>
    </header>
  )
}