import useRouteElements from "./routes/useRouteElements";

import "react-toastify/dist/ReactToastify.css";

function App() {
  const { routes } = useRouteElements();

  return <>{routes}</>;
}

export default App;
