import React from 'react';
import { Route, BrowserRouter as Router, NavLink } from 'react-router-dom';
import { debounce } from 'throttle-debounce';
import './App.css';
import InfiniteScroller from './infiniteScroller';
import { useSelector, useDispatch } from 'react-redux'
import { add } from './store/reducer';
import Posts from './components/post';
import Form from './components/form';

interface arrState {
  arr: number[]
}

function App() {
  const arr = useSelector((state: arrState): number[] => state.arr);
  const disaptch = useDispatch();

  const fetchData = debounce(100, function() {
    disaptch(add(1))
  })

  return (
    <div className="App">
      <div id="test"></div>
        <div style={{height: 200, overflow: 'auto'}} id="container">
          <InfiniteScroller 
            hasMore={true}
            scrollableTarget="container"
            loader={<h2>loading......</h2>}
            next={fetchData}
            dataLength={arr.length}>
            {
              arr.map((v, k) => <div key={k} className="item">{v}</div>)
            }
          </InfiniteScroller>
        </div>
    
        <Router>
          <ul>
            <li>
              <NavLink to="/" exact activeClassName="active">Home</NavLink>
            </li>
            <li>
              <NavLink to={{
                pathname: "/admin",
                hash: "#submit"
              }}>hello</NavLink>
            </li>
          </ul>
          <Route path="/" exact component={Posts} />
          <Route path="/admin" exact component={Form} />
        </Router>
    </div>
  );
}




export default App;
