import React, { useState, useRef } from 'react';
import { debounce } from 'throttle-debounce';
import './App.css';
import InfiniteScroller from './infiniteScroller';

function App() {
  const [data, setData] = useState([1,2,3,4,5,6,7,8,8,9])
  const fetchData = debounce(100, function() {
    setData([...data, 1]);
  })

  const [inputState, setState] = useState({title: '', amount: ''})

  const inputRef = useRef(null) ;

  return (
    <div className="App">
      {/* <input type="text" id="title" ref={inputRef} value={inputState.title} onChange={event => {
        const title = event.target.value;
        setState(prevState => {
          return {
            title,
            amount: prevState.amount
          }
      })}}/>
      <input type="text" id="amount" value={inputState.amount} onChange={event => {
        const amount = event.target.value;
        setState(prevState => ({
          amount,
          title: prevState.title
        }))
        }}/> */}


        <div style={{height: 200, overflow: 'auto'}} id="container">
          <InfiniteScroller 
            hasMore={true}
            scrollableTarget="container"
            loader={<h2>loading......</h2>}
            next={fetchData}
            dataLength={data.length}>
            {
              data.map((v, k) => <div key={k} className="item">{v}</div>)
            }
          </InfiniteScroller>
        </div>
 
    </div>
  );
}

export default App;
