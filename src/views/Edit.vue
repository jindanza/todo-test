<template>
  <div v-if="todo">
    <h1>Edit Todo</h1>
    <router-link to="/">&lt; Back to Home</router-link><br /><br />
    <div id="form">
      <form @submit.prevent="updateTodo">
        <h3 for="title">Title:</h3>
        <input type="text" id="title" v-model="todo.title" />
        <h3 for="completed">Completed:</h3>
        <input
          type="radio"
          id="completed"
          v-model="todo.completed"
          value="true"
        />
        <label for="completed">True</label>
        <input
          type="radio"
          id="completed"
          v-model="todo.completed"
          value="false"
        />
        <label for="completed">False</label><br /><br />

        <Button type="primary" size="large">Save</Button>
      </form>
    </div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script>
import axios from "axios";
import Button from "../components/Button.vue";

export default {
  name: "EditPage",
  components: {
    Button,
  },
  data() {
    return {
      todo: null,
    };
  },
  mounted() {
    const todoId = this.$route.params.id;
    this.fetchTodo(todoId);
  },
  methods: {
    async fetchTodo(id) {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/todos/${id}`
        );
        this.todo = response.data;
      } catch (error) {
        console.error("Error fetching todo:", error);
      }
    },
    async updateTodo() {
      try {
        await axios.put(
          `https://jsonplaceholder.typicode.com/todos/${this.todo.id}`,
          this.todo
        );
        alert("Todo updated successfully!");
        this.$router.push("/");
      } catch (error) {
        console.error("Error updating todo:", error);
        alert("There was an error updating the todo.");
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

input[type="text"] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
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
