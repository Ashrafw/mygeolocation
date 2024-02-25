import { addLocation } from "../../store/Slices/locationSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { v4 as uuid } from "uuid";
import { Button } from "../ui/button";
import { notification } from "@/lib/helper";

type Props = {};

const InformationComp = ({}: Props) => {
  const dispatch = useAppDispatch();

  const currentLocation = useAppSelector((state) => state.currentLocation);
  const location = useAppSelector((state) => state.location);

  const handleAddLocation = () => {
    if (location.locations.some((item) => item.latLang === currentLocation.value)) {
      notification("This location has already been added", "error");
    } else {
      dispatch(addLocation({ id: uuid(), latLang: currentLocation.value }));
      notification("Location added.", "success");
    }
  };
  return (
    <div className=" w-full border rounded-md p-4 shadow bg-gray-100">
      <h1 className=" text-xl font-semibold border-gray-400 mb-1">Current Location:</h1>
      <div className=" flex flex-col items-start text-base w-full gap-2">
        <div className="flex flex-col w-full">
          <p>
            <span className=" font-semibold mr-4">Latitude</span>{" "}
            {currentLocation.value.lat}
          </p>
          <p>
            <span className=" font-semibold mr-1">Longitude</span>{" "}
            {currentLocation.value.lng}
          </p>
        </div>
        <Button className="w-full" onClick={() => handleAddLocation()}>
          Add
        </Button>
      </div>
    </div>
  );
};

export default InformationComp;
