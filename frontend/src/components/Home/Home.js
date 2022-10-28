import React, {useEffect} from 'react';
import './Home.scss';
import agent from "../../agent/agent";

import {InputUrlForm} from "../InputUrlForm/InputUrlForm";
import {Header} from "../Header/Header";
import {Container} from "@material-ui/core";


const Home = () => {

  useEffect(() => {
    agent.Crawler.getHistory()
      .then(res => {
        console.log(res);
      }).catch(e => {
      console.log(e);
    });
  })

  return (

    <div className='main'>
      <Header/>
      <Container>

        <InputUrlForm/>
      </Container>
    </div>
  );
};

export default Home;
