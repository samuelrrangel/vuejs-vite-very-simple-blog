<template>
  <div>
    <div class="container">
      <h1>Gerenciar postagens</h1>

      <!-- Botões de ação -->
      <div class="actions">
        <button @click="deleteSelectedPosts" :disabled="selectedPosts.length === 0">
          Remover selecionados ({{ selectedPosts.length }})
        </button>
      </div>

      <!-- Lista de postagens -->
      <div v-if="posts && posts.length" v-for="post in posts" :key="post.id">
        <input 
          type="checkbox" 
          :value="post.id" 
          v-model="selectedPosts" 
        />
        <PostCard 
          :post="post" 
          :manage="true" 
        />
      </div>
      <div v-else>
        <p>Nenhuma postagem encontrada. Crie uma abaixo!</p>
      </div>
      
      <!-- Formulário de criação -->
      <div class="poster">
        <h2>Criar nova postagem</h2>
        <form @submit.prevent="createPost">
          <input v-model="newPost.title" placeholder="Título" required />
          <input type="file" @change="handleImageUpload" accept="image/*" required />
          <textarea v-model="newPost.content" placeholder="Conteúdo" required></textarea>
          <button type="submit">Criar postagem</button>
        </form>
        <p v-if="imagePreview">
          <strong>Prévia da imagem:</strong><br />
          <img :src="imagePreview" style="max-width: 200px; margin-top: 8px;" />
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import PostCard from 'src/components/PostCard.vue'
import {
  getAllPosts,
  createPost,
  deletePost
} from '../services/postService'

export default {
  name: 'Manage',
  components: { PostCard },
  data() {
    return {
      posts: [],
      selectedPosts: [],
      newPost: {
        title: '',
        slug: '',
        content: '',
        image: ''
      },
      imagePreview: ''
    }
  },
  async created() {
    await this.fetchPosts()
  },
  methods: {
    async fetchPosts() {
      try {
        this.posts = await getAllPosts()
      } catch (error) {
        console.error('Erro ao carregar posts:', error)
      }
    },
    handleImageUpload(event) {
      const file = event.target.files[0]
      if (!file) return

      const reader = new FileReader()
      reader.onload = e => {
        this.newPost.image = e.target.result // base64
        this.imagePreview = e.target.result
      }
      reader.readAsDataURL(file)
    },
    async deleteSelectedPosts() {
      if (!confirm('Tem certeza que deseja remover os posts selecionados?')) return

      try {
        for (const id of this.selectedPosts) {
          await deletePost(id)
        }
        this.selectedPosts = []
        await this.fetchPosts()
      } catch (error) {
        console.error('Erro ao deletar posts:', error)
      }
    },
    async createPost() {
      const { title, image, content } = this.newPost
      if (!title || !image || !content) {
        alert('Preencha todos os campos, incluindo a imagem.')
        return
      }

      const slug = title.toLowerCase().replace(/\s+/g, '-')

      const post = {
        title,
        slug,
        content,
        image
      }

      try {
        await createPost(post)
        await this.fetchPosts()

        // Reset
        this.newPost = { title: '', slug: '', content: '', image: '' }
        this.imagePreview = ''
      } catch (error) {
        console.error('Erro ao criar post:', error)
      }
    }
  }
}
</script>

<style scoped>
.container {
  padding: 1rem;
}

.poster {
  margin-top: 2rem;
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 8px;
}

input, textarea {
  display: block;
  margin-bottom: 0.5rem;
  width: 100%;
  padding: 0.5rem;
}

button {
  margin-top: 0.5rem;
}

.actions {
  margin-bottom: 1rem;
}
</style>