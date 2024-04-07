<template>
  <div>
    <h1>TODOS</h1>
    <router-link to="/add">+ Add Data</router-link><br /><br />
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>User Id</th>
          <th>Title</th>
          <th>Completed</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="todo in paginatedTodos" :key="todo.id">
          <td>{{ todo.id }}</td>
          <td>{{ todo.userId }}</td>
          <td>{{ todo.title }}</td>
          <td>{{ todo.completed }}</td>
          <td>
            <Button @click="edit(todo.id)" size="small" type="primary"
              >Edit</Button
            >
            <Button @click="deleteTodo(todo.id)" size="small" type="secondary"
              >Delete</Button
            >
          </td>
        </tr>
      </tbody>
    </table>
    <Button @click="prevPage" :disabled="currentPage === 1">Prev</Button>
    <Button @click="nextPage" :disabled="currentPage === totalPages">
      Next
    </Button>
  </div>
</template>

<script>
import axios from "axios";
import Button from "../components/Button.vue";

export default {
  name: "HomePage",
  components: {
    Button,
  },
  data() {
    return {
      todos: [],
      currentPage: 1,
      itemsPerPage: 10,
      alertShown: false,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.filteredTodos.length / this.itemsPerPage);
    },
    paginatedTodos() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.filteredTodos.slice(startIndex, endIndex);
    },
    filteredTodos() {
      return this.todos.filter((todo) => !todo.deleted);
    },
  },
  mounted() {
    this.fetchTodos();
  },
  methods: {
    async fetchTodos() {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/todos"
        );
        this.todos = response.data.map((todo) => ({ ...todo, deleted: false }));
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    edit(id) {
      this.$router.push(`/edit/${id}`);
    },
    async deleteTodo(id) {
      try {
        await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
        this.todos = this.todos.map((todo) => {
          if (todo.id === id) {
            return { ...todo, deleted: true };
          }
          return todo;
        });
        if (!this.alertShown) {
          this.alertShown = true;
          alert("Todo deleted successfully!");
          setTimeout(() => {
            this.alertShown = false;
          }, 100);
        }
      } catch (error) {
        console.error("Error deleting todo:", error);
        alert("There was an error deleting the todo.");
      }
    },
  },
};
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 70vw;
  margin-bottom: 45px;
}

th,
td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

tr:hover {
  background-color: #d6eeee;
}

Button {
  margin-right: 10px;
}
</style>
