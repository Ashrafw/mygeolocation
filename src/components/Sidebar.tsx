import LocationHistory from "./sidebar/LocationHistory";
import SearchHistory from "./sidebar/SearchHistory";

const Sidebar = () => {
  return (
    <div className=" w-full h-full grid grid-rows-2 gap-2  p-1  ">
      <LocationHistory />
      <SearchHistory />
    </div>
  );
};

export default Sidebar;
