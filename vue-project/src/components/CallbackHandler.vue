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
import {onMounted, reactive} from 'vue'
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
const data = reactive({
  user: {
    id: "",
    name: ""
  }
});
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
    data.user.id = response.data.Id;
    data.user.name = response.data.Username;
    console.log("data", data.user)
    axios.post('/messenger', data.user)
        .then(response => {
          console.log('Daten erfolgreich gesendet:', response.data);
        })
        .catch(error => {
          console.error('Fehler beim Senden der Daten:', error);
        });
    location.replace("/messenger")
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}
</script>