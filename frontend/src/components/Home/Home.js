import React from 'react';
import './Home.scss';


import {InputUrlForm} from "../InputUrlForm/InputUrlForm";
import {Header} from "../Header/Header";
import {Container} from "@material-ui/core";


const Home = () => {
  return (
    <div className='main'>
      <Header/>
      <div className="content">
        <Container>
          <InputUrlForm/>
        </Container>
      </div>
    </div>
  );
};

export default Home;
