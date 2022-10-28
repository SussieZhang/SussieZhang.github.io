<template>
  <Row :gutter="16">
    <Col class="nav-col" span="6" v-for="(item, index) in navData" :key="index">
    <div class="nav-li" @click="jumpLink(item)">
      <Tooltip placement="top" :content="item.link">
        <div class="xe-comment-entry">
          <a class="xe-user-img">
            <img class="icon" v-lazy="item.icon ? item.icon :'./static/images/tbox.ico'" alt="" />
          </a>
          <div class="xe-comment">
            <strong>{{ item.name }}</strong>
            <p>{{ item.desc }}</p>
          </div>
        </div>
      </Tooltip>
    </div>
    </Col>
    <Spin size="large" fix v-if="spinShow"></Spin>
  </Row>
</template>

<script>
import Clipboard from "clipboard";
import VueMarkdown from "vue-markdown";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
let highlightCode = () => {
  let preEl = document.querySelectorAll("pre");
  let codeEl = document.querySelectorAll("code");
  preEl.forEach((el) => {
    hljs.highlightBlock(el);
  });
  codeEl.forEach((el) => {
    hljs.highlightBlock(el);
  });
};

export default {
  data() {
    return {
      docSpinShow: false,
      docData: "",
    };
  },
  props: {
    navData: {
      default: [],
    },
    subTitle: {
      default: "",
    },
    del: {
      default: false,
    },
    spinShow: {
      default: false,
    },
  },
  methods: {
    jumpLink(item) {
      item.title = this.subTitle ? this.subTitle : item.title;
      window.open(item.link);
    },
    copyLink() {
      var clipboard = new Clipboard(".btn");
      clipboard.on("success", (e) => {
        // 成功提示
        this.$Message.success("复制成功");
        // 释放内存
        clipboard.destroy();
        window.console.log(e);
      });
      clipboard.on("error", (e) => {
        // 不支持复制
        this.$Message.error("该浏览器不支持自动复制");
        // 释放内存
        clipboard.destroy();
        window.console.log(e);
      });
    },
  },
  components: {
    VueMarkdown,
  },
  mounted() {
    highlightCode();
  },
  updated() {
    highlightCode();
  },
};
</script>

<style lang="less" scoped>
@min-width: 768px;

span {
  word-break: break-all;
  word-wrap: break-word;
}

.top {
  height: 36px;
}

.icon {
  width: 40px;
  height: 40px;
  vertical-align: middle;
  border-radius: 50%;
  pointer-events: none;
}

.nav-col {
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
}

.nav-col:hover {
  transform: translateY(-6px);
  -webkit-transform: translateY(-6px);
  -moz-transform: translateY(-6px);
  box-shadow: 0 26px 40px -24px rgba(0, 36, 100, 0.3);
  -webkit-box-shadow: 0 26px 40px -24px rgba(0, 36, 100, 0.3);
  -moz-box-shadow: 0 26px 40px -24px rgba(0, 36, 100, 0.3);
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
}

.nav-li {
  height: 100px;
  cursor: pointer;
  border-radius: 4px;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #e4ecf3;
  margin: 20px 0 0 0;
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
  padding: 15px 10px;

  @media screen {
    @media (max-width: @min-width) {
      width: 100%;
    }
  }
}

.xe-comment-entry {
  display: table;
  width: 100%;
}

.xe-comment-entry img {
  float: left;
  display: block;
}

.xe-user-img {
  display: table-cell;
  vertical-align: top;
  // padding-top: 10px;
  // padding-bottom: 10px;
}

.xe-comment {
  // display: table-cell;
  
  margin-left: 15px;
  margin-right: 15px;

  strong {
    font-size: 16px;
  }

  p {
    font-size: 14px;
    color: #979898;
    margin-bottom: 0px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}

.desc {
  padding-top: 5px;
  border-top: 1px solid #eee;
  margin-top: 8px;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
}

.used {
  display: block;
  font-size: 6px;
  width: 120px;
  color: gray;
}

.usage-content {
  font-size: 14px;
  width: 100%;
  padding: 0px 80px 20px 80px;

  @media screen {
    @media (max-width: @min-width) {
      padding: 0 10px 10px 10px;
    }
  }
}

.usage-content /deep/ ul {
  padding-left: 25px;
}

.usage-content /deep/ ol {
  padding-left: 25px;
}

.usage-content /deep/ h2 {
  padding-top: 90px;
  margin-top: -90px;
}

.usage-content /deep/ blockquote {
  margin-top: 5px;
  padding: 0 1em;
  color: #6a737d;
  border-left: 0.25em solid #dfe2e5;
}

.toc {
  width: 200px;
  position: fixed;

  @media screen {
    @media (max-width: @min-width) {
      position: relative;
      margin-left: 0px;
    }
  }
}

.toc /deep/ a {
  word-break: break-all;
  word-wrap: break-word;
}

.markdown {
  margin-left: 210px;

  @media screen {
    @media (max-width: @min-width) {
      position: relative;
      margin-left: 0px;
    }
  }
}
</style>
