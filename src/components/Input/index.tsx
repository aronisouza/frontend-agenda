import { forwardRef, ForwardRefRenderFunction } from 'react'
import style from './input.module.css'
import { IInput } from '../../Interface/Inteface'

const InputBase: ForwardRefRenderFunction<HTMLInputElement, IInput> = (
  {error, placeholder, type, icon, ...rest }, ref,) => {
  return (
    <div className={style.container}>
      <label>
        <i area-hidden="true">
          {icon}
        </i>
        <input type={type} placeholder={placeholder} ref={ref} {...rest} />
      </label>{error && <span>{error}</span>}
    </div>
  )
}
export const Input = forwardRef(InputBase);