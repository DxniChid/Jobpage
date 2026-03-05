<script>
import '../src/routes/index'

export default{

  components: {
    Header
  }

}

</script>

<template>
  
  <header>
  <Header title="Job Page" icon="src/images/pfp.webp" link="test"></Header>
  </header>

  <body>
     <RouterLink to="/jobdescription">Click me</RouterLink>
  <RouterView/>
  </body>
 

</template>

<style scoped>

</style>
