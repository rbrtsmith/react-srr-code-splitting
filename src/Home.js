import React from 'react';
import axios from 'axios';
import { withJob } from 'react-jobs';

const Home = ({ jobResult: circuits }) => {
  return(
    <div>
      <h1>Home</h1>
      {circuits.map(({ circuitName, Location: { country } }) => (
        <div key={circuitName}>
          <div>{circuitName}</div>
          <div>{country}</div>
          <hr />
        </div>
      ))}
    </div>
  )
};

const asyncTimeout = fn => new Promise(resolve => setTimeout(() => resolve(fn), 600));

export default withJob({
  work: () => asyncTimeout(axios
    .get('http://ergast.com/api/f1/2018/circuits.json')
    .then(r => r.data.MRData.CircuitTable.Circuits)),
  LoadingComponent: () => <div>Loading...</div>
})(Home);
