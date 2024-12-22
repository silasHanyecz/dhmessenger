<template>
  <div id="app" class="messenger">
    <!-- Sidebar mit Kontakten -->
    <aside class="contacts">
      <header class="contacts-header">
        <div class="circle element" @click="openDialog()"></div>
        <h2 class="element">Kontakte</h2>
      </header>
      <ul class="contacts-list">
        <li
            v-for="(contact, index) in contacts"
            :key="index"
            :class="{ active: selectedContact === contact }"
            @click="selectContact(contact)">
          {{ contact.name }}
        </li>
      </ul>
      <button @click="openAddContactDialog()">New Contact</button>
    </aside>


    <!-- Chat-Bereich -->
    <main class="chat">
      <header class="chat-header">
        <h2 v-if="selectedContact">Chat mit {{ selectedContact.name }}</h2>
        <h2 v-else>Wähle einen Kontakt</h2>
      </header>

      <div class="chat-messages">
        <div
            v-for="(message, index) in selectedContact?.messages || []"
            :key="index"
            :class="['message', message.isMine ? 'mine' : 'theirs']">
          <p class="message-text">{{ message.text }}</p>
          <small class="message-time">{{ message.time }}</small>
        </div>
      </div>

      <!-- Dialog -->
      <dialog id="circleDialog">
        <h2>Profil</h2>
        <p>Account Details:</p>
        <input type="text" readonly value="user.id">
        <button @click="closeDialog()">Schließen</button>
      </dialog>

      <!-- New Contact Dialog -->
      <dialog id="addContactDialog">
        <h2>Neuen Kontakt hinzufügen</h2>
        <label for="name">Username:</label>
        <input type="text" id="contactName" name="name" required/>

        <div class="dialog-buttons">
          <button @click="saveContact()">Speichern</button>
          <button @click="closeAddContactDialog">Abbrechen</button>
        </div>
      </dialog>

      <!-- Eingabefeld -->
      <footer class="chat-input" v-if="selectedContact">
        <input
            type="text"
            placeholder="Nachricht schreiben..."
            v-model="newMessage"
            @keydown.enter="sendMessage"/>
        <button @click="sendMessage">Senden</button>
      </footer>
    </main>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      user: {
        id: "",
        name: ""
      },
      contacts: [
        {
          name: "Alice", messages: [
            {text: "Hi! Wie geht's?", time: "10:00", isMine: false},
            {text: "Gut, und dir?", time: "10:01", isMine: true}
          ]
        },
        {
          name: "Jan", messages: [
            {text: "Hallo", time: "09:00", isMine: false},
            {text: "Nei oder", time: "09:00", isMine: true},

          ]
        },
        {name: "Charlie", messages: []}
      ],
      selectedContact: null,
      newMessage: "",
    };
  },
  methods: {
    selectContact(contact) {
      this.selectedContact = contact;
    },
    sendMessage() {
      if (this.newMessage.trim() !== "" && this.selectedContact) {
        this.selectedContact.messages.push({
          text: this.newMessage,
          time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
          isMine: true
        });
        this.newMessage = "";
      }
    },
    openDialog() {
      const dialog = document.getElementById('circleDialog');
      dialog.showModal();
    },
    closeDialog() {
      const dialog = document.getElementById('circleDialog');
      dialog.close();
    },
    openAddContactDialog() {
      const dialog = document.getElementById('addContactDialog');
      dialog.showModal(); // Öffnet das Dialogfenster
    },

    closeAddContactDialog() {
      const dialog = document.getElementById('addContactDialog');
      dialog.close();
    },
    saveContact() {
      const username = document.getElementById("contactName").value;
      const url = 'https://8nsdchyc06.execute-api.us-east-1.amazonaws.com/default/addKontakt';

      const id = localStorage.getItem("jwtToken");
      if (!id) {
        console.error("Kein Token gefunden!");
        return;
      }

      console.log("Token:", id);

      const user = {
        username: username,
        token: id
      };

      console.log("Neuer Kontakt:", user);

      // Anfrage senden
      axios.post(url, user, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${id}`
        },
      })
          .then(response => {
            console.log('Kontakt gespeichert:', response.data);
          })
          .catch(error => {
            console.error('Fehler beim Senden der Daten:', error);
          });
    }
  }
};

</script>

<style scoped>
.messenger {
  display: flex;
  height: 100vh;
  font-family: Arial, sans-serif;
}

.contacts {
  width: 30%;
  background-color: #f7f7f7;
  border-right: 1px solid #ccc;
  display: flex;
  flex-direction: column;
}

.contacts-header {
  padding: 10px;
  background-color: #007bff;
  color: white;
  text-align: center;
  display: flex; /* Use flexbox for alignment */
  align-items: center; /* Align items vertically */
  gap: 1rem;
}

.contacts-list {
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
  overflow-y: auto;
}

.contacts-list li {
  padding: 15px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
}

.contacts-list li.active {
  background-color: #007bff;
  color: white;
}

.contacts-list li:hover {
  background-color: #f0f0f0;
}

.chat {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.chat-header {
  padding: 10px;
  background-color: #007bff;
  color: white;
  text-align: center;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  background-color: #f0f0f0;
}

.message {
  max-width: 70%;
  margin: 5px 0;
  padding: 10px;
  border-radius: 10px;
  background-color: #e1e1e1;
  align-self: flex-start;
}

.message.mine {
  background-color: #007bff;
  color: white;
  align-self: flex-end;
}

.message-text {
  margin: 0;
}

.message-time {
  font-size: 0.8em;
  color: gray;
  text-align: right;
}

.chat-input {
  display: flex;
  padding: 10px;
  background-color: white;
  border-top: 1px solid #ccc;
}

.chat-input input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
}

.chat-input button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.chat-input button:hover {
  background-color: #0056b3;
}

.circle {
  width: 100px;
  height: 100px;
  background-color: #3498db;
  border-radius: 50%;
  cursor: pointer;
}

.element {
  display: inline-block;
  margin: 10px;
  padding: 10px;
  background-color: #3498db;
  color: white;
}

dialog {
  border: none;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  max-width: 400px;
}

dialog::backdrop {
  background: rgba(0, 0, 0, 0.5);
}

button {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}


form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

label {
  font-weight: bold;
}

input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.dialog-buttons {
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
}
</style>
