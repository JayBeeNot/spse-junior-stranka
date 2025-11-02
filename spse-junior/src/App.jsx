import "./App.css";
import Carousel from "./components/carousel/carousel";
import ElektromatikModal from "./components/modal/modal-elektromatik";
import Elektronikamodal from "./components/modal/modal-elektronika";
import Elesparksmodal from "./components/modal/modal-elesparks";
import Legobotmodal from "./components/modal/modal-legobot";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
        <button
          onClick={() => (window.location.href = "/login")}
          className="absolute top-4 right-4 z-10 bg-blue-500 text-white px-4 py-2 rounded shadow"
        >
          Prihlásiť sa
        </button>
      
      <Carousel />
      <div className="grid grid-cols-4 bg-white">
        <div className="flex items-center ">
          <img src="/assets/sutaze/ELEKTROmatik.png" className="h-32 w-32" />
          <ElektromatikModal />
        </div>

        <div className="flex items-center ">
          <img src="/assets/sutaze/ELEsparks.png" className="h-32 w-32" />
          <Elesparksmodal />
        </div>

        <div className="flex items-center ">
          <img src="/assets/sutaze/ELEKTRONIKA.png" className="h-32 w-32" />
          <Elektronikamodal />
        </div>

        <div className="flex items-center ">
          <img src="/assets/sutaze/LEGObot.png" className="h-32 w-32" />
          <Legobotmodal />
        </div>
      </div>
    </>
  );
}

export default App;
