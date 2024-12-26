import logo from './logo.svg';
import './App.css';
import TodoApp from './TodoApp';
import SearchBar from './SearchBar';
import Clock from './Clock';
import PaginatedPage from './PaginatedPage';
import Form from './Form';
import { useEffect, useMemo, useState } from 'react';
import useThrottle from './hooks/UseThrottle';
import useCustomMemo from './hooks/UseCustomMemo';
import useCustomEffect from './hooks/useCustomEffect';
import CustomSearch from './CustomSearch';

function App() {

  const [count1,setCount1] = useState(0);
  const [count2,setCount2] = useState(100)
  

//   useEffect(()=>{
// console.log('mounted');
//   },[count1])

//   useCustomEffect(()=>{
// console.log('mounted 2');
//   },[count1])

  const incrementCount = ()=>{
    setCount1(count1 + 1);
  }

 
  // const decrementCount = ()=>{
  //   setCount2(count2 - 1);
  // }

// const squaredValue =()=>{
//   console.log('expensive calc');
//   return count1*count1;
// }

// const memoisedSquareValue = useCustomMemo(squaredValue,[count1])
  

  return (
    <div className="App">
      {/* <SearchBar></SearchBar> */}
      {/* <Clock/> */}
      {/* <TodoApp/> */}
      {/* <PaginatedPage/> */}
      {/* <Form/> */}
      {/* <h1>dimensions:- {throttleResize.innerHeight} X {throttleResize.innerWidth}</h1> */}
      {/* <h1>Count1 : {count1}</h1>
      <button onClick={incrementCount}>Increment</button> */}
      {/* <h1>Squared : {memoisedSquareValue}</h1>
      <br></br>
      <h1>count2: {count2}</h1>
      <button onClick={decrementCount}>Decrement</button> */}
      <CustomSearch></CustomSearch>
    </div>
  );
}

export default App;
