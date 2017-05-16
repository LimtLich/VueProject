<template>
<div>
  <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item index="/">
      <i class="el-icon-arrow-left"></i>Home</el-menu-item>
    <el-menu-item index="upload">
      <i class="el-icon-upload"></i>Picture-Upload</el-menu-item>
  </el-menu>
  <el-row :gutter="20" class="gutter">
    <el-col :span="4" v-for="(item,index) in allImages" :key="item.name" class="gutter_child">
      <img class='gutter_picture' :src="item.url" />
      <el-button @click="editPic(index)">
        <i class="el-icon-document"></i>edit</el-button>
      <el-button @click="deletePic(index)">
        <i class="el-icon-delete"></i>delete</el-button>
    </el-col>
  </el-row>
  <transition name="el-zoom-in-top">
    <div class="imgupload">
      <el-dialog v-model="dialogVisible" size="tiny">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
      <el-dialog v-model="showUpload" size="tiny">
        <el-upload class="" drag action="/service/public/upload/file" :file-list="fileList" :on-preview="handlePictureCardPreview" :on-success="handleSuccess" :on-remove="handleRemove" :before-upload="beforeUpload" multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-dialog>
    </div>
  </transition>
  <el-dialog title="Picture information" v-model="showForm">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="Name">
        <el-input v-model="form.pic_name" placeholder="set name"></el-input>
      </el-form-item>
      <el-form-item label="date">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="set date" v-model="form.date" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="describition">
        <el-input type="textarea" v-model="form.describe"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Commit</el-button>
        <el-button @click="showForm = !showForm">Cancel</el-button>
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
      showForm: false,
      showUpload: false,
      uploadSubmit: false,
      allImages: [],
      fileList:[],
      form: {
        hash: null,
        pic_name: null,
        date: null,
        describe: null,
      }
    }
  },
  methods: {
    init() {
      this.form = {
        hash: null,
        pic_name: null,
        date: null,
        describe: null,
      }
      uploadAPI.getAllAttachment().then((result) => {
        result.map((e) => {
          e.url = '/service/public/upload/getAttachment?hash=' + e.hash
        })
        this.allImages = result
      }).catch((err) => {
        console.log(err)
      })
    },
    beforeUpload(file) {
      if (this.allImages.filter(e => e.name == file.name).length > 0) {
        console.log(this.allImages)
        return false
      } else {
        this.init()
        this.showForm = true
      }
    },
    handleSuccess(response, file, fileList) {
      this.form.hash = response.file_hash
      response.url = '/service/public/upload/getAttachment?hash=' + response.file_hash;
      this.allImages.push(response);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleSelect(key) {
      if (key == 'upload') {
        this.showUpload = true;
      } else {
        this.$router.push(key);
      }
    },
    editPic(index) {
      this.form = this.allImages[index]
      this.showForm = true
      console.log(this.allImages[index])
    },
    deletePic(index) {
      this.$confirm('Sure to delete this picture?', 'Confirmation', {
        confirmButtonText: 'Sure',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        var hash = this.allImages[index].hash
        uploadAPI.deletePic({
          hash: hash
        }).then(() => {
          this.fileList = [];
          this.init()
        }).catch((err) => {
          this.$alert(err, 'Erro', {
            type: 'warning'
          })
        })
      }).catch(() => {})
      console.log(index)
    },
    onSubmit() {
      console.log(this.form.hash)
      if (this.form.hash && this.form.pic_name && this.form.date && this.form.describe) {
        uploadAPI.setPictureAttribute({
          form: this.form
        }).then((result) => {
          this.init()
          this.showForm = false
          console.log(result)
        })
      } else {
        this.$alert('please finish all inputs', 'Erro', {
          type: 'warning'
        })
      }
    },
  },
  watch: {},
  created() {
    this.init()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
* {
  margin: 0;
  padding: 0;
}

.gutter {
  margin: 0 1% 0 1%!important;
}

.gutter_child {
  margin-top: 1%;
}

.gutter_picture {
  width: 100%;
}

.imgupload {}
</style>
