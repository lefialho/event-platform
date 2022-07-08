import { CheckCircle, FastForward, Lock } from 'phosphor-react'
import { isPast, format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';

interface LessonProps {
  title: string;
  slug: string;
  availableAt: Date;
  type: 'live' | 'class'; // Live = aula ao vivo, class = aula prática
}

export function Lesson(props: LessonProps) {
  const { slug } = useParams<{slug: string }>() // Slug da url (aula-ativa no momento)

  const isLessonAvaiable = isPast(props.availableAt); // Se a data de disponibilização da aula já passou, então ela está liberada
  const availableDateFormatted = format(props.availableAt, "EEEE '•' d 'de' MMMM '•' k'h'mm", {
    locale: ptBR,
  }); //EEEE=dia semana, d=dia mes, MMMM=mes, k=hora

  const isActiveLesson = slug === props.slug; // Significa que essa aula está ativa

  return (
    <Link to={`/event/lesson/${props.slug}`} className="group">
      <span className="text-gray-300 capitalize">
        {availableDateFormatted}
        {/* {props.availableAt.toString()} */}
        {/* Domingo • 20 de junho • 19h00 */}
      </span>

      {/* {className=`rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500 ${isActiveLesson ? 'bg-green-500' : ''}`} */}

      <div className={isLessonAvaiable 
        ? classNames('lesson group-hover:border-green-500', {
        'bg-green-500': isActiveLesson // fica com bg verde quando a aula está ativa
      }) 
        : 'lesson cursor-not-allowed group-hover:border-gray-500'}>
        <header className="flex items-center justify-between">
          {isLessonAvaiable ? (
            <div className={classNames('text-sm font-medium flex items-center gap-2', {
              'text-white': isActiveLesson,
              'text-blue-500': !isActiveLesson
            })}>
              <CheckCircle size={20} />
              Conteúdo liberado
            </div>
          ) : (
            <div className="text-sm text-orange-500 font-medium flex items-center gap-2">
              <Lock size={20} />
              Em breve
            </div>
          )}
          <span className={classNames(`uppercase text-xs rounded py-[0.125rem] px-2 border font-bold ${props.type === 'live' ? 'text-green-300' : 'text-white'}`, {
            'text-green-100': isActiveLesson,
            'border-green-100': isActiveLesson,
            'border-white': !isActiveLesson,
          })}>
            {props.type === 'live' ? 'Ao Vivo' : 'Aula Prática'}
          </span>
        </header>

        <p className={classNames('mt-5' , {
          'text-white': isActiveLesson,
          'text-gray-200': !isActiveLesson
        })}>
          <strong>
            {props.title}
            {/* Abertura do evento Ignite labs */}
          </strong>
        </p>
      </div>
    </Link>
  )
}