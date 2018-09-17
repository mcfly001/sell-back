<template>
  <div class="add-goods-wrapper">
    <div class="crumb-wrap">
      <span class="line"></span>
      <span class="text">添加商品</span>
    </div>
    <div class="form-wrapper">
      <Form :model="formItem" :label-width="100" class="form">
        <FormItem label="商品名称">
          <Input v-model="formItem.name"
                 placeholder="请输入商品名称">
          </Input>
        </FormItem>

        <FormItem label="商品价格">
          <Input v-model="formItem.price"
                 placeholder="请输入商品价格">
          </Input>
        </FormItem>

        <FormItem label="商品所属分类">
          <Select v-model="formItem.category">
            <Option v-for="(item, $index) in categorpList"
                    :key="$index"
                    :value="item.name">
              {{item.name}}
            </Option>
          </Select>
        </FormItem>

        <FormItem label="请输入商品简介">
          <Input v-model="formItem.breif"
                 type="textarea"
                 :autosize="{minRows: 2,maxRows: 5}"
                 placeholder="请输入商品简介">
          </Input>
        </FormItem>
      </Form>
      <Button type="error" class="text-right" @click="addGoods">提交</Button>
    </div>
  </div>
</template>

<script>
import { addGoods, getCategoryList } from '@/api/api'
export default {
  name: 'AddGoods',
  data() {
    return {
      categorpList: [],
      formItem: {
        name: '',
        price: '',
        category: '',
        breif: ''
      }
    }
  },
  created(){
    this.getCategoryList()
  },
  methods: {
    getCategoryList(){
      getCategoryList(1, 999).then(data => {
        if(data.data.length > 0){
          this.categorpList = data.data
        }
      })
    },
    addGoods(){
      let { name, price, category, breif } = this.formItem
      if(!name || !price || !category || !breif){
        this.$Message.error('请先输入内容')
      }
      else{
        addGoods(name, price, category, breif).then(data => {
          if(data.data === 1){
            this.$Message.success('添加成功')
          }
          else{
            this.$Message.error('添加失败')
          }
          this.formItem.name = ''
          this.formItem.price = ''
          this.formItem.category = ''
          this.formItem.breif = ''
        })
      }
    }
  }
}
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>

  .add-goods-wrapper{
    margin-left: 250px;

    .crumb-wrap{
      min-height: 60px;
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

    .form-wrapper{
      margin: 40px;
      padding: 30px;
      background: white;
      box-sizing: border-box;

      form{
        width: 300px;
      }
    }
  }
</style>

