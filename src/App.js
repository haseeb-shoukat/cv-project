import General from "./components/General";
import Education from "./components/Education";
import Work from "./components/Work";

function App() {
  return (
    <div className="main">
      <div className="heading">CV Application</div>
      <General />
      <Education />
      <Work />
    </div>
  );
}

export default App;
