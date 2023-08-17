<template>
  	<div 
  		class="search-link"
		v-if="recipes"
	>
    	<ul
    	  v-for="{ _id, title } in recipes"
    	  :key="_id"
    	>
    	  <li>
    	    <RouterLink
    	      :to="{ name: 'recipe-by-id', params: { id: _id } }"
    	    >
    	      {{ title }}
    	    </RouterLink>
    	  </li>
    	</ul>
  	</div>
	<p 
		v-else
		class="search-link"
	>
		No hay resultados de esta búsqueda.
	</p>
</template>

<script>
import recipehubApi from '@/api/recipehubApi'
import { ref, watch } from 'vue'
export default {
  props: {
    searchTerm: {
      type: String,
	  required: true
    }
  },
  setup(props) {

    // Reactive states
    const recipes = ref(null)

    // Methods
    const searchByTerm = async(searchTerm) => {
      try {
        const { data } = await recipehubApi.get('/recipe/search', {
          params: {
            searchTerm: searchTerm
          }
        })

        recipes.value = data.length ? data : null
      } catch (error) {
        throw new Error(error.response.data.message)
      }
    }

    watch(
      () => props.searchTerm,
      async() => {
        await searchByTerm(props.searchTerm) 
      }
    )

    return {
      recipes
    }
  }
}
</script>

<style lang="scss" scoped>
@use '@/sass/components/form';
</style>