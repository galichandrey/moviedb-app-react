import React from "react";
import { Layout, Space, Spin, Typography, Rate } from "antd";
import { parseISO, format } from "date-fns";

import PosterImage from "../PosterImage";
import Description from "../Description";

import "./Card.styles.css";

const { Header, Footer, Sider, Content } = Layout;
const { Title, Text } = Typography;

export default class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      loading: true,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState(() => {
        return {
          loading: false,
        };
      });
    }, 150);
  }

  dateConvert(release_date) {
    if (release_date) {
      try {
        return format(parseISO(release_date), "MMMM dd, yyyy");
      } catch (err) {
        this.setState({ hasError: true });
        throw new Error(`Incorrent date format "${err}"`);
      }
    }
    return null;
  }

  render() {
    const { id, original_title, release_date, overview, poster_path } = this.props;
    const { loading } = this.state;

    const posterPreloader = (
      <div className="card-preloader">
        <Space direction="vertical">
          <Space direction="horizontal">
            <Spin tip="Loading" />
          </Space>
        </Space>
      </div>
    );

    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return (
      <>
        <Layout className="card">
          <Sider
            style={{ display: "flex", juctifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}
            width={183}
          >
            {loading ? posterPreloader : <PosterImage poster_path={poster_path} />}
          </Sider>
          <Layout>
            <Header>
              <Title level={2}>
                {id} {original_title}
              </Title>
              <Text type="secondary">{release_date ? this.dateConvert(release_date) : null}</Text>
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
