<template>
  <div class="body">
    <Header title="所在城市"></Header>
    <div ref="aaa" class="select-area">
      <cube-index-list
        :data="cityData"
        @select="selectItem"
        @title-click="clickTitle"></cube-index-list>
    </div>
  </div>
</template>

<script>
  const cityData = [
    {
      "name": "★Hot City",
      "items": [
        {
          "name": "BEIJING",
          "value": 1
        },
        {
          "name": "SHANGHAI",
          "value": 2
        }
      ]
    },
    {
      "name": "B",
      "items": [
        {
          "name": "ANSHAN",
          "value": 3
        },
        {
          "name": "ANQING",
          "value": 4
        }
      ]
    },
    {
      "name": "C",
      "items": [
        {
          "name": "ANSHAN",
          "value": 3
        },
        {
          "name": "ANQING",
          "value": 4
        }
      ]
    },
    {
      "name": "D",
      "items": [
        {
          "name": "ANSHAN",
          "value": 3
        },
        {
          "name": "ANQING",
          "value": 4
        }
      ]
    },
    {
      "name": "E",
      "items": [
        {
          "name": "ANSHAN",
          "value": 3
        },
        {
          "name": "ANQING",
          "value": 4
        }
      ]
    },
    {
      "name": "F",
      "items": [
        {
          "name": "ANSHAN",
          "value": 3
        },
        {
          "name": "ANQING",
          "value": 4
        }
      ]
    },
    {
      "name": "G",
      "items": [
        {
          "name": "ANSHAN",
          "value": 3
        },
        {
          "name": "ANQING",
          "value": 4
        }
      ]
    },
    {
      "name": "H",
      "items": [
        {
          "name": "ANSHAN",
          "value": 3
        },
        {
          "name": "ANQING",
          "value": 4
        }
      ]
    },
    {
      "name": "I",
      "items": [
        {
          "name": "ANSHAN",
          "value": 3
        },
        {
          "name": "ANQING",
          "value": 4
        }
      ]
    },
    {
      "name": "J",
      "items": [
        {
          "name": "ANSHAN",
          "value": 3
        },
        {
          "name": "ANQING",
          "value": 4
        }
      ]
    },
  ]
  import Header from "../components/common/header"
  export default {
    components:{
      Header,
    },
    data(){
      return{
        cityData: cityData
      }
    },
    methods:{
      selectItem(item) {
        console.log(item.name)
      },
      clickTitle(title) {
        console.log(title)
      }
    },
    created(){
      this.$store.dispatch('footerStatus/hideFooter');
    }
  }
</script>

<style lang="less">
  .select-area{
    position: absolute;
    top: 128px;
    bottom: 0;
    width: 100%;
    .cube-index-list{
      .cube-index-list-anchor{
        padding: 32px 32px 20px;
        font-size: 28px;
      }
      .cube-index-list-item-def{
        height: 100px;
        line-height: 100px;
        padding: 0 32px;
        font-size: 28px;
      }
      .cube-index-list-nav{
        li{
          padding: 12px 32px 0;
          font-size: 24px;
        }
      }
    }
  }
</style>
