import useRouteElements from "./routes/useRouteElements";

function App() {
  const { routes } = useRouteElements();

  return <>{routes}</>;
}

export default App;
