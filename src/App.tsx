// ApolloProvider, BrowserRouter são providers passados por context para que os componentes possam se comunicar
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import { client } from "./lib/apollo";
import { Event } from "./pages/Event";
import { Router } from "./Router";

export function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter> 
        <Router />
      </BrowserRouter>
    </ApolloProvider>
    // <Event />
  )
}
