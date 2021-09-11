import React, { useEffect } from "react";
import {
  useParams,
  Route,
  // useLocation,
  Link,
  // Switch,
  useRouteMatch,
} from "react-router-dom";
import Comments from "../components/comments/Comments";
//import { DUMMY_QUOTES } from "./AllQuotes";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import classes from "./QuoteDetail.module.css";
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

function QuoteDetail(props) {
  const {
    sendRequest,
    status,
    error,
    data: loadedQuote,
  } = useHttp(getSingleQuote, true);

  const params = useParams();
  const { quoteId } = params;
  // const location = useLocation();
  const match = useRouteMatch();

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === "pending") {
    return (
      <div className={`${classes.loading}`}>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className='centered focused'>{error}</p>;
  }

  if (!loadedQuote.text) {
    return <h1 className='centered focused'>No Quote Found</h1>;
  }
  return (
    <>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      {/* <Switch> */}
      <Route path={`${match.path}`} exact>
        <div className='centered'>
          <Link className='btn--flat' to={`/quotes/${params.quoteId}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`} exact>
        <Comments />
      </Route>
      {/* </Switch> */}
    </>
  );
}

export default QuoteDetail;
