<template>
  <div>
    <h1>Add Todo</h1>
    <router-link to="/">&lt; Back to Home</router-link><br /><br />
    <div id="form">
      <form @submit.prevent="addTodo">
        <h3 for="userId">User Id:</h3>
        <input type="number" id="userId" v-model="newTodo.userId" /><br /><br />
        <h3 for="title">Title:</h3>
        <input type="text" id="title" v-model="newTodo.title" /><br /><br />
        <h3 for="completed">Completed:</h3>
        <input
          type="radio"
          id="completed"
          v-model="newTodo.completed"
          value="true"
        />
        <label for="completed">True</label>
        <input
          type="radio"
          id="completed"
          v-model="newTodo.completed"
          value="false"
        />
        <label for="completed">False</label><br /><br />

        <Button type="primary" size="large">Save</Button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Button from "../components/Button.vue";

export default {
  name: "AddPage",
  components: {
    Button,
  },
  data() {
    return {
      newTodo: {
        id: null,
        userId: null,
        title: "",
        completed: false,
      },
    };
  },
  methods: {
    async addTodo() {
      try {
        await axios.post(
          `https://jsonplaceholder.typicode.com/todos`,
          this.newTodo
        );
        alert("Todo successfully added!");
        this.$router.push("/");
      } catch (error) {
        console.error("Error adding todo:", error);
        alert("There was an error adding todo.");
      }
    },
  },
};
</script>

<style scoped>
#form {
  text-align: left;
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
  width: 30vw;
}

input[type="text"],
input[type="number"] {
  width: 100%;
  padding: 12px 20px;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

Button {
  width: 100%;
}

label {
  margin-right: 20px;
}
</style>
