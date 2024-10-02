import Board from "./components/Board";
import initialData from "./data/data.json";

const App = () => {
  return <Board initialData={initialData} />;
};

export default App;
