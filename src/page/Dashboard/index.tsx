import { Header } from "../../components/Header";
import { userAuth } from "../../hooks/auth";
import { DayPicker } from 'react-day-picker';
import { Card } from "../../components/Card";
import { useEffect, useState } from "react";

import 'react-day-picker/dist/style.css';
import style from './Dashboard.module.css';
import { ptBR } from "date-fns/locale";
import { format, isToday } from "date-fns";
import { api } from "../../server";

interface IAgenda{
  name: string;
  phone: string;
  date: Date;
  id: string;
}
export function Dashboard() {
  const [date, setDate] = useState(new Date());
  const { user } = userAuth();
  const [agendas, setAgendas] = useState<Array<IAgenda>>([]);
  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  }

  const isWeeDay = (date: Date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  }

  const handleDataChange = (date: Date) => {
    setDate(date);
  }

  useEffect(()=>{
    api.get('/agendas',{
      params:{
        date,
      }
    }).then((response)=>{
      console.log('use Effect - response', response);
      setAgendas(response.data);
    }).catch((error)=>{
      console.log('error use Effect',error);
    });
  },[date]);
  return (
    <div className="container">
      <Header />
      <div className={style.dataTitle}>
        <h2>Bem vindo(a), {user.name}</h2>
        <p>Esta é sua lista de horários de {isToday(date) && <strong>HOJE</strong> || format(date, 'dd/MM/yyy')}</p>
      </div>
      <h3 className={style.h3}>Próximos Horários</h3>
      <div className={style.agenda}>
        <div className={style.cardWrapper}>
          {agendas.map((agenda, index)=>{
            return <Card key={index} name={agenda.name} date={agenda.date} id={agenda.id} phone={agenda.phone}/>;
          })}
        </div>
        <div className={style.picker}>
          <DayPicker
            className={style.calendar}
            classNames={{
              day: style.day
            }}
            fromMonth={new Date}
            locale={ptBR}
            selected={date}
            modifiers={{ available: isWeeDay }}
            mode="single"
            modifiersClassNames={{
              selected: style.selected,
            }}
            disabled={isWeekend}
            onDayClick={handleDataChange}
          />
        </div>
      </div>

    </div>
  )
}