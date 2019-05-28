<template>
  <div id="app">
    <Layout>
        <Header>
          <Menu mode="horizontal" theme="dark" active-name="1">
              <div @click="navHome()">
                <img class="layout-logo" src="./assets/logo.png" alt="">
              </div>
              <div class="layout-nav-1">
                  <MenuItem name="1">
                      <Icon type="ios-navigate"></Icon>
                      Item 1
                  </MenuItem>
                  <MenuItem name="2">
                      <Icon type="ios-keypad"></Icon>
                      <router-link tag="span" to="/forum">讨论区</router-link>
                  </MenuItem>
              </div>
              <div class="layout-nav-2">
                  <MenuItem name="3">
                      <TopSigninMenu/>
                  </MenuItem>
              </div>
          </Menu>
        </Header>
        <Content style="background-color: white;">
          <router-view></router-view>
        </Content>
        <Footer class="layout-footer-center">2019-2020 &copy; </Footer>
    </Layout>
  </div>
</template>

<script>
import TopSigninMenu from "./components/TopSigninMenu"

export default {
  name: 'app',
  components: {
    TopSigninMenu
  },
  methods: {
    navHome() {
      location.href = '/'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    width: 40px;
    height: 40px;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 10px;
    left: 20px;
    cursor: pointer;
}
.layout-nav-1{
    width: 420px;
    margin: 0 auto;
    margin-left: 100px;
}
.layout-nav-2{
  float: right;
}
.layout-footer-center{
    text-align: center;
}
</style>
