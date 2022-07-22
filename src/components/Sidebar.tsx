import { gql, useQuery } from "@apollo/client";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { useGetLessonsQuery } from "../graphql/generated";
import { Lesson } from "./Lesson";

// const GET_LESSONS_QUERY = gql`
//   query {
//     lessons(orderBy: availableAt_ASC, stage: PUBLISHED) {
//       id
//       slug
//       title
//       lessonType
//       availableAt
//     }
//   }
// `

// interface GetLessonsQueryResponse {
//   lessons: {
//     id: string
//     title: string
//     slug: string
//     availableAt: string
//     lessonType: 'live' | 'class' // Live = aula ao vivo, class = aula prática
//   }[]
// }

interface Menu {
  menu: boolean,
  closeMenu: () => void
}

export function SideBar(props: Menu) {
  // const { data } = useQuery<GetLessonsQueryResponse>(GET_LESSONS_QUERY);
  const { data } = useGetLessonsQuery();
  const navigate = useNavigate() // Redireciona o usuário para uma nova tela sem ter que clicar em um link # a

  function handleNavigate() {
    navigate('/')
    window.location.reload();
  }

  return (
    <aside className={classNames(`w-[348px] bg-gray-700 p-6 border-l border-gray-600 xl:block`, {
      'block absolute w-screen h-full': props.menu,
      'hidden': !props.menu,
    })}>
      <div className="flex justify-end">
        <button className="xl:hidden mb-4 deslogar" onClick={handleNavigate}>Deslogar</button>
      </div>

      <h2 className="font-bold text-2xl pb-6 mb-6 border-b border-gray-500">Conteúdos cadastrados</h2>

      <div className="flex flex-col gap-8">
        {data?.lessons.map(lesson => {
          return (
            <Lesson
              key={lesson.id}
              title={lesson.title}
              slug={lesson.slug}
              availableAt={new Date(lesson.availableAt)}
              type={lesson.lessonType}
              onClickLesson={props.closeMenu}
            />
          )
        })}
      </div>
    </aside>
  )
}