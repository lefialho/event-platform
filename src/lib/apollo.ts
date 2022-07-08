import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({ // env criado para não deixar os dados expostos ao enviar pro github
  uri:  import.meta.env.VITE_API_URL,
  headers: {
    'Authorization': `Bearer ${import.meta.env.VITE_API_ACCESS_TOKEN}` // 'Authorization' = Token criado no graphcms 
  },
  cache: new InMemoryCache() // Faz cache pela memória da aplicação
})