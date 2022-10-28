import React, {useEffect} from 'react';
import './History.scss';
import agent from "../../agent/agent";

import {Header} from "../Header/Header";
import {Container} from "@material-ui/core";
import {createData, ResponseTable} from "../ResponseTable/ResponseTable";


const HistoryComponent = () => {
  const [data, setData] = React.useState([]);
  useEffect(() => {
    agent.Crawler.getHistory()
      .then(res => {
        console.log(res);
        console.log({data});
      }).catch(e => {
      console.log(e);
    });
  }, []);


  return (
    <div className='main'>
      <Header/>
      <Container>
        <ResponseTable withDate={true} rows={[]}/>
      </Container>
    </div>
  );
};

export default HistoryComponent;
