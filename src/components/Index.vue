<template>
  <div class="index container">
    <div class="card" v-for="post in posts" :key="post.id">
      <div class="card-content">
        <i class="material-icons delete" @click="deleteTask(post.id)">delete</i>
        <h2 class="indigo-text">{{ post.title }}</h2>
        <ul class="ingredients">
          <i></i>
          <li v-for="(ing, index) in post.tasks" :key="index">
            <span class="chip">{{ ing }}</span>
          </li>
        </ul>
      </div>
      <span class="btn-floating btn-large halfway-fab pink">
        <router-link :to="{name:'EditTask', params:{Task_slug: post.slug }}">
          <i class="material-icons edit">edit</i>
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
import db from '@/firebase/init'

export default {
  name: 'Index',
  data () {
    return {
      posts:[]
    }
  },
  methods:{
    deleteTask(id){
      console.log(id)
      db.collection("posts").doc(id).delete()
      .then(() => {
         this.posts = this.posts.filter(post => {
            return post.id != id
         })
      })

    }
  },
  created(){
    db.collection("posts").get()
       .then(snapshot => {
         snapshot.forEach(doc => {
           let post = doc.data()
           post.id = doc.id
           console.log(post)
           this.posts.push(post)
         });
       }).catch(err => {
         console.log(err)
       })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.index{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 60px;
}
.index h2{
  font-size: 1.8em;
  text-align: center;
  margin-top: 0;
}
.index .ingredients{
  margin: 30px auto;
}
.index .ingredients li{
  display: inline-block;
}

.index .delete{
  position:absolute;
  top:4px;
  right:4px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.4em;
}
</style>
