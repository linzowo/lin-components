/**
 * 文件上传接口
 * @param {FormData} data 文件数据 {
 * file: 文件数据
 * }
 * @param {Function} onProgress 进行进度监控的方法
 * @returns request
 */
 export function uploadFile(data, onProgress) {
  return request({
    url: '/file/upload',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    onUploadProgress: (progress) => {
      try {
        if (onProgress) {
          // console.log((progress.loaded * 100) / progress.total)
          onProgress({ percent: (progress.loaded * 100) / progress.total })
        }
      } catch (error) {
        console.log('获取进度失败', error)
      }
    },
    timeout: 5 * 60 * 1000,
    data
  })
}

export default {
  data() {
    return {
      uploadNum: 0,
      uploadEndNum: 0
    }
  },
  computed: {
    // 是否所有文件上传完成
    uploadCompelete() {
      return this.uploadNum === this.uploadEndNum
    }
  },
  methods: {
    /**
     * 覆盖原始的文件上传事件
     * @param {Object} {
        {Object} uploadData 上传的文件数据
        {Function} checkFn  校验文件方法 通过 ==> true 不通过 ==> false
        {Function} success  上传成功后的处理方法
        {Function} fail     上传失败后的处理方法
      }
      * @example
      this.myUploadHandle({
        uploadData,
        checkFn: (file, filename, filetype) => {
          if (file.size / 1024 / 1024 > 60) {
            // 文件大于60MB
            this.$message.error('上传文件不能大于60M')
            uploadData.onError()
            return false
          }

          if (FILE_TYPE_DIC[filetype] !== 0) {
            this.$message.error('只能上传image文件')
            uploadData.onError()
            return false
          }

          return true
        },
        success: (successData) => {
          this.upLoadContainer.fileList.push(successData)
        }
      })
     */
    myUploadHandle({
      uploadData, checkFn, success, fail
    }) {
      // 文件上传数+1
      this.uploadNum++
      // el-update http-request 不处理 noop 方法
      console.log('文件数据', uploadData)
      // uploadData.onError()
      // uploadData.onProgress()
      // uploadData.onSuccess()

      const { file } = uploadData
      const filename = file.name
      const filetype = file.name.split('.').pop()

      if (checkFn && !checkFn(file, filename, filetype)) return

      const formData = new FormData()
      formData.append('file', file, filename)
      uploadFile(formData, uploadData.onProgress)
        .then((res) => {
          console.log('上传文件成功', res)
          const { code, data } = res.data
          if (code === 200) {
            if (success) {
              success({
                data: data.url,
                name: data.name,
                format: filetype
              })
            }

            uploadData.onSuccess()
          } else {
            throw new Error('上传失败，服务器处理失败')
          }
        })
        .catch((err) => {
          console.log('上传文件失败', err)
          this.$message.error('上传文件失败,请稍后再试.')
          uploadData.onError(err)
          if (fail) fail(err)
        }).finally(() => {
          // 文件上传完成+1
          this.uploadEndNum++
        })
    },
    /**
     * 检查是否上传中
     * @returns {Boolean} true ==> 上传中 false ===> 上传失败
     */
    isUploading() {
      if (!this.uploadCompelete) {
        this.$message.warning('文件上传中，请稍等。')
        return true
      }

      return false
    }
  }
}
