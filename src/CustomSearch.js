import React, { useEffect, useState } from "react";
import styled from "styled-components";

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
`;

const SearchBox = styled.input`
  width: 500px;
  padding: 12px 20px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 25px;
  outline: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);

  &:focus {
    border: 1px solid #4285f4;
    box-shadow: 0 2px 8px rgba(66, 133, 244, 0.5);
  }
`;

const SearchButton = styled.button`
  margin-top: 20px;
  background-color: #4285f4;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #357ae8;
  }

  &:active {
    background-color: #2a65d0;
  }
`;

const SuggestionsContainer = styled.div`
  width: 500px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-top: 5px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 10;
  max-height: 400px;
    z-index: 10;
    overflow-y: scroll;
`;

const SuggestionItem = styled.div`
  padding: 10px 15px;
  cursor: pointer;
  background-color: ${(props) => (props.isActive ? "#f1f1f1" : "white")};

  h3 {
    font-size: 14px;
    margin: 0;
    color: ${(props) => (props.isActive ? "#4285f4" : "#333")};
  }

  p {
    font-size: 12px;
    margin: 0;
    color: ${(props) => (props.isActive ? "#555" : "#777")};
  }
`;

export default function CustomSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [filteredData, setFilterData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  const filterData = () => {
    console.log('ran');
    if(query.length >1){
        const filtered = results.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilterData(filtered);
    }
    else{
        setFilterData([]);
    }
  
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setActiveIndex((prev) => (prev + 1) % filteredData.length);
    } else if (e.key === "ArrowUp") {
      setActiveIndex((prev) =>
        prev === 0 ? filteredData.length - 1 : prev - 1
      );
    } else if (e.key === "Enter" && activeIndex >= 0) {
      setQuery(filteredData[activeIndex].title);
      setFilterData([]);
    }
  };

  const handleInput = (e) => {
    setQuery(e.target.value);
    setActiveIndex(-1)
  };

  useEffect(() => {
    if(query){
        filterData();
    }
   
  }, [query]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = await fetch("https://fakestoreapi.com/products");
        let dataJson = await data.json();
        setResults(dataJson);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <SearchContainer>
      <SearchBox
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        value={query}
        type="text"
        placeholder="Search Google or type a URL"
      />
      {/* <SearchButton>Search</SearchButton> */}

      {filteredData.length > 0 && (
        <SuggestionsContainer>
          {filteredData.map((item,index) => (
             <SuggestionItem
             key={item.id}
             isActive={index === activeIndex}
             onMouseEnter={() => setActiveIndex(index)}
             onClick={() => setQuery(item.title)}
           >
             <h3>{item.title}</h3>
             <p>{item.description}</p>
           </SuggestionItem>
          ))}
        </SuggestionsContainer>
      )}
    </SearchContainer>
  );
}