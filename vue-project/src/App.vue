<template>
  <div id="app">
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
