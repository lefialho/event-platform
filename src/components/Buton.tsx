import { DiscordLogo, Lightning } from "phosphor-react";

interface Buttons {
  variant: string;
}

export function Button(props: Buttons) {
  return (
    <>
      {props.variant === 'light' ? (
        <a href="" className="button bg-green-500 hover:bg-green-700">
          <DiscordLogo size={24} />
          Comunidade do discord
        </a>
      ) : (
        <a href="" className="button border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-gray-900">
          <Lightning size={24} />
          Acesse o desafio
        </a>
      )}
    </>
  )
}