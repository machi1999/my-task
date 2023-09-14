<template>
  <div class="list">
    <div class="listheader">
      <!-- <p class="list-title" v-if="!isEditingTitle" @click="startEditingTitle">{{title}}</p> -->
      <p class="list-title" v-if="!isEditingTitle" @click="startEditingTitle">{{localTitle}}</p>

      <!-- edit -->
      <input v-if="isEditingTitle"
         v-model="editedTitle"
         @blur="saveTitleChanges"
         class="list-title-input"
         type="text"
         ref="titleInput">
      <!-- edit -->
      <!-- <p class="list-title">{{listIndex}}</p> -->
      <p class="list-counter">total: {{ totalCardInList }}</p>
      <div class="deletelist" @click="removeList">×</div>
    </div>
    <draggable group="cards" :list="cards" @end="$emit('change')">
      <card v-for="(item, index) in cards"
            :body="item.body"
            :key="item.id"
            :cardIndex="index"
            :listIndex="listIndex"
      />
      <CardAdd :listIndex="listIndex" />
    </draggable>
  </div>
</template>


<script>
import CardAdd from './CardAdd'
import Card from './Card'
import draggable from 'vuedraggable'
export default {
  components: {
    CardAdd,
    Card,
    draggable
  },
  // edit
  data() {
    return {
      isEditingTitle: false,
      editedTitle: "",
      localTitle: this.title
    };
  },
  // edit
  computed: {
    totalCardInList() {
      return this.cards.length
    }
  },
  props: {
    //props、親コンポーネントから受け取るデータを定義
    title: {
      type: String,
      required: true
    },
    listIndex: {
      type: Number,
      required: true
    },
    cards: {
    type: Array,
    required: true
  },
  },
  methods: {
    removeList: function() {
      if(confirm('リストを削除してもいいですか。')) {
        this.$store.dispatch('removelist', { listIndex:this.listIndex })
      }
    },
    // edit
    startEditingTitle() {
      this.editedTitle = this.title;
      this.isEditingTitle = true;
      this.$nextTick(() => {
        this.$refs.titleInput.focus();
      });
    },
    saveTitleChanges() {
  if (this.editedTitle.trim()) {
    this.localTitle = this.editedTitle; // Use localTitle instead of title
    this.$store.dispatch('updateListTitle', { listIndex: this.listIndex, newTitle: this.localTitle });
  }
  this.isEditingTitle = false;
}
    // edit

  },
}
</script>
