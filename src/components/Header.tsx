import { List } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import { Logo } from "./Logo";
interface Menu {
  setOpenMenu: () => void,
}

export function Header(props: Menu) {
  const navigate = useNavigate() // Redireciona o usuário para uma nova tela sem ter que clicar em um link # a
  
  function handleNavigate() {
    navigate('/')
    window.location.reload();
  }

  return (
    <header className="w-full flex gap-4 justify-between p-5 place-content-center bg-gray-700 border-b border-gray-600 group">
      <Logo />
      <button className="hidden xl:block deslogar" onClick={handleNavigate}>Deslogar</button>
      <button className="xl:hidden flex items-center gap-2 group" onClick={props.setOpenMenu}>
        <span className="text-sm">Menu</span> 
        <List size={30} className="group-hover:text-blue-500"/> 
      </button>
    </header>
  )
}