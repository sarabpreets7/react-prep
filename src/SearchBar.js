// import React, { useState ,useEffect} from "react";



// export default function SearchBar(){
//     const [query,setQuery] = useState('');
//     const [results,setResults] = useState([]);
//     const [debounceQuery, setDebounceQuery] = useState(query);
//     const [loading,setLoading] = useState(false);
//     const [filteredResults,setFilterResults] = useState([]);



//     useEffect(()=>{

//         const timer = setTimeout(()=>{
//             setDebounceQuery(query);
//         },500)

//         return()=>{
//             clearTimeout(timer)
//         }
//     },[query])

//     useEffect(()=>{

//         if(debounceQuery){
//         fetchResults(debounceQuery)
//         }
//         else{
//             setResults([])
//         }
//     },[debounceQuery])


//    async function fetchResults(searchQuery){

//     setLoading(true);

//     try{
//         let resp = await fetch(`https://api.github.com/search/users?q=${searchQuery}`);
//         resp = await resp.json();
//         console.log(resp,'resp');
//         setResults(resp.items || []);
//         console.log(results,'results');
//     }
//     catch(error){
//         console.error("Error fetching data:", error);
//         setResults([]); // Clear results on error
//     }
//     finally{
//         setLoading(false)
//     }

//     }
//    function handleInputChange(e){
//         setQuery(e.target.value)
//     }


//     return(
//         <div>
//             <input type="text"
//             onChange={handleInputChange}
//             value={query}/>

//             {loading && <p>...loading</p>}

//             {results.map((item,idx)=>{
//                 return(
//                     <li key={idx}>
//                          <a href={item.html_url} target="_blank" rel="noopener noreferrer">
//                             {item.login}
//                          </a>
//                     </li>
//                 )
//             })}
//         </div>
//     )
// }
import React, { useState, useEffect } from "react";
import "./SearchBar.css"; // Import the CSS file for styling

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [debounceQuery, setDebounceQuery] = useState(query);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceQuery(query);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [query]);

  useEffect(() => {
    if (debounceQuery) {
      fetchResults(debounceQuery);
    } else {
      setResults([]);
    }
  }, [debounceQuery]);

  async function fetchResults(searchQuery) {
    setLoading(true);

    try {
      let resp = await fetch(`https://api.github.com/search/users?q=${searchQuery}`);
      resp = await resp.json();
      setResults(resp.items || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      setResults([]); // Clear results on error
    } finally {
      setLoading(false);
    }
  }

  function handleInputChange(e) {
    setQuery(e.target.value);
  }

  return (
    <div className="search-bar-container">
      <h1>GitHub User Search</h1>
      <input
        type="text"
        placeholder="Search for GitHub users..."
        onChange={handleInputChange}
        value={query}
        className="search-input"
      />

      {loading && <p className="loading-text">Loading...</p>}

      <ul className="results-list">
        {results.map((item, idx) => (
          <li key={idx} className="result-item">
            <a href={item.html_url} target="_blank" rel="noopener noreferrer" className="result-link">
              {item.login}
            </a>
          </li>
        ))}
      </ul>

      {!loading && results.length === 0 && query && <p className="no-results">No results found.</p>}
    </div>
  );
}