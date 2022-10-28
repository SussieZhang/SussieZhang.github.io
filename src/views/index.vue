<template>
  <div class="layout" v-if="data">
    <Layout>
      <Sider
        breakpoint="md"
        collapsible
        :collapsed-width="78"
        v-model="isCollapsed"
        :style="{
          position: 'fixed',
          height: '100%',
          background: '#2c2e2f',
          width: '280px',
          minWidth: '280px',
          maxwidth: '280px',
          left: 0,
        }"
      >
        <div class="logo-con">
          <img width="100%" src="logo.svg" key="max-logo" />
        </div>
        <Menu
          :style="{
            background: '#2c2e2f',
          }"
          active-name="1-2"
          theme="dark"
          width="auto"
          :class="menuitemClasses"
          @on-select="jumpAnchor"
        >
          <template v-for="(item, index) in data">
            <MenuItem
              :name="item.title"
              v-if="!item.children && childrenList.indexOf(index) < 0"
              :key="index"
            >
              <!-- <Icon :type="item.icon ? item.icon : 'ios-search'"></Icon> -->
              <span>{{ item.title }}</span>
            </MenuItem>
            <Submenu :name="item.title" v-if="item.children" :key="index">
              <template slot="title">
                <Icon :type="item.icon ? item.icon : 'ios-search'"></Icon>
                <span>{{ item.title }}</span>
              </template>
              <MenuItem
                :name="data[key].title"
                v-for="key in item.children"
                :key="key"
              >
                <span>{{ data[key].title }}</span>
              </MenuItem>
            </Submenu>
          </template>
        </Menu>
        <div slot="trigger"></div>
      </Sider>
      <Layout class="layout-right">
        <Header
          class="layout-header-bar"
          :style="{ position: 'fixed', width: '100%', zIndex: 99 }"
        >
          <div class="bar-p">时空道宇研发内网导航</div>
          <div style=" float: right;margin-right: 260px; zIndex: 999; display: inline-block;">
            <Input
              v-model="search"
              placeholder="请输入内容搜搜..."
              class="search"
              @on-enter="searchData"
            />
            <Button
              style="margin: 0 10px"
              icon="plus-round"
              @click="resetSearch"
              v-show="searchStatus"
              >重置</Button
            >
          </div>
        </Header>
        <Content :style="{ margin: '88px 20px 0', minHeight: '500px' }">
          <NavSub :data="data" :spinShow="spinShow"></NavSub>
        </Content>
        <Footer style="text-align: center" class="layout-footer-center"
          >研发中心导航 design by 研发中心
          <div>Copyright © 2022-2024 All Rights Reserved</div>
        </Footer>
      </Layout>
    </Layout>
    <BackTop></BackTop>
  </div>
</template>
<script>
import NavSub from "@/views/card/sub";
export default {
  data() {
    return {
      isCollapsed: false,
      search: "",
      searchStatus: false,
      data: null,
      childrenList: [],
      sourceData: "",
      serarchNum: 0,
      spinShow: false,
    };
  },
  computed: {
    menuitemClasses: function () {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    },
  },
  created: function () {
    this._getData();
  },
  methods: {
    _getData() {
      this.spinShow = true;
      this.$axios
        .get("/data/nav.json") // 获取nav数据
        .then((rep) => {
          this.data = rep.data;
          for (let key in this.data) {
            if (this.data[key].hasOwnProperty("children")) {
              this.childrenList = this.childrenList.concat(
                this.data[key].children
              );
            }
          }
          this.spinShow = false;
        })
        .catch((e) => {
          this.$Message.error({
            content: "获取数据失败!",
            duration: 120,
            closable: true,
          });
          window.console.log("错误信息：", e);
        });
    },
    jumpAnchor(name) {
      if (document.documentElement.clientWidth <= 768) {
        this.isCollapsed = true;
      }

      let offset = 66;
      let el = document.querySelector("#" + name);
      window.scroll({
        top: el.offsetTop - offset,
        left: 0,
        behavior: "smooth",
      });
    },
    searchData() {
      if (
        typeof this.search === "undefined" ||
        this.search === null ||
        this.search === ""
      ) {
        this.resetSearch();
        // this.$Message.error("输入内容呀！");
        return true;
      }
      if (!this.searchStatus) {
        this.sourceData = JSON.parse(JSON.stringify(this.data));
      } else {
        this.data = JSON.parse(JSON.stringify(this.sourceData));
      }
      this.searchStatus = true;
      this.serarchNum = 0;
      for (let d in this.data) {
        if (!this.data[d].hasOwnProperty("nav")) {
          continue;
        }
        for (let i = 0; i < this.data[d]["nav"].length; i++) {
          if (
            this.data[d]["nav"][i]["name"]
              .toLowerCase()
              .indexOf(this.search.toLowerCase()) === -1
          ) {
            if (
              this.data[d]["nav"][i]["link"]
                .toLowerCase()
                .indexOf(this.search.toLowerCase()) === -1
            ) {
              this.data[d]["nav"].splice(i--, 1);
            } else {
              this.serarchNum++;
            }
          } else {
            this.serarchNum++;
          }
        }
      }
      if (this.serarchNum === 0) {
        this.$Message.error("没找到哦，请重试!");
      } else {
        this.$Message.success("查找到了" + this.serarchNum + "个相近的.");
      }
    },
    resetSearch() {
      this.spinShow = true;
      this.searchStatus = false;
      this.search = "";
      this.serarchNum = 0;
      this.data = JSON.parse(JSON.stringify(this.sourceData));
      setTimeout(() => {
        this.spinShow = false;
      }, 1000);
    },
  },
  components: {
    NavSub,
  },
};
</script>

<style lang="less" scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  //   position: relative;
  height: 100%;
  border-radius: 4px;
  overflow: hidden;
}

.layout-header-bar {
  background: #fff;
  // box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}

.bar-p {
  color: gray;
  padding: 0px 10px 0px 0px;
  font-size: 18px;
  letter-spacing: 1px;
  display: inline-block;
}

.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 120px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}

.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}

.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}

.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}

.ivu-layout-sider {
  z-index: 100;
}

.logo-con img {
  width: 280px;
  padding: 19px 40px 19px 20px;
  border-bottom: 1px solid #313437;
}

.search {
  margin-left: 10px;
  width: 250px;

  @media screen {
    @media (max-width: 768px) {
      width: auto;
    }
  }
}

.search-text {
  margin: 0 10px;

  @media screen {
    @media (max-width: 768px) {
      margin: 0 3px;
    }
  }
}

.ivu-layout-header {
  @media screen {
    @media (max-width: 768px) {
      padding: 0 0 0 20px;
    }
  }
}

.layout-right {
  margin-left: 280px;

  @media screen {
    @media (max-width: 768px) {
      margin-left: 0px;
    }
  }
}
</style>
