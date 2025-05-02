<template>
  <div>
    <div v-if="post" class="post">
      <div class="image">
        <img :src="post.image" :alt="post.title"/>
      </div>
      <h1>{{ post.title }}</h1>
      <p>{{ post.content }}</p>

      <div v-if="manage" class="post-actions">
        <button @click="editPost">Editar</button>
        <button @click="removePost">Remover</button>
      </div>
    </div>
  </div>
</template>

<script>
import { getPostById } from '../services/postService'

export default {
  name: 'PostView',
  props: {
    manage: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      post: null
    }
  },
  async created() {
    const { id, slug } = this.$route.params

    try {
      const post = await getPostById(id)

      if (post) {
        this.post = post
        document.title = `Meu Blog - ${post.title}`

        if (!slug || slug !== post.slug) {
          this.$router.push({
            name: 'PostPorId',
            params: { id: post.id, slug: post.slug }
          })
        }

      } else {
        this.$router.push({ path: '/error/404' })
      }
    } catch (error) {
      console.error(error)
      this.$router.push({ path: '/error/500' })
    }
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