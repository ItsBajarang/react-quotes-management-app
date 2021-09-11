import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import QuoteForm from "../components/quotes/QuoteForm";
import useHttp from "../hooks/use-http";
import { addQuote } from "../lib/api";

function NewQuote() {
  const { sendRequest, status } = useHttp(addQuote);
  const history = useHistory();

  useEffect(() => {
    if (status === "completed") {
      history.push("/quotes");
    }
  }, [status, history]);

  const onQuoteSubmitHandler = (newQuote) => {
    sendRequest(newQuote);
  };
  return (
    <div>
      <h1> In Quotes form Page </h1>
      <QuoteForm
        isLoading={status === "pending"}
        onAddQuote={onQuoteSubmitHandler}
      />
    </div>
  );
}

export default NewQuote;
