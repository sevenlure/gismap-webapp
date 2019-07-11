import React from "react";
import { Input, Icon, Button, Layout } from "antd";
import styled from "styled-components";
// import Background from '../../static/images/background.svg'

const { Footer } = Layout;

const CardCenter = styled.div`
  left: 50%;
  top: 35%;
  position: fixed;
  transform: translate(-50%, -50%);
`;

const Container = styled.div`
  width: 368px;
`;

const Center = styled.div`
  display: flex;
  height: 44px;
  line-height: 44;
  align-items: center;
  justify-content: center;
`;

export default class Index extends React.Component {
  static getInitialProps({ reduxStore, req }) {
    const isServer = !!req;
    return {};
  }

  render() {
    return (
      <Layout
        style={{
          width: "100%",
          height: "100vh",
          backgroundImage: `url("/static/images/background.svg")`,
          backgroundRepeat: "no-repeat"
        }}
      >
        <CardCenter>
          <Center style={{ marginBottom: 8 }}>
            <img
              style={{ width: 44, height: 44, marginRight: 16 }}
              src="/static/images/logo.png"
            />
            <span
              style={{
                fontWeight: 600,
                fontSize: 33,
                color: "rgba(0,0,0,.85)"
              }}
            >
              Hồ Chí Minh
            </span>
          </Center>
          <Center style={{
            color: "rgba(0,0,0,.45)",
            fontSize: 14
          }}>Waste Source Management System - Hồ Chí Minh</Center>
          <Container>
            <Input
              style={{ marginTop: 12, marginBottom: 24 }}
              size="large"
              placeholder="Username"
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            />
            <Input.Password
              size="large"
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              style={{ marginBottom: 48 }}
              placeholder="input password"
            />
            <Button type="primary" block>
              Login
            </Button>
          </Container>

          <Footer style={{ textAlign: "center" }}>
            App ©2019 Created by VietAn Software
          </Footer>
        </CardCenter>
      </Layout>
    );
  }
}
