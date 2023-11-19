import React, { useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { AiOutlineSearch } from "react-icons/ai";
import { format } from "path";

const SearchGpt: React.FC<AvatarProps> = ({ formattedReviews }) => {
  const [search, setsearch] = useState("");
  const [results, setResults] = useState("");
  const router = useRouter();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setsearch(event.target.value);
  };

  const handleSearchSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    let reviews = "";
    for (var i = 0; i < 20; ++i) {
      reviews += formattedReviews[i].text;
      reviews += ",\n";
    }

    try {
      var responseClone;
      fetch("/api/gpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: search, reviews: reviews }),
      })
        .then((response) => {
          responseClone = response.clone();
          return response.json();
        })
        .then(
          (data) => {
            setResults(data.result);
          },
          (rejectionReason) => {
            console.log(
              "Error parsing JSON from response:",
              rejectionReason,
              responseClone
            ); // 4
            responseClone
              .text() // 5
              .then(function (bodyText) {
                console.log(
                  "Received the following instead of valid JSON:",
                  bodyText
                ); // 6
              });
          }
        );
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  const resultArray = results.split("\n");

  return (
    <div className="justify-center relative">
      <form
        onSubmit={handleSearchSubmit}
        className="flex items-center border-2 border-neutral-200 active:border-primary-500 transition rounded-lg"
      >
        <input
          type="search"
          placeholder="Search Topics"
          value={search}
          onChange={handleSearchChange}
          className="p-2 rounded-l-3xl w-100 xl:w-100 2xl:w-100 focus:outline-none"
        />
        <button
          type="submit"
          className="absolute right-1 p-1 rounded-r-3xl bg-white"
        >
          <div className="rounded-full">
            <AiOutlineSearch size={28} />
          </div>
        </button>
      </form>
      <div>
        {resultArray.map((result) => (
          <div>{result}</div>
        ))}
      </div>
    </div>
  );
};

export default SearchGpt;
