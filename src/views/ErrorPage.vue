<template>
  <div class="erro">
    <h1>Erro {{ code }}</h1>
    <p>{{ message }}</p>
    <router-link to="/">Voltar à página inicial</router-link>
  </div>
</template>

<script>
export default {
  name: 'ErrorPage',
  data() {
    return {
      errorMessages: {
        404: 'Página não encontrada.',
        500: 'Erro interno do servidor.',
        403: 'Acesso negado.',
        400: 'Requisição inválida.',
      }
    }
  },
  computed: {
    code() {
      return parseInt(this.$route.params.code) || 500
    },
    message() {
      return this.errorMessages[this.code] || 'Ocorreu um erro desconhecido.'
    }
  }
}
</script>