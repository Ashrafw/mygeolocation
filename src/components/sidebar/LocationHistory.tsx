import { useMemo } from "react";
import { useAppSelector } from "../../store/hooks";
import LocationItem from "./LocationItem";
import CsvDownloadButton from "react-json-to-csv";
import { Download } from "lucide-react";
const LocationHistory = () => {
  const location = useAppSelector((state) => state.location);
  const data = useMemo(() => {
    return location.locations.map((item) => {
      return { id: item.id, Latitude: item.latLang.lat, Longitude: item.latLang.lng };
    });
  }, [location]);

  return (
    <div className="w-full h-full bg-slate-800 text-gray-200 rounded">
      <div className="flex justify-between pr-3 border-b items-center ">
        <h1 className="  text-2xl font-bold p-2 px-4">My Locations</h1>
        {data.length > 0 && (
          <CsvDownloadButton
            data={data}
            className="flex items-center justify-between gap-3 px-4 p-2 bg-slate-600 hover:bg-slate-700 h-8 rounded-md shadow"
          >
            Download <Download />
          </CsvDownloadButton>
        )}
      </div>

      <div className="flex flex-col gap-2 p-1 py-2 overflow-auto h-[calc(100%-50px)] pb-4 ">
        {location.locations.map((loc) => (
          <LocationItem key={loc.id} loc={loc} />
        ))}
      </div>
    </div>
  );
};

export default LocationHistory;
