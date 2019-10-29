<template>
  <section>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
      <FormItem label="产品标题" prop="title">
        <Input v-model="formValidate.title" placeholder="产品标题"></Input>
      </FormItem>
      <FormItem label="产品描述" prop="desc">
        <Input v-model="formValidate.desc" placeholder="产品描述"></Input>
      </FormItem>
      <!-- <FormItem label="产品标签" prop="labels">
        <Input v-model="formValidate.labels" placeholder="产品标签"></Input>
        
      </FormItem>-->
      <FormItem label="产品标签" prop="labels">
        <CheckboxGroup v-model="formValidate.labels">
          <Checkbox label="新品"></Checkbox>
          <Checkbox label="生日"></Checkbox>
          <Checkbox label="情侣"></Checkbox>
          <Checkbox label="聚会"></Checkbox>
          <Checkbox label="蛋糕"></Checkbox>
          <Checkbox label="面包"></Checkbox>
          <Checkbox label="人气"></Checkbox>
          <Checkbox label="儿童"></Checkbox>
          <Checkbox label="长辈"></Checkbox>
          <Checkbox label="低温"></Checkbox>
        </CheckboxGroup>
      </FormItem>
      <!-- <FormItem label="产品每磅单价" prop="price">
        <Input v-model="formValidate.price" placeholder="产品每磅单价"></Input>
      </FormItem>-->
      <FormItem label="产品单价" prop="price">
        <Input v-model="formValidate.price" placeholder="产品单价"></Input>
      </FormItem>
      <!-- <FormItem label="产品规格" prop="scales">
        <Input v-model="formValidate.scales" placeholder="产品规格"></Input>
      </FormItem>-->
      <FormItem label="产品规格" prop="scales">
        <CheckboxGroup v-model="formValidate.scales">
          <Checkbox label="1">1.0磅</Checkbox>
          <Checkbox label="2">2.0磅</Checkbox>
          <Checkbox label="3">3.0磅</Checkbox>
          <Checkbox label="4">4.0磅</Checkbox>
          <Checkbox label="5">5.0磅</Checkbox>
          <Checkbox label="更多">更多</Checkbox>
        </CheckboxGroup>
      </FormItem>
      <FormItem label="产品封面" prop="cover">
        <Input v-model="formValidate.cover" placeholder="产品封面"></Input>
      </FormItem>
      <FormItem label="产品分类" v-if="categoryList.length > 0">
        <Select v-model="formValidate.category_id">
          <Option v-for="(item, index) in categoryList" :value="item.id" :key="index">{{item.name}}</Option>
        </Select>
      </FormItem>
      <!-- <FormItem label="商品标题" prop="title">
         <Input v-model="formValidate.title" placeholder="商品标题"></Input>
       </FormItem>
       <FormItem label="商品作者" prop="author">
         <Input v-model="formValidate.author" placeholder="商品作者"></Input>
       </FormItem>
       <FormItem label="商品分类" v-if="categoryList.length > 0">
         <Select v-model="formValidate.category_id">
           <Option v-for="(item, index) in categoryList" :value="item.id" :key="index">{{item.name}}</Option>
         </Select>
       </FormItem>
       <FormItem label="商品封面" prop="cover">
         <div class="cover">
           <div class="upload">
             <Upload
               multiple
               type="drag"
               action="http://up-z2.qiniu.com"
               :show-upload-list="false"
               :on-success="uploadSuccess"
               :on-error="uploadError"
               :data="{token}">
               <div style="padding: 20px 0">
                 <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                 <p>点击或者拖拽上传</p>
               </div>
             </Upload>
           </div>
           <div class="article-cover">
             <img :src="formValidate.cover" alt="cover">
           </div>
         </div>
       </FormItem>
       <FormItem label="商品内容" prop="content">
         <mavon-editor
           v-model="formValidate.content"
           :ishljs="true"
           ref=md>
         </mavon-editor>

      </FormItem>-->
      <FormItem>
        <Button @click="handleReset('formValidate')">重置</Button>
        <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 8px">提交</Button>
      </FormItem>
    </Form>
  </section>
</template>
<script>
import { mapActions } from "vuex";
import getUploadToken from "../../libs/upload-token";

export default {
  data() {
    return {
      token: "",
      id: this.$route.params.id,
      detail: null,
      categoryList: [],
      formValidate: {
        title: "",
        desc: "",
        labels: [],
        price: "",
        scales: [],
        cover: "",
        category_id: ""
      },
      ruleValidate: {
        title: [
          { required: true, message: "产品标题不能为空", trigger: "blur" }
        ],
        price: [
          { required: true, message: "请输入正确的价格", trigger: "blur" }
        ],
        labels: [
          { required: true, type: "array",  min: 1, message: "产品标签不能为空",  trigger: "change"},
          { type: 'array', max: 3, message: '最多只可以选择三个', trigger: 'change' }        
        ],
        scales: [
          {
            required: true,
            type: "array",
            min: 1,
            message: "产品规格不能为空",
            trigger: "change"
          }
        ]
      }
    };
  },
  created() {
    this._getProduct();
    this._getCategoryList();
    this._getUploadToken();
  },
  methods: {
    ...mapActions({
      getProduct: "product/getProduct",
      updateProduct: "product/updateProduct",
      getCategoryList: "category/getCategoryList"
    }),
    // 上传图片成功
    uploadSuccess(response) {
      const url = `http://cdn.boblog.com/${response.key}`;
      this.formValidate.cover = url;
      this.$Message.success("上传成功!");
    },
    // 上传图片失败
    uploadError(response) {
      this.$Message.success("上传失败!");
      console.log(response);
    },
    // 获取上传token
    async _getUploadToken() {
      try {
        const res = await getUploadToken();
        this.token = res.token;
      } catch (e) {
        console.log(e);
      }
    },
    // 获取商品列表
    async _getProduct() {
      try {
        const res = await this.getProduct({
          id: this.id
        });
        const product = res.data.data;

        this.formValidate.title = product.title;
        this.formValidate.desc = product.desc;
        this.formValidate.labels = product.labels.split(",");

        this.formValidate.price = product.price.toString();
        this.formValidate.scales = product.scales.split(",");
        this.formValidate.cover = product.cover;
        this.formValidate.category_id = parseInt(product.category_id);
      } catch (e) {}
    },
    // 获取分类列表
    async _getCategoryList() {
      const res = await this.getCategoryList();
      this.categoryList = res.data.data;
    },
    // 更新
    async _updateProduct() {
      this.formValidate.id = this.id;
      this.formValidate.price = parseFloat(this.formValidate.price);
      this.formValidate.labels = this.formValidate.labels.toString();
      this.formValidate.scales = this.formValidate.scales.toString();
      try {
        await this.updateProduct(this.formValidate);
        this.$Message.success("更新成功!");
        this.$router.push("/product");
      } catch (e) {}
    },
    // 提交
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this._updateProduct();
        } else {
          this.$Message.error("请完成表单!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  }
};
</script>
<style scoped>
.article-cover {
  width: 120px;
}

.article-cover img {
  width: 100%;
}

.cover {
  display: flex;
}

.cover .upload {
  width: 280px;
  margin-right: 32px;
}
</style>
