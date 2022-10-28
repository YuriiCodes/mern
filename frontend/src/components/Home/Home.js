import React, {useEffect} from 'react';
import './Home.scss';
import agent from "../../agent/agent";

import {InputUrlForm} from "../InputUrlForm/InputUrlForm";




const Home = () => {

  React.useEffect(() => {
    agent.Crawler.getHistory()
      .then(res => {

      }).catch(e => {

    });
  })

  return (
    <div className='main'>
      <h1>Start Here</h1>

      <InputUrlForm />

    </div>
  );
};

export default Home;
