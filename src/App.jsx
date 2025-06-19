import UrlInputForm from "./components/UrlGeneratorForm";

function App() {
  const handleUrlGenerated = () => {
    console.log("GENERATED");
  };

  return (
    <div className="App">
      <UrlInputForm onGenerate={handleUrlGenerated} />
    </div>
  );
}
export default App;
