<template>
  <div>
    Hello:
    <pre id="email"></pre>
    Access token:
    <pre id="access-token"></pre>
    ID token:
    <pre id="id-token"></pre>
    Refresh token:
    <pre id="refresh-token"></pre>
  </div>
</template>
<script setup type="module">
import {userManager} from "../js/aws-export.js";
import { onMounted } from 'vue'

onMounted(() => {

  userManager.signinCallback().then(function (user) {
    console.log('user', user);
    document.getElementById("email").textContent = user.profile?.email;
    document.getElementById("access-token").textContent = user.access_token;
    document.getElementById("id-token").textContent = user.id_token;
    document.getElementById("refresh-token").textContent = user.refresh_token;
  });
})
</script>