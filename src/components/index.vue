<template>
  <div id="app">
    <head-com />
    <login-com />
  </div>
</template>

<script>
  import headCom from '@/components/head'
  import loginCom from '@/components/login'
  export default {
    name: 'App',
    components: {
      headCom,
      loginCom
    },
    data() {
      return {

      };
    },
    mounted(){

    }
  };
</script>
<style scoped>

</style>
