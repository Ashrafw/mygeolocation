import { useAppSelector } from "@/store/hooks";
import SearchHistoryItem from "./SearchHistoryItem";

const SearchHistory = () => {
  const searchHistory = useAppSelector((state) => state.searchHistory);

  return (
    <div className="w-full h-full overflow-hidden bg-slate-800 text-gray-200 rounded">
      <h1 className="  text-2xl font-bold border-b p-2 px-4">Search History</h1>
      <div className="flex flex-col gap-2 p-1 py-2 overflow-auto h-[calc(100%-50px)] pb-4">
        {searchHistory.locations.map((loc) => (
          <SearchHistoryItem key={loc.id} loc={loc} />
        ))}
      </div>
    </div>
  );
};

export default SearchHistory;
