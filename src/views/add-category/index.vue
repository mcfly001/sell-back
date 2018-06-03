<template>
  <div>
    <div class="crumb-wrap">
      <span class="line"></span>
      <span class="text">添加分类</span>
    </div>

    <div class="form-wrapper">
      <Form :model="formItem" :label-width="80">
        <FormItem label="分类名称">
          <Input v-model="formItem.category" placeholder="请输入分类名称"></Input>
        </FormItem>
      </Form>

      <Button type="error" class="text-right" @click="submit">提交</Button>
    </div>
  </div>
</template>

<script>
import { addCategory } from '@/api/api'
export default {
  name: '',
  data() {
    return {
      formItem: {
        category: ''
      }
    }
  },
  methods: {
    submit(){
      addCategory(this.formItem.category).then(data => {
        if(data.data === 1){
          this.$Message.success('添加成功')
        }
        else{
          this.$Message.error('添加失败')
        }
        this.formItem.category = ''
      })
    }
  },
  components: {}
}
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>

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

  .form-wrapper {
    margin: 40px;
    padding: 30px;
    background: white;
    box-sizing: border-box;

    form{
      margin-top: 30px;
      width: 300px;
    }
  }
</style>

