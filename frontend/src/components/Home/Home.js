import React, {useEffect} from 'react';
import './Home.scss';
import agent from "../../agent/agent";

import {InputUrlForm} from "../InputUrlForm/InputUrlForm";
import {Header} from "../Header/Header";
import {Container} from "@material-ui/core";


const Home = () => {

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
