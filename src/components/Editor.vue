<template>
    <div id="editor" style="text-align:left"></div>
</template>

<script>
import wangEditor from 'wangeditor'

export default {
    data () {
        return {
          editorContent: ''
        }
    },
    mounted: function() {
        var editor = new wangEditor('#editor')
        editor.customConfig.onchange = (html) => {
          this.editorContent = html
          this.$store.commit('changeContent', this.editorContent)
        }
        editor.create()
    }    
}
</script>

