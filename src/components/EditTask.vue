<template>
  <div v-if="Task" class="edit-Task container">
    <h2>ポストイットの編集： {{ Task.title }}</h2>
    <form @submit.prevent="editTask">
      <div class="field title">
        <label for="title">Task Title:</label>
        <input type="text" name="title" v-model="Task.title">
      </div>
      <div v-for="(ing, index) in Task.tasks" :key="index" class="field">
        <label for="task">タスク:</label>
        <input type="text" name="task" v-model="Task.tasks[index]">
        <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
      </div>
      <div class="field add-task">
        <label for="add-task">タスクを加える:</label>
        <input type="text" name="add-task" @keydown.tab.prevent="addIng" v-model="another">
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn pink">更新する</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'
export default {
  name: 'EditTask',
  data(){
    return {
      Task: null,
      another: null,
      feedback: null
    }
  },
  created(){
    let ref = db.collection("posts").where('slug', '==', this.$route.params.Task_slug)
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.Task = doc.data()
        this.Task.id = doc.id
      })
    })

  },
  methods:{
    editTask(){
      if(this.Task.title){
        this.feedback = null
        this.slug = slugify(this.Task.title, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        })
        db.collection("posts").doc(this.Task.id).update({
          title: this.Task.title,
          slug: this.Task.slug,
          tasks: this.Task.tasks,
          update_at: new Date()
        }).then(() => {
          this.$router.push({name: 'Index'})
        }).catch(err => {
          console.log(err)
        })
      }else{
        feedback = 'You must enter a Task title'
      }
    },
    addIng(){
      if(this.another){
        this.Task.tasks.push(this.another)
        this.another = null
        this.feedback = null
      }else{
        this.feedback = 'You must enter a value to add an task'
      }
    },
    deleteIng(ing){
      this.Task.tasks = this.Task.tasks.filter((task) => {
        return task !== ing
      })
    }
  }
}

</script>

<style>
.edit-Task{
  margin-top:60px;
  padding:20px;
  max-width: 500px;
}

.edit-Task h2{
  font-size: 2em;
  margin: 20px auto;
}

.edit-Task .field{
  margin: 20px auto;
  position: relative;
}
.edit-Task .delete{
  position:absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}

</style>
