<template>
  <nav aria-label="Page navigation example">
    <p>Showing {{ startIndex }} to {{ endIndex }} of {{ totalItems }} items</p>
    <ul class="pagination justify-content-end">
      <li class="page-item" :class="{ disabled: currentPage <= 1 }">
        <a class="page-link" href="#" @click.prevent="prevPage()">Previous</a>
      </li>
      <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }">
        <a class="page-link" href="#" @click.prevent="goToPage(page)">{{ page }}</a>
      </li>
      <li class="page-item" :class="{ disabled: currentPage >= totalPages }">
        <a class="page-link" href="#" @click.prevent="nextPage()">Next</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "PaginationView",
  props: {
    totalItems: {
      type: Number,
      required: true
    },
    itemsPerPage: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      currentPage: 1
    };
  },
  emits: ["page-change"],
  computed: {
    startIndex() {
      return (this.currentPage - 1) * this.itemsPerPage + 1;
    },
    endIndex() {
      const endIndex = this.currentPage * this.itemsPerPage;
      return endIndex > this.totalItems ? this.totalItems : endIndex;
    },
    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    }
  },
  methods: {
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.$emit("page-change", this.currentPage);
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.$emit("page-change", this.currentPage);
      }
    },
    goToPage(page) {
      this.currentPage = page;
      this.$emit("page-change", this.currentPage);
    }
  }
};
</script>

<style scoped>

</style>