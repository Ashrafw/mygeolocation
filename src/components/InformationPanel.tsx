import InformationComp from "./informationPanel/InformationComp";
import SearchLocation from "./informationPanel/SearchLocation";

const InformationPanel = () => {
  return (
    <div className=" grid grid-cols-2  max-[945px]:grid-cols-1 gap-4 ">
      <InformationComp />
      <SearchLocation />
    </div>
  );
};

export default InformationPanel;
