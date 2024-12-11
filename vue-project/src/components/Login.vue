// add sign-in button
<template>

  <div>
    <button id="signIn" @click="signinRedirect()">Sign In</button>
  </div>
</template>

<script type="module">
import {userManager} from "../js/aws-export.js";

export default {
  methods: {
    signinRedirect() {
      userManager.signinRedirect();
    },
  },
};


</script>