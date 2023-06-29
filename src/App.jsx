import { Toaster } from "react-hot-toast";
import Loading from "./components/Global/Loading";
import AppRouter from "./router/AppRouter";


function App() {
  return (
    <>
      <AppRouter />
      <Toaster
        position="top center"
      />
      <Loading />
    </>
  );
}

export default App;
