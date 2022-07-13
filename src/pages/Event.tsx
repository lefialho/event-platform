import { gql, useQuery } from "@apollo/client";
import { FileSearch } from "phosphor-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../components/Header";
import { SideBar } from "../components/Sidebar";
import { Video } from "../components/Video";
// import { useGetSubscriberQuery } from "../graphql/generated";

const GET_SUBSCRIBER = gql`
  query getSubscriber($email: String) {
    subscriber(where: {email: $email}) {
      email
      name
    }
  }
`
interface getSubscriber {
  email: string;
  name: string;
}

// interface getSubscriber {
//   email: string;
// }


export function Event(props: getSubscriber) {
  const { slug } = useParams<{ slug: string }>()
  const [openMenu, setOpenMenu] = useState(false)

  // const { data } = useQuery<getSubscriber>(GET_SUBSCRIBER, {
  //   variables: {
  //     email: props.email
  //   }
  // })

  // const { data } = useGetSubscriberQuery({
  //   variables: {
  //     email: props.email
  //   }
  // })

  return (
    <div className="flex flex-col min-h-screen">
      <Header setOpenMenu={() => setOpenMenu(!openMenu)} />
      <main className="flex flex-col xl:flex-row flex-1">
        {slug ? (
          <Video lessonSlug={slug} />
        ) : (
          <div className="flex-1 p-6">
            <div className="border border-gray-500 p-4 rounded">
              <h1 className="text-2xl font-bold">Bem vindo! {props.name}</h1>
              <p className="mb-4"><b>Email:</b> {props.email}</p>
              <div className="flex gap-2 items-center">
                <FileSearch size={24} />
                <p>Para encontrar os conteúdos, acesse o menu de <b>Aulas</b></p>
              </div>
            </div>
            <img src="./img/code-mock.png" className="mt-10" alt="laptop" />
          </div> /*slug = tem vídeo?*/
        )}
        <SideBar menu={openMenu} closeMenu={() => setOpenMenu(false)} />
      </main>
    </div>
  )
}