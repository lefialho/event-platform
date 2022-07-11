import { List } from "phosphor-react";
import { Logo } from "./Logo";
interface Menu {
  setOpenMenu: () => void,
}

export function Header(props: Menu) {
  return (
    <header className="w-full py-5 flex gap-4 justify-between px-6 lg:grid place-content-center bg-gray-700 border-b border-gray-600 group">
      <Logo />
      <button className="lg:hidden flex items-center gap-2 group" onClick={props.setOpenMenu}>
        <span className="text-sm">Aulas</span> 
        <List size={30} className="group-hover:text-blue-500"/> 
      </button>
    </header>
  )
}