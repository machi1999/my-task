<template>
<main>
  <header>
    <div>
      <h1>MyTask</h1>
    </div>
  </header>
  <div>
    <p class="info-line">All: {{ totalCardCount }} tasks</p>
    <!-- v-forを使うとき、key属性を与えることが必須である -->
    <ListAdd></ListAdd>
    <div style="display: flex;margin-top: 40px;">
    <List v-for="(item, index) in lists"
            :key="item.id"
            :title="item.title"
            :listIndex="index"
            :cards="item.cards"
            @change="movingCard"
      />

    </div>

  </div>
</main>
</template>



<script>
import ListAdd from './ListAdd'
import List from './List'
import { mapState } from 'vuex'

  export default {
    components: {
      ListAdd,
      List,
    },
    //
    computed:{
      ...mapState([
        'lists'
      ]),
      totalCardCount() {
      return this.$store.getters.totalCardCount
    }
    },
    methods: {
      movingCard: function() {
        this.$store.dispatch('updateList', { lists: this.lists })
      },
    }
  }

</script>
