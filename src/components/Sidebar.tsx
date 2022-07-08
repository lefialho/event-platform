import { gql, useQuery } from "@apollo/client";
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

export function SideBar() {
  // const { data } = useQuery<GetLessonsQueryResponse>(GET_LESSONS_QUERY);
  const { data } = useGetLessonsQuery()
   
  return (
    <aside className="w-[348px] bg-gray-700 p-6 border-l border-gray-600">
      <h2 className="font-bold text-2xl pb-6 mb-6 border-b border-gray-500">Cronograma das aulas</h2>
      
      <div className="flex flex-col gap-8">
        {data?.lessons.map(lesson => {
          return (
            <Lesson
              key={lesson.id}
              title={lesson.title}
              slug={lesson.slug}
              availableAt={new Date(lesson.availableAt)}
              type={lesson.lessonType}
            />
          )
        })}
      </div>
    </aside>
  )
}