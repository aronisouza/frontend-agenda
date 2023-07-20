import { getHours, isAfter } from 'date-fns';
import style from './card.module.css';
import { BsTrash, BsPencil } from 'react-icons/bs'

interface IAgenda {
  name: string;
  phone: string;
  date: Date;
  id: string;
}
export const Card = ({ name, date, phone }:IAgenda) => {
  const jaPassouData = isAfter(new Date(date), new Date());
  return (
    <div className={style.background}>
      <div>
        <span className={`${!jaPassouData && style.japassoudata}`}>{getHours(new Date(date))}h</span>
        <p>{name} - {phone}</p>
      </div>
      <div className={style.icons}>
        <BsTrash color="#b31818" size={18} />
        <BsPencil color="#0c59a1" size={18} />
      </div>
    </div>
  )
}