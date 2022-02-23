import React, { useState, useEffect } from "react";
import axios from "axios";

function Search() {
  const [term, setTerm] = useState("programming");
  const [results, setResults] = useState([]);

  console.log(results);
  // useEffect with clean up function
  //   useEffect(() => {
  //     console.log("I just rendered");

  //     return () => {
  //       console.log("clean up function");
  //     };
  //   }, [term]); // when am i going to rerender

  //   we can't make useEffect as an async function
  //     method 1
  useEffect(() => {
    const search = async () => {
      const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          list: "search",
          origin: "*",
          format: "json",
          srsearch: term,
        },
      });
      setResults(data.query.search);
    };
    const timeoutId = setTimeout(() => {
      if (term) {
        search();
      }
    }, 1000);
    if (term && !results.length) {
      search();
    } else {
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [term]);

  const renderedResults = results.map((result) => {
    return (
      <div className="item" key={result.pageid}>
        <div className="right floated content">
          <a
            href={`https://en.wikipedia.org?curid=${result.pageid}`}
            className="ui button"
          >
            go
          </a>
        </div>
        <div className="content">
          <div className="header">{result.title}</div>
          {result.snippet}
        </div>
      </div>
    );
  });

  // method 2
  //   useEffect(() => {
  //     (async () => {
  //       await axios.get("adasd");
  //     })();
  //   }, [term]);
  //   // method 3
  //   useEffect(() => {
  //     axios.get("url").then((response) => {
  //       console.log(response.data);
  //     });
  //   }, [term]);

  // empty [] render only initial render
  // nothing render initial render and after every re-render
  //[aChangingDatatype] run after initial render and if data has changed since last render
  //   //useEffect
  //   useEffect(() => {
  //     console.log("I only run ONCE");
  //   }, []);

  //   //useEffect
  //   useEffect(() => {
  //     console.log("I run on render and when data changes");
  //   }, [term, term2]);
  //useEffect
  //   useEffect(() => {
  //     console.log(
  //       "I run initially and after a rerender but I am almost never used",
  //     );
  //   });

  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>Enter Search Term </label>
          <input
            type="text"
            className="input"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="ui celled list"> {renderedResults}</div>
    </div>
  );
}

export default Search;
