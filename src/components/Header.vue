<template>
  <header class="site-header">
    <div class="header-icon">
      <img src="" alt="Meu Blog"/>
    </div>
    <nav class="nav">
      <router-link to="/" class="nav-link">Início</router-link>
      <router-link to="/manage" class="nav-link">Gerenciar</router-link>
    </nav>
  </header>
</template>
      
<script>
export default {
  name: 'Header'
}
</script>
      
<style scoped>
  .site-header {
    background-color: #f5f5f5;
    padding: 16px;
    border-bottom: 1px solid #ddd;
  }
  
  .nav {
    display: flex;
    gap: 16px;
  }
  
  .nav-link {
    text-decoration: none;
    color: #333;
    font-weight: bold;
  }
  
  .nav-link:hover {
    color: #007BFF;
  }
</style>