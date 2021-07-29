<template>
  <div class="index">
    <star-score :score = '4' :maxScore = '5' :star_num = '5' >
    </star-score>
  </div>
</template>

<script>
  import starScore from "../components/star-score.vue";
  export default {
    name: "Index",
    components: {
      starScore
    },
    methods:{
      test:function(){
        this.$confirm();
      }
    }
  }
</script>

<style>
</style>
