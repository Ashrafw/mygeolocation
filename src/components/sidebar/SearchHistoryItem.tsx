import { notification } from "@/lib/helper";
import { setCurrentLocation } from "@/store/Slices/currentLocationSlice";
import {
  SearchLocationType,
  removeSearchLocation,
} from "@/store/Slices/searchHistorySlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Trash } from "lucide-react";

type Props = {
  loc: SearchLocationType;
};

const SearchHistoryItem = ({ loc }: Props) => {
  const dispatch = useAppDispatch();
  const currentLocation = useAppSelector((state) => state.currentLocation);
  const handleDelete = () => {
    dispatch(removeSearchLocation(loc.id));
    notification(`Search history "${loc.address}" deleted.`, "success");
  };
  return (
    <div
      className={`flex justify-between p-2 rounded-md border border-white/5 px-4 cursor-pointer ${
        currentLocation.value === loc.latLang ? "bg-slate-600 text-gray-200 shadow" : " "
      } hover:shadow hover:bg-slate-200 hover:text-gray-900`}
      onClick={() => dispatch(setCurrentLocation(loc.latLang))}
    >
      <div className="flex gap-4">
        <span className=" font-bold"> {loc.address}</span>
      </div>

      <Trash
        size={24}
        className=" p-[4px] rounded-full text-gray-400 hover:bg-red-800 hover:text-gray-50"
        onClick={handleDelete}
      />
    </div>
  );
};

export default SearchHistoryItem;
