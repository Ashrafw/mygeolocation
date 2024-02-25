import { MapPin } from "lucide-react";

const Navbar = () => {
  return (
    <div className="p-2 flex items-center gap-1">
      <MapPin />
      <h1 className=" text-2xl font-bold text-gray-700">MyGeoLocation</h1>
    </div>
  );
};

export default Navbar;
