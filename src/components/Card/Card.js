import React from "react";
import { Layout, Space, Typography, Rate } from "antd";

import PosterImage from "../PosterImage";
import Description from "../Description";

import "./Card.styles.css";

// const { Header, Sider, Content } = Layout;
const { Header, Footer, Sider, Content } = Layout;
const { Title, Text } = Typography;

export default class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  render() {
    const { id, original_title, release_date, overview, poster_path } = this.props;
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return (
      <>
        <Layout className="card">
          <Sider width={183}>
            <PosterImage poster_path={poster_path} />
          </Sider>
          <Layout>
            <Header>
              {/* <Space
            direction="vertical"
            style={{ display: "flex" }}
          > */}
              <Title level={2}>
                {id} {original_title}
              </Title>
              <Text type="secondary">{release_date}</Text>
              <Space
                direction="horizontal"
                className="fdf"
              >
                <Text keyboard>Action</Text>
                <Text keyboard>Drama</Text>
              </Space>
            </Header>
            <Content>
              <Description overview={overview} />
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
  }
}
