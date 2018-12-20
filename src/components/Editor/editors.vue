<template>
<div>
  <div id="summernotes">

  </div>
</div>
</template>
<script>
//import $ from 'jquery';
import { PORSCHE_HOST } from "../../common/host";
import { post } from "../../common/post";
import _ from "lodash";
export default {
  props: {
    contents: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },

  computed: {},
  methods: {},
  mounted() {
    console.log(323232);
    let self = this;
    $("#summernotes").summernote({
      lang: "zh-CN",
      placeholder: "请在此编辑您的文章...",
      width: "100%",
      minHeight: 300,
      dialogsInBody: true,
      fontNames: [
        "黑体",
        "Arial",
        "Arial Black",
        "Comic Sans MS",
        "weiruanyahei",
        "porsche"
      ],
      callbacks: {
        // onPaste: function (e) {
        //     var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
        //     e.preventDefault();
        //     document.execCommand('insertText', false, bufferText);
        // },
        onPaste: function(ne) {
          console.log(1118888, ne);
          var bufferText = (
            (ne.originalEvent || ne).clipboardData || window.clipboardData
          ).getData("Text/plain");
          //    ne.preventDefault();
          ne.preventDefault ? ne.preventDefault() : (ne.returnValue = false);
          // Firefox fix
          console.log(555, bufferText);
          $("#summernotes").summernote("insertText", bufferText);

          /*  */
        },
        onChange: function(contents, $editable) {
          // console.log(1333331, contents, 122);
          setTimeout(function() {
            // console.log(111);
            let te = contents
              .replace(
                /<font face=".*?">/g,
                '<font face="font-family: PorscheNextWLa,黑体,SimHei,宋体,SimSun,sans-serif !important">'
              );
              // .replace(/'PingFang SC'/g, "")
              // .replace(/Helvetica/g, "");
            // .replace(/<style[\S\s]*?<\/style>/g, "");

            // console.log(1111441,contents);
            console.log(888, te, 666);
            self.$emit("article-changes", te);
          }, 2000);
        },
        onImageUpload: function(files) {
          let formData = new FormData();
          formData.append("file", files[0]);
          let result = self.axios({
            method: "post",
            url: PORSCHE_HOST + "/fileupload",
            data: formData,
            contentType: false,
            processData: false,
            headers: {}
          });
          result.then(res => {
            console.log(res);
            //$('#summernote').summernote('editor.insertImage',PORSCHE_HOST+res.data.data.picture_path);
            $("#summernotes").summernote(
              "insertImage",
              PORSCHE_HOST + res.data.data.picture_path,
              function($image) {
                $image.css({
                  width: "100%",
                  position: "relative"
                });
                $image.attr("data-filename", "retriever");
              }
            );
          });
        }
      }
    });
    $("#summernotes").summernote("code", self.contents);
  }
};
</script>
<style  scoped>
img {
  max-width: 100%;
}

.note-editor {
  margin: 0 auto;
}
</style>
