<template>
  <div id="app">
    <h1>Cognito-Integration</h1>
    <RouterView />
  </div>
</template>

<script>
import Login from './components/Login.vue';

export default {
  components: {
    Login,
  },
};
</script>
