import MapView from "./components/MapView";
import Navbar from "./components/Navbar";
import InformationPanel from "./components/InformationPanel";
import Sidebar from "./components/Sidebar";
import { APIProvider } from "@vis.gl/react-google-maps";
function App() {
  return (
    <div className="h-screen w-screen flex gap-2 p-2">
      <div className="flex flex-col gap-3 w-[calc(100vw-300px)] h-full ">
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_API_KEY}>
          <Navbar />
          <MapView />
          <InformationPanel />
        </APIProvider>
      </div>
      <div className="min-w-[320px] w-[20%] h-full ">
        <Sidebar />
      </div>
    </div>
  );
}

export default App;
