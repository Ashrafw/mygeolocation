import { useRef, useState } from "react";
import Geocoding from "./Geocoding";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const SearchLocation = () => {
  const [inputAddress, setInputAddress] = useState("");
  const [mainAddress, setMainAddress] = useState("");

  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMainAddress(inputAddress);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className=" w-full  h-full  border rounded-md p-4  shadow bg-slate-800 text-gray-300">
      <h1 className=" text-xl font-semibold border-b border-gray-400 mb-3">
        Search Location
      </h1>
      <form className="flex w-full items-center gap-2 m-0" onSubmit={handleSubmit}>
        <Input
          type="address"
          placeholder="Search Location"
          className="m-0 text-lg text-gray-800"
          ref={inputRef}
          onChange={(e) =>
            setTimeout(() => {
              setInputAddress(e.target.value);
            }, 100)
          }
        />
        <Button
          variant={"outline"}
          className={" text-gray-900 text-md hover:bg-slate-200 outline-none"}
          type="submit"
        >
          Search
        </Button>
      </form>
      {mainAddress?.length > 0 && <Geocoding address={mainAddress} />}
    </div>
  );
};

export default SearchLocation;
