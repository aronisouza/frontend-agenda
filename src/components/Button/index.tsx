import style from './index.module.css'
import { IButton } from "../../Interface/Inteface"

export const Button = ({text}: IButton) =>{
  return(
    <button className={style.button}>
      <span>{text}</span>
    </button>
  )
}