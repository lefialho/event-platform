import { useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../components/Header";
import { SideBar } from "../components/Sidebar";
import { Video } from "../components/Video";

export function Event() {
  const { slug } = useParams<{ slug: string }>()
  const [openMenu, setOpenMenu] = useState(false)

  return (
    <div className="flex flex-col min-h-screen">
      <Header setOpenMenu={() => setOpenMenu(!openMenu)}/>
      <main className="flex flex-col lg:flex-row flex-1">
        {slug
          ? <Video lessonSlug={slug} />
          : <div className="flex-1" >Clique em uma aula no menu ao lado</div> /*slug = tem vídeo?*/}
        <SideBar menu={openMenu} closeMenu={() => setOpenMenu(false)}/>
      </main>
    </div>
  )
}