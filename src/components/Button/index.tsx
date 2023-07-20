import style from './button.module.css'
import { IButton } from "../../interface/Inteface"

export const Button = ({text}: IButton) =>{
  return(
    <button className={style.button}>
      <span>{text}</span>
    </button>
  )
}