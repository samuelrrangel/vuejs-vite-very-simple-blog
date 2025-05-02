<template>
  <div>
    <h1>Meu Blog</h1>
    <Post 
      v-for="post in posts" 
      :key="post.id" 
      :post="post" 
    />
  </div>
</template>

<script>
import Post from 'src/views/Post.vue'

export default {
  components: {
    Post
  }
}
</script>

<style scoped>
  .post-actions {
    margin-top: 16px;
  }
  button {
    margin-right: 8px;
  }
</style>
