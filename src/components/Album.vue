<template>
<div>
  <transition name="el-zoom-in-top">
    <div class="imgupload">
      <el-upload action="/service/public/upload/file" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-success="handleSuccess" :on-remove="handleRemove" :file-list="allImages" :before-upload="beforeUpload">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog v-model="dialogVisible" size="tiny">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </div>
  </transition>
  <el-dialog title="Picture information" v-model="showForm">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="Name">
        <el-input v-model="form.name" placeholder="set name"></el-input>
      </el-form-item>
      <el-form-item label="date">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="set date" v-model="form.date" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="describition">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Commit</el-button>
        <el-button>Cancel</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</div>
</template>

<script>
import uploadAPI from '../api/upload'
export default {
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      showForm:false,
      allImages: [],
      form: {
        name: '',
        date: '',
        desc: ''
      }
    }
  },
  methods: {
    beforeUpload(file) {
      this.showForm = true
      return false
      // if (this.allImages.filter(e => e.name == file.name).length > 0) {
      //   return false
      // }
    },
    handleSuccess(response, file, fileList) {
      response.url = '/service/public/upload/getAttachment?hash=' + response.file_hash
      this.allImages.push(response)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    onSubmit() {
      console.log('submit!');
    },
  },
  watch: {},
  created() {
    uploadAPI.getAllAttachment().then((result) => {
      result.map((e) => {
        e.url = '/service/public/upload/getAttachment?hash=' + e.hash
      })
      this.allImages = result
    }).catch((err) => {
      console.log(err)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
* {
  margin: 0;
  padding: 0;
}

.imgupload {}
</style>
