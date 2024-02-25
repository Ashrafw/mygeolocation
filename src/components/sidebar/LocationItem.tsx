import { LocationType, removeLocation } from "../../store/Slices/locationSlice";
import { setCurrentLocation } from "@/store/Slices/currentLocationSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { notification } from "@/lib/helper";
import { Trash } from "lucide-react";

type Props = {
  loc: LocationType;
};

const LocationItem = ({ loc }: Props) => {
  const dispatch = useAppDispatch();
  const currentLocation = useAppSelector((state) => state.currentLocation);

  const handleDelete = () => {
    dispatch(removeLocation(loc.id));
    notification("Location deleted.", "success");
  };
  return (
    <div
      className={`flex justify-between p-2 rounded-md border border-white/5 px-4 cursor-pointer ${
        currentLocation.value === loc.latLang ? "bg-slate-600 text-gray-200 shadow" : " "
      } hover:shadow hover:bg-slate-200 hover:text-gray-900`}
      onClick={() => dispatch(setCurrentLocation(loc.latLang))}
    >
      <div className="flex gap-4">
        <div>
          Lat: <span className=" font-bold"> {loc.latLang.lat.toFixed(4)}</span>
        </div>
        <div>
          Lng: <span className=" font-bold">{loc.latLang.lng.toFixed(4)}</span>
        </div>
      </div>

      <Trash
        size={24}
        className=" p-[4px] rounded-full text-gray-400 hover:bg-red-800 hover:text-gray-50"
        onClick={handleDelete}
      />
    </div>
  );
};

export default LocationItem;
