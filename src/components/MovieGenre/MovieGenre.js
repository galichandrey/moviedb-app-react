import React from "react";
import { Space, Typography } from "antd";

const { Text } = Typography;

const MovieGenre = () => (
  <Space direction="horizontal">
    <Text keyboard>Action</Text>
    <Text keyboard>Drama</Text>
  </Space>
);

export default MovieGenre;
