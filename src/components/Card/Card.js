import React from "react";
import { Layout, Space, Typography, Rate } from "antd";

import PosterImage from "../PosterImage";
import Description from "../Description";

import "./Card.styles.css";

// const { Header, Sider, Content } = Layout;
const { Header, Footer, Sider, Content } = Layout;
const { Title, Text } = Typography;

const Card = () => (
  <>
    <Layout className="card">
      <Sider width={183}>
        <PosterImage />
      </Sider>
      <Layout>
        <Header>
          {/* <Space
            direction="vertical"
            style={{ display: "flex" }}
          > */}
          <Title level={2}>The way back</Title>
          <Text type="secondary">March 5, 2020</Text>
          <Space
            direction="horizontal"
            className="fdf"
          >
            <Text keyboard>Action</Text>
            <Text keyboard>Drama</Text>
          </Space>
        </Header>
        <Content>
          <Description />
        </Content>
        <Footer>
          <Rate
            allowHalf
            count={10}
            defaultValue={5}
          />
        </Footer>
      </Layout>
    </Layout>
  </>
);

export default Card;
