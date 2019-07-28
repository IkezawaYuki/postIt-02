<template>
  <div class="add-Task container">
    <h2 class="center-align indigo-text">ポストイットの追加</h2>
    <form @submit.prevent="AddTask">
      <div class="field title">
        <label for="title">タイトル:</label>
        <input type="text" name="title" v-model="title">
      </div>
      <div v-for="(ing, index) in tasks" :key="index" class="field">
        <label for="task">タスク:</label>
        <input type="text" name="task" v-model="tasks[index]">
        <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
      </div>
      <div class="field add-task">
        <label for="add-task">追加するタスク:</label>
        <input type="text" name="add-task" @keydown.tab.prevent="addIng" v-model="another">
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn pink">追加する</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init"
import slugify from "slugify"

export default {
  name: 'AddTask',
  data(){
    return {
      title: null,
      another: null,
      tasks: [],
      feedback: null,
      slug: null
    }
  },
  methods:{
    AddTask(){
      if(this.title){
        this.feedback = null
        this.slug = slugify(this.title, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        })
        db.collection("posts").add({
          title: this.title,
          slug: this.slug,
          tasks: this.tasks,
          created_at: new Date()
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
        this.tasks.push(this.another)
        this.another = null
        this.feedback = null
      }else{
        this.feedback = 'You must enter a value to add an task'
      }
    },
    deleteIng(ing){
      this.tasks = this.tasks.filter((task) => {
        return task !== ing
      })
    }
  }
}
</script>

<style>
.add-Task{
  margin-top:60px;
  padding:20px;
  max-width: 500px;
}

.add-Task h2{
  font-size: 2em;
  margin: 20px auto;
}

.add-Task .field{
  margin: 20px auto;
  position: relative;
}
.add-Task .delete{
  position:absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}

</style>
