// Cada rota da aplicação é um route
import { gql, useMutation } from "@apollo/client";
import { FormEvent, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useCreateSubscriberMutation } from "./graphql/generated";
import { Event } from "./pages/Event";
import { Subscribe } from "./pages/Subscribe";

// const CREATE_SUBSCRIBE_MUTATION = gql`
//     mutation CreateSubscriber($name: String!, $email: String!) {
//       createSubscriber(data: {name: $name, email: $email}) {
//         id
//       }
//     }
//   `
  
export function Router() {
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
  }

  function handleName(e: any) {
    setName(e.target.value)
  }

   function handleEmail(e: any) {
    setEmail(e.target.value)
  }

  return (
    <Routes>
      <Route path="/" element={
      <Subscribe 
        setName={handleName} 
        setEmail={handleEmail} 
        subscribe={handleSubscribe}
        loading= {loading}
        />}
      />
      <Route path="/event/" element={<Event name={name} email={email}/>}/>
      <Route path="/event/lesson/:slug" element={<Event name={name} email={email}/>}/>
    </Routes>
  )
}