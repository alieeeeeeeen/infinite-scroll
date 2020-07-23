import React, { useState } from 'react';
import { debounce } from 'throttle-debounce';
import './App.css';
import InfiniteScroller from './infiniteScroller';

function App() {
  const [data, setData] = useState([1,2,3,4,5,6,7,8,8,9])
  const fetchData = debounce(100, function() {
    setData([...data, ...[1]]);
  })

  const [inputState, setState] = useState({title: '', amount: ''})

  return (
    <div className="App">
      <input type="text" id="title" value={inputState.title} onChange={event => {
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
        }}/>
        <InfiniteScroller 
          hasMore={true}
          next={fetchData}>
          {
            data.map((v, k) => <div key={k} className="item">{v}</div>)
          }
        </InfiniteScroller>
    </div>
  );
}

export default App;
