<template>
  <div>
    <!-- v-onイベントをハンドル -->
    <form action="" v-bind:class='classList' @submit.prevent="addList">
      <input
      v-model="title"
      type="text"
      class="text-input"
      placeholder="Add new list"
      @focusin="startEditing"
      @focusout="finishEditing">
      <button type="submit" class="add-button"  v-if="isEditing || titleExists">Add</button>
      <!-- <pre>{{$data}}</pre> -->
    </form>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      title: '',
      // 初期値フォーカス外れてる状態
      isEditing: false,
    }
  },
  // dataの監視
  computed: {
    classList() {
      const classList = ['addlist']
      if (this.isEditing) {
        classList.push('active')
      }
      if (this.titleExists) {
        classList.push('addable')
      }
      return classList
    },
    titleExists() {
      return this.title.length > 0
    },
  },
  methods: {
    addList: function(){
      // this.$store.dispatch('アクション名')でactionsを実行
      this.$store.dispatch('addlist', { title:this.title })
      this.title= ''
    },
    startEditing: function() {
      this.isEditing = true
    },
    finishEditing: function() {
      this.isEditing = false
    }
  }
}
</script>
