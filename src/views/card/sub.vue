<template>
  <div>
    <div :id="item.title" v-for="(item, index) in data" :key="index">
      <div class="nodeCard" v-if="item.nav">
        <div>
          <Icon
            type="ios-bookmarks-outline"
            size="26"
            style="margin-right: 7px; margin-top: -5px"
          ></Icon>
          <div
            style="
              text-align: center;
              margin: 0px 5px;
              display: inline-block;
              font-size: 18px;
            "
          >
            {{ item.title }}
          </div>
          <div style="float: right; margin-right: 10px; font-size: 12px">
            共计：{{ item.nav.length }} 个项目
          </div>
        </div>
        <Nav
          :navData="item.nav"
          :subTitle="item.title"
          :spinShow="spinShow"
        ></Nav>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "@/views/card/nav";
export default {
  props: {
    data: {
      default: {},
    },
    spinShow: {
      default: false,
    },
  },
  components: {
    Nav,
  },
};
</script>

<style scoped>
.anchor a {
  opacity: 0;
  font-size: 24px;
  transition: opacity 0.2s ease-in-out;
  margin-left: 5px;
  position: relative;
  top: 2px;
}

.nodeCard {
  margin: 20px 20px 0 20px;
}

.text-gray {
  color: #555;
}

.text-gray:hover {
  color: #3b3b3b;
}
</style>
