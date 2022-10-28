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
    <div className='main'>
      <Header/>
      <Container>

        <ResponseTable data={data} withDate={true}/>
        {/*{data.map((item, index) => {*/}
        {/*  return (*/}
        {/*  // render basic html table, based on data*/}
        {/*  <table key={index}>*/}
        {/*    <tr>*/}
        {/*      <th>Url</th>*/}
        {/*      <th>title</th>*/}
        {/*      <th>Description</th>*/}
        {/*      <th>H1</th>*/}
        {/*      <th>H2</th>*/}
        {/*      <th>Links</th>*/}
        {/*      <th>Created at</th>*/}
        {/*      <th>Updated at</th>*/}
        {/*    </tr>*/}
        {/*    <tr>*/}
        {/*      <td>{item.url}</td>*/}
        {/*      <td>{item.title}</td>*/}
        {/*      <td>{item.description}</td>*/}
        {/*      <td>{item.h1}</td>*/}
        {/*      <td>{item.h2}</td>*/}
        {/*      <td><ul>{item.links.map(item => {*/}
        {/*        return (*/}
        {/*          <>*/}
        {/*            <li>{item}</li>*/}
        {/*          </>*/}
        {/*        )*/}
        {/*      })}</ul></td>*/}
        {/*      <td>{item.createdAt}</td>*/}
        {/*      <td>{item.updatedAt}</td>*/}
        {/*    </tr>*/}
        {/*  </table>*/}
        {/*  )*/}
        {/*})}*/}

      </Container>
    </div>
  );
};

export default HistoryComponent;
