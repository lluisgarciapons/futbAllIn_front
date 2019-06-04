<template>
  <ul id="book-list">
    <li v-for="book in books" :key="book.id">{{ book.name }}</li>
  </ul>
</template>
<script>
import gql from "graphql-tag";

export default {
  apollo: {
    books: gql`
      query {
        books {
          name
          id
          author {
            name
            age
          }
        }
      }
    `
  }
};
</script>
