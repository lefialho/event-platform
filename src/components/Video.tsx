// DefaultUi controles de vídeo padrão da lib
import { DefaultUi, Player, Youtube } from "@vime/react";
import { CaretRight, FileArrowDown } from "phosphor-react";
import { Button } from "./Buton";
import { gql, useQuery } from "@apollo/client";

// Tema para o vime e vídeo funcionar o layout corretamente
import '@vime/core/themes/default.css';
import { useGetLessonBySlugQuery } from "../graphql/generated";

// const GET_LESSON_BY_SLUG_QUERY = gql`
//   query GetLessonBySlug ($slug: String) {
//     lesson(where: {slug: $slug }) {
//       title
//       videoId
//       description
//       teacher {
//         bio
//         name
//         avatarURL
//       }
//     }
//   }
// `

// interface GetLessonBySlugResponse {
//   lesson: {
//     title: string;
//     videoId: string;
//     description: string;
//     teacher: {
//       bio: string;
//       avatarURL: string;
//       name: string
//     }
//   }
// }


interface VideoProps {
  lessonSlug: string;
}

export function Video(props: VideoProps) {
  // const { data } = useQuery<GetLessonBySlugResponse>(GET_LESSON_BY_SLUG_QUERY, {
  //   variables: {
  //     slug: props.lessonSlug,
  //   }
  // })

  const { data } = useGetLessonBySlugQuery({
    variables: {
      slug: props.lessonSlug,
    }
  })

  if (!data || !data.lesson) {
    return (
      <div className="flex-1">
        <p>Carregando...</p>
      </div>
    )
  }

  return (
    <section className="flex-1">
      <div className="bg-black flex justify-center">
        <div className="h-full w-full max-w-[1100px] max-h-[60vh] aspect-video">
          <Player>
            <Youtube videoId={data.lesson.videoId} />
            <DefaultUi />
          </Player>
        </div>
      </div>

      <article className="p-8 max-w-[1100px] mx-auto">
        <header className="flex flex-wrap gap-16">
          <div className="flex-1 min-w-[250px]">
            <h1 className="text-2xl font-bold">
              {data.lesson.title}
            </h1>

            <p className="mt-4 text-gray-200 leading-relaxed">
              {data.lesson.description}
            </p>

            {data.lesson.teacher && (
              <div className="flex itens-center gap-4 mt-6">
                <img
                  className="h-16 w-16 rounded-full border-2 border-blue-500"
                  src={data.lesson.teacher.avatarURL}
                  alt="Avatar" />

                <div className="leading-relaxed">
                  <h3 className="text-2xl">{data.lesson.teacher.name}</h3>
                  <p className="text-gray-200 text-sm">{data.lesson.teacher.bio}</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4 w-full sm:w-auto">
            <Button variant="light" />
            <Button variant="black" />
          </div>
        </header>

        <div className="gap-8 mt-20 grid grid-cols-1 xl:grid-cols-auto-fit">
          <a href="" className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-3 sm:gap-6 hover:bg-gray-600 transition-colors">
            <div className="bg-green-700 h-full p-3 sm:p-6 flex items-center">
              <FileArrowDown size={40} />
            </div>
            <div className="py-3 sm:py-6 leading-relaxed">
              <h3 className="text-xl sm:text-2xl">Material Complementar</h3>
              <p className="text-sm text-gray-200 mt-2">
                Acesse o material complementar para acelerar o seu desenvolvimento
              </p>
            </div>
            <div className="h-full grid place-content-center">
              <CaretRight size={24} />
            </div>
          </a>

          <a href="" className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-3 sm:gap-6 hover:bg-gray-600 transition-colors">
            <div className="bg-green-700 h-full p-3 sm:p-6 flex items-center">
              <FileArrowDown size={40} />
            </div>
            <div className="py-3 sm:py-6 leading-relaxed">
              <h3 className="text-xl sm:text-2xl">Wallpapers exclusivos</h3>
              <p className="text-sm text-gray-200 mt-2">
                Baixe wallpapers exclusivos do Ignite Lab e personalize a sua máquina
              </p>
            </div>
            <div className="h-full grid place-content-center">
              <CaretRight size={24} />
            </div>
          </a>
        </div>
      </article>
    </section>
  )
}