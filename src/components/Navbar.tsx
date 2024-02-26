import { MapPin } from "lucide-react";
import { Switch } from "./ui/switch";

const Navbar = () => {
  return (
    <div className="p-2 flex items-center justify-between gap-1">
      <div className="flex items-center gap-1">
        <MapPin />
        <h1 className=" text-2xl font-bold text-gray-700">MyGeoLocation</h1>
      </div>
      <div className="flex items-center gap-2">
        <p className=" font-medium">Select all</p>
        <Switch onCheckedChange={() => null} />
      </div>
    </div>
  );
};

export default Navbar;
