import { gql, useMutation } from "@apollo/client";
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";
import { useCreateSubscriberMutation } from "../graphql/generated";

// const CREATE_SUBSCRIBE_MUTATION = gql`
//     mutation CreateSubscriber($name: String!, $email: String!) {
//       createSubscriber(data: {name: $name, email: $email}) {
//         id
//       }
//     }
//   `

export function Subscribe() {
  const navigate = useNavigate() // Redireciona o usuário para uma nova tela sem ter que clicar em um link # a

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // const [createSubscriber, { loading }] = useMutation(CREATE_SUBSCRIBE_MUTATION) // createSubscriber = Função que realiza a mutation | loading = true significa que a mutation está sendo feita   
  const [createSubscriber, { loading }] = useCreateSubscriberMutation() // createSubscriber = Função que realiza a mutation | loading = true significa que a mutation está sendo feita   

  async function handleSubscribe(e: FormEvent) {
    e.preventDefault();

    if (name !== '' && email !== '') {
      await createSubscriber({ // Cria um usuário assinante 
        variables: { // variáveis recebidas do mutation CreateSubscriber($name: String!, $email: String!)
          name,
          email
        }
      })

      navigate('/event')
    }
    // console.log(name, email)
  }

  return (
    <section className="min-h-screen bg-blur bg-cover bg-no-repeat grid place-content-center p-6">
      <div className="w-full max-w-[1100px] flex flex-col md:flex-row items-center gap-14 justify-between md:mt-20 mx-auto">
        <div className="text-center grid md:text-left max-w-[640px] basis-1/2">
          <Logo />
          <h1 className="mt-8 text-[2.5rem] leading-tight">
            Construa uma <strong className="text-blue-500">aplicação completa</strong>, do zero, com <strong className="text-blue-500">React</strong>
          </h1>
          <p className="mt-4 text-gray-200 leading-relaxed">
            Em apenas uma semana você vai dominar na prática uma das tecnologias mais utilizadas e com alta demanda para acessar as melhores oportunidades do mercado.
          </p>
        </div>

        <div className="p-8 bg-gray-700 border w-full border-gray-500 rounded basis-1/3">
          <h2 className="text-2xl mb-6">Inscreva-se gratuitamente</h2>

          <form onSubmit={handleSubscribe} className="grid gap-2 w-full">
            <input
              className="bg-gray-900 border border-gray-500 rounded px-5 h-14"
              type="text"
              placeholder="Seu nome completo"
              onChange={e => setName(e.target.value)}
            />
            <input
              className="bg-gray-900 border border-gray-500 rounded px-5 h-14"
              type="email"
              placeholder="Digite seu email"
              onChange={e => setEmail(e.target.value)}
              required
            />

            <button
              className="button mt-4 bg-green-500 hover:bg-green-700 hover:disabled:bg-green-500 disabled:opacity-60 disabled:cursor-not-allowed"
              type="submit"
              disabled={name.length === 0 || email.length === 0 && loading /* loading não permite que o usuário clique várias vezes no botão e fazendo várias requisições */}
            >
              Garantir minha vaga
            </button>
          </form>
        </div>
      </div>
      <img src="/src/assets/code-mock.png" className="mt-10" alt="laptop" />
    </section>
  )
}