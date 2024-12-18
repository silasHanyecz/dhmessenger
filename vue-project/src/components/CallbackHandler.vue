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
  <button @click="dynamoRequest()">DynamoReqest</button>
</template>
<script setup type="module">
import {userManager} from "../js/aws-export.js";
import {onMounted} from 'vue'
import axios from "axios";

onMounted(() => {

  userManager.signinCallback().then(function (user) {
    console.log('user', user);
    document.getElementById("email").textContent = user.profile?.email;
    document.getElementById("access-token").textContent = user.access_token;
    document.getElementById("id-token").textContent = user.id_token;
    document.getElementById("refresh-token").textContent = user.refresh_token;
  });
})

async function dynamoRequest() {
  const url = 'https://x3cc8ws22g.execute-api.us-east-1.amazonaws.com/default/DynamoDb';
  const jwtToken = document.getElementById("access-token").innerText // Replace with your actual JWT token
  console.log("jwtToken", jwtToken)
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}
</script>