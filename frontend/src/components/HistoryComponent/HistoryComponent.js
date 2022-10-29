import React, {useEffect} from 'react';
import './History.scss';
import agent from "../../agent/agent";

import {Header} from "../Header/Header";
import {Container} from "@material-ui/core";
import {ResponseTable} from "../ResponseTable/ResponseTable";


const HistoryComponent = () => {
  const [data, setData] = React.useState([]);
  useEffect(() => {
    agent.Crawler.getHistory()
      .then(res => {
        setData(d => [...d, ...res])

      }).catch(e => {
      console.log(e);
    });
  }, []);

  return (
    <Container>
      <Header/>

      <div className="content">
        <ResponseTable data={data} withDate={true}/>
      </div>
    </Container>
  );
};

export default HistoryComponent;
