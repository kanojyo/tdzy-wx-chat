<template>
    <el-dialog title="查看大图" :visible.sync="state" width="50%" :close-on-click-modal="false" :before-close="close">
      <div class="image" style="text-align:center;">
        <img :src="url" alt style="width:100%;">
      </div>
    </el-dialog>
</template>

<script>
 export default {
   data () {
     return {
     }
   },
   props:{
        state:{
            type:Boolean
        },
        url:{
            type:String
        }
    },
    methods:{
        close(){
            this.$emit('change',false)
        }
    }
 }
</script>

<style>

 
</style>
