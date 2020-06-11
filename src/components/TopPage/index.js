import React, { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import NaviBar from "./NaviBar";
import Doc from "./Document";
import News from "./News";
import * as Graphql from "../../graphql";

export default function TopPage() {
  const [getUser] = useLazyQuery(Graphql.USER, {
    variables: { username: "yamakenji24" },
    onCompleted({ user }) {
      console.log(user);
    },
    onError({ error }) {
      console.log("error", error);
    },
  });

  const checkButton = () => {
    getUser();
  };

  return (
    <div>
      <NaviBar />
      <h1>SLP のいろいろを管理できたらいいな</h1>
      <button type="button" onClick={checkButton}>
        Testing
      </button>
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
  );
}
