// add sign-out button
<template>
<div>
<button id="signOut" @click="signOutRedirect">Log out</button>
</div>
</template>
<script type="module">
import {userManager} from "../js/aws-export.js";

export default {
  methods: {
    signOutRedirect() {
      userManager.signoutRedirect();
    },
  },
};
</script>