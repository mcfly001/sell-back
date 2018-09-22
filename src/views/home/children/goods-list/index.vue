<template>

  <div class="shop-list-wrapper">
    <div class="crumb-wrap">
      <span class="line"></span>
      <span class="text">商品列表</span>
    </div>

    <div class="main">
      <div class="filter">
        <Input v-model="page.searchText"
               icon="search"
               class="search-by-goodsname"
               @on-click="getGoodsListBySeacher"
               placeholder="输入要查询的商品名称">
        </Input>
      </div>

      <Table stripe
             border
             class="table-list"
             :columns="columns"
             :data="data">
      </Table>

      <Page class="page"
            @on-change="changePageSize"
            :total="page.total"
            show-total>
      </Page>
    </div>
  </div>
</template>

<script>
import { getGoodsList, removeGoods } from '@/api/api'
export default {
  name: 'GoodsList',
  data() {
    return {
      columns: [
        {
          title: '序号',
          key: '_id'
        },
        {
          title: '名称',
          key: 'name'
        },
        {
          title: '价格',
          key: 'price'
        },
        {
          title: '类别',
          key: 'category'
        },
        {
          title: '操作',
          key: 'delete',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.remove(params.index)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      data: [],
      page: {
        total: 100,
        pageSize: 1,
        pageNum: 10,
        searchText: ''
      }
    }
  },
  created(){
    this.getGoodsList()
  },
  methods: {
    getGoodsList(){
      let { pageSize, pageNum, searchText } = this.page
      getGoodsList(pageSize, pageNum, searchText).then(data => {
        if(data.data.length > 0){
          this.data = data.data
          this.page.total = data.total
        }
        else{
          this.data = []
          this.page.total = 0
        }
      }).catch(e => {
        this.data = []
        this.page.total = 0
      })
    },
    changePageSize(pageSize){
      this.page.pageSize = pageSize
      this.getGoodsList()
    },
    getGoodsListBySeacher(){
      this.page.pageSize = 1
      this.page.pageNum = 10
      this.getGoodsList()
    },
    remove(index){
      let _id = this.data[index]._id
      removeGoods(_id).then(data => {
        if(data.data === 1){
          this.page.pageSize = 1
          this.page.pageNum = 10
          this.page.searchText = ''
          this.getGoodsList()
          this.$Message.success('删除成功')
        }
        else{
          this.$Message.error('删除失败')
        }
      })
    }
  }
}
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>

  .shop-list-wrapper{
    height: 100%;
    margin-left: 250px;

    .crumb-wrap{
      min-height: 60px;
      z-index: 10;
      background: #FFFFFF;
      box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.06);
      padding: 20px 30px 20px 0;
      text-align: left;
      color: #151515;
      padding-left: 30px;
      font-size: 20px;
      line-height: 25px;

      .line{
        width: 4px;
        height: 25px;
        background: red;
        display: inline-block;
      }

      .text{
        vertical-align: 5px;
        padding-left: 10px;
      }
    }

    .main{
      flex: 1;
      overflow: auto;
      padding-bottom: 50px;

      .filter{
        margin-top: 20px;
        text-align: left;
        padding-left: 50px;

        .search-by-goodsname{
          width: 200px;
        }
      }

      .table-list{
        margin: 20px 50px 0;
      }

      .page{
        text-align: right;
        margin-right: 50px;
        margin-top: 30px;
      }
    }
  }
</style>

