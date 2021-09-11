import React, { useEffect } from "react";
import QuoteList from "../components/quotes/QuoteList";
import { getAllQuotes } from "../lib/api";
import useHttp from "../hooks/use-http";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import classes from "./AllQuotes.module.css";

// const DUMMY_QUOTES = [
//   {
//     id: 1,
//     author: "Omkar",
//     text: "Learning React is a Fun!",
//   },
//   {
//     id: 2,
//     author: "Bajarang",
//     text: "Working as a MERN stack developer is a great",
//   },
// ];

function AllQuotes() {
  const {
    sendRequest,
    status,
    error,
    data: loadedQuotes,
  } = useHttp(getAllQuotes, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending") {
    return (
      <div className={`${classes.loading} `}>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className='centered focused'>{error}</p>;
  }

  if (status === "completed" && (!loadedQuotes || loadedQuotes.length === 0)) {
    return (
      <div className='centered focused'>
        <NoQuotesFound />
      </div>
    );
  }

  console.log(loadedQuotes);

  return (
    <div>
      <h1>In All Quotes Page</h1>
      <QuoteList quotes={loadedQuotes} />
    </div>
  );
}

export default AllQuotes;
