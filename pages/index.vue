<template>
  <v-card v-if="showAddListPrompt" :loading="loading">
    <v-card-title>Add list</v-card-title>
    <v-container>
      <center>
        <v-col sm="6">
          <v-text-field v-model="listName" label="name" outlined clearable required></v-text-field>
        </v-col>

        <v-btn color="primary" larger width="12rem" :disabled="loading" @click="addList">Add</v-btn>
        <v-btn color="primary" larger width="12rem" :disabled="loading" @click="showAddListPrompt = false">Cancel</v-btn>
        <v-col sm="6">
          <v-alert v-if="addListResponse" dense outlined :type="addListResponse.success ? 'success' : 'error'" style="margin-top: 2rem"> {{ addListResponse.msg }} </v-alert>
        </v-col>
      </center>
    </v-container>
  </v-card>

  <v-card v-else-if="showDelListPrompt" :loading="loading">
    <v-card-title>Delete list</v-card-title>
    <v-container>
      <center>
        <v-col sm="6">
          <v-card-text>Delete {{ selectedList.listName }} ?</v-card-text>
          <v-card-text>listId: {{ selectedList.id }} ?</v-card-text>
        </v-col>

        <v-btn color="primary" larger width="12rem" :disabled="loading" @click="delList(selectedList.id)">Yes</v-btn>
        <v-btn color="primary" larger width="12rem" :disabled="loading" @click="showDelListPrompt = false">Cancel</v-btn>
        <v-col sm="6">
          <v-alert v-if="delListResponse" dense outlined :type="delListResponse.success ? 'success' : 'error'" style="margin-top: 2rem"> {{ delListResponse.msg }} </v-alert>
        </v-col>
      </center>
    </v-container>
  </v-card>

  <v-card v-else-if="showEditListPrompt" :loading="loading">
    <v-card-title>Edit List</v-card-title>
    <v-container>
      <center>
        <v-col sm="6">
          <v-card-text> {{ selectedList.listName }} </v-card-text>
          <v-text-field v-model="listName" label="name" outlined clearable required></v-text-field>
        </v-col>

        <v-btn color="primary" larger width="12rem" :disabled="loading" @click="editList(selectedList.id)">Yes</v-btn>
        <v-btn color="primary" larger width="12rem" :disabled="loading" @click="showEditListPrompt = false">Cancel</v-btn>
        <v-col sm="6">
          <v-alert v-if="editListResponse" dense outlined :type="editListResponse.success ? 'success' : 'error'" style="margin-top: 2rem"> {{ editListResponse.msg }} </v-alert>
        </v-col>
      </center>
    </v-container>
  </v-card>

  <v-card v-else-if="showAddTaskPrompt" :loading="loading">
    <v-card-title>Add new Task now todo later</v-card-title>
    <v-container>
      <center>
        <v-col sm="6">
          <v-text-field v-model="taskName" label="task name" outlined clearable required></v-text-field>
          <v-text-field v-model="description" label="description" outlined clearable></v-text-field>
          <v-checkbox v-model="completed" label="I have already Completed this task" color="success" value="true" hide-details
          style="margin-bottom: 2rem; margin-top: -0.7rem"></v-checkbox>
        </v-col>

        <v-btn color="primary" larger width="12rem" :disabled="loading" @click="addTask(selectedList.id)">Add</v-btn>
        <v-btn color="primary" larger width="12rem" :disabled="loading" @click="showAddTaskPrompt = false">Cancel</v-btn>
        <v-col sm="6">
          <v-alert v-if="addTaskResponse" dense outlined :type="addTaskResponse.success ? 'success' : 'error'" style="margin-top: 2rem"> {{ addTaskResponse.msg }} </v-alert>
        </v-col>
      </center>
    </v-container>
  </v-card>

  <v-card v-else-if="showDelTaskPrompt" :loading="loading">
    <v-card-title>Delete Task</v-card-title>
    <v-container>
      <center>
        <v-col sm="6">
          <v-card-text>Delete {{ selectedTask.todoName }} ?</v-card-text>
          <v-card-text>listId: {{ selectedTask.id }} ?</v-card-text>
        </v-col>

        <v-btn color="primary" larger width="12rem" :disabled="loading" @click="delTask(selectedTask.id)">Yes</v-btn>
        <v-btn color="primary" larger width="12rem" :disabled="loading" @click="showDelTaskPrompt = false">Cancel</v-btn>
        <v-col sm="6">
          <v-alert v-if="delTaskResponse" dense outlined :type="delTaskResponse.success ? 'success' : 'error'" style="margin-top: 2rem"> {{ delTaskResponse.msg }} </v-alert>
        </v-col>
      </center>
    </v-container>
  </v-card>

  <v-card v-else-if="showEditTaskPrompt" :loading="loading">
    <v-card-title>Edit Task</v-card-title>
    <v-container>
      <center>
        <v-col sm="6">
          <v-card-text> {{ selectedTask.todoName }} </v-card-text>
          <v-text-field v-model="taskName" label="task name" outlined clearable required></v-text-field>
          <v-text-field v-model="description" label="description" outlined clearable></v-text-field>
          <v-checkbox v-model="completed" label="I have already Completed this task" color="success" value="true" hide-details
          style="margin-bottom: 2rem; margin-top: -0.7rem"></v-checkbox>
        </v-col>

        <v-btn color="primary" larger width="12rem" :disabled="loading" @click="editTask">Yes</v-btn>
        <v-btn color="primary" larger width="12rem" :disabled="loading" @click="showEditTaskPrompt = false">Cancel</v-btn>
        <v-col sm="6">
          <v-alert v-if="editTaskResponse" dense outlined :type="editTaskResponse.success ? 'success' : 'error'" style="margin-top: 2rem"> {{ editTaskResponse.msg }} </v-alert>
        </v-col>
      </center>
    </v-container>
  </v-card>
  
  <v-row v-else>
    <v-col cols="3">
      <v-sheet rounded="lg">
        <v-list color="transparent">
          <v-list-item v-for="list in lists" :key="list.id" link>
            <v-list-item-content @click="selectedList = list">
              <v-list-item-title> {{ list.listName }} </v-list-item-title>
            </v-list-item-content>
            <v-btn icon x-small color="red" style="margin-right: -3px" 
            @click="selectedList = list; showEditListPrompt = true">✏️</v-btn>
            <v-btn icon x-small color="red" style="margin-right: -13px" 
            @click="selectedList = list; showDelListPrompt = true">❌</v-btn>
          </v-list-item>

          <v-divider class="my-2"></v-divider>

          <v-list-item link color="grey lighten-4" @click="showAddListPrompt = true">
            <v-list-item-content>
              <v-list-item-title> Add list </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-sheet>
    </v-col>

    <v-col>
        <v-list-item>
            <v-list-item-content>
              <v-list-item-title> {{ selectedList.listName }} </v-list-item-title>
            </v-list-item-content>
        </v-list-item>
      <v-sheet min-height="70vh" rounded="lg">
        <!--  -->
        <v-list v-if="selectedList != ''" color="transparent">
          <v-list-item link color="grey lighten-4" @click="showAddTaskPrompt = true">
            <v-list-item-content>
              <v-list-item-title> Add a New Task </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider class="my-2"></v-divider>

          <v-list-item v-for="task in currentTodos" :key="task.id" link>
            <v-list-item-avatar>
                <v-btn v-if="task.completed == true"  icon outlined x-small color="green"
                @click="selectedTask = task, markTask(false)">✔️</v-btn>
                <v-btn v-else icon outlined x-small color="grey"
                @click="selectedTask = task, markTask(true)"></v-btn>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title> {{ task.todoName }} </v-list-item-title>
              <v-list-item-subtitle> {{ task.description }} </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-avatar>
            <v-btn icon x-small color="yellow" @click="selectedTask = task, showEditTaskPrompt = true">✏️</v-btn>
          </v-list-item-avatar>
            <v-btn icon x-small color="red" @click="selectedTask = task, showDelTaskPrompt = true">❌</v-btn>
          </v-list-item>
        </v-list>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage',
  async asyncData({ $api }) {
    const res = await $api.getLists()
    return { lists: res.list }
  },
  data() {
    return {
      showAddListPrompt: false,
      showDelListPrompt: false,
      showEditListPrompt: false,
      showAddTaskPrompt: false,
      showDelTaskPrompt: false,
      showEditTaskPrompt: false,
      listName: '',
      loading: false,
      addListResponse: '',
      delListResponse: '',
      editListResponse: '',
      taskName: '',
      description: '',
      completed: '',
      addTaskResponse: '',
      delTaskResponse: '',
      editTaskResponse: '',
      markTaskResponse: '',
      selectedList: '',
      selectedTask: '',
      currentTodos: ''
    }
  },
  watch: {
    selectedList() {
      this.currentTodos = ''
      this.getTodos()
    }
  },
  mounted() {},
  methods: {
    async getLists() {
      const res = await this.$api.getLists()
      if (res.success) {
        this.lists = res.list
      }
    },
    async addList() {
      if (this.loading) return
      this.loading = true
      this.addListResponse = ''
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const res = await this.$api.addList(this.listName)
      this.addListResponse = res
      if (res.success) {
        await new Promise((resolve) => setTimeout(resolve, 500))
        this.lists.push(res.list)
        this.showAddListPrompt = false
        this.addListResponse = ''
        this.listName = ''
        await this.getLists()
      }
      this.loading = false
    },
    async delList(listId) {
      if (this.loading) return
      this.loading = true
      this.delListResponse = ''
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const res = await this.$api.delList(listId)
      this.delListResponse = res
      if (res.success) {
        await new Promise((resolve) => setTimeout(resolve, 500))
        this.lists = this.lists.filter((item) => item.id != listId)
        this.showDelListPrompt = false
        this.delListResponse = ''
        this.selectedList = ''
        await this.getLists()
      }
      this.loading = false
    },
    async editList(listId) {
      if (this.loading) return
      this.loading = true
      this.editListResponse = ''
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const res = await this.$api.editList(listId, this.listName)
      this.editListResponse = res
      if (res.success) {
        await new Promise((resolve) => setTimeout(resolve, 500))
        this.showEditListPrompt = false
        this.editListResponse = ''
        this.selectedList = ''
        await this.getLists()
      }
      this.loading = false
    },
    async getTodos() {
      const res = await this.$api.getTodos(this.selectedList.id)
      if (res.success) {
        this.currentTodos = res.list
      }
    },
    async addTask(listId) {
      if (this.loading) return
      this.loading = true
      this.addTaskResponse = ''
      console.log(this.completed)
      if (this.completed == 'true') {
        this.compelted = true
      } else { this.completed = false }
      console.log(this.completed)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const res = await this.$api.addTodo(this.taskName, listId, this.description, this.completed)
      this.addTaskResponse = res
      if (res.success) {
        await new Promise((resolve) => setTimeout(resolve, 500))
        this.showAddTaskPrompt = false
        this.addTaskResponse = ''
        this.taskName = ''
        this.description = ''
        this.completed = false
        await this.getTodos()
        // this.$router.replace({ path: '/' })
      }
      this.loading = false
    },
    async delTask(taskId) {
      if (this.loading) return
      this.loading = true
      this.delTaskResponse = ''
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const res = await this.$api.delTodo(taskId)
      this.delTaskResponse = res
      if (res.success) {
        await new Promise((resolve) => setTimeout(resolve, 500))
        this.showDelTaskPrompt = false
        this.delTaskResponse = ''
        this.selectedTask = ''
        await this.getTodos()
      }
      this.loading = false
    },
    async editTask() {
      if (this.loading) return
      this.loading = true
      this.editTaskResponse = ''
      const task = this.selectedTask
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const res = await this.$api.editTodo(task.id, this.taskName, this.description, this.completed)
      this.editTaskResponse = res
      if (res.success) {
        await new Promise((resolve) => setTimeout(resolve, 500))
        this.showEditTaskPrompt = false
        this.editTaskResponse = ''
        this.selectedTask = ''
        this.taskName = ''
        this.description = ''
        this.completed = ''
        await this.getTodos()
      }
      this.loading = false
    },
    async markTask(completed) {
      this.markTaskResponse = ''
      const task = this.selectedTask
      const res = await this.$api.markTodo(task.id, completed)
      this.markTaskResponse = res
      if (res.success) {
        this.markTaskResponse = ''
        this.selectedTask = ''
        this.completed = ''
        await this.getTodos()
      }
      this.loading = false
    }

  }
}
</script>
