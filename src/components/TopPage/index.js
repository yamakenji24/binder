import React from 'react';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import NaviBar from './NaviBar';
import Doc from './Doc';
import News from './News';

export default function TopPage() {  
  return (
    <div>
      <NaviBar />
      <h1>SLP のいろいろを管理できたらいいな</h1>
      <Tabs>
        <TabList>
          <Tab>News</Tab>
          <Tab>Document</Tab>
        </TabList>

        <TabPanel>
          <News />
        </TabPanel>
        <TabPanel>
          <Doc />
        </TabPanel>
      </Tabs>
    </div>
  )
}
