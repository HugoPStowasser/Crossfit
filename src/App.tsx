import { Login } from "./pages/Login";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <Login />
      </ChakraProvider>
    </div>
  );
}

export default App;
