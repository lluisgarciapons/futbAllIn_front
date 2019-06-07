<template>
  <div>
    <div class="text-xs-center">
      <!-- <v-btn color="primary" @click="alert = !alert">
        Toggle
      </v-btn> -->
    </div>
    <v-alert
      :value="alert"
      type="warning"
      dismissible
      transition="slide-y-transition"
    >
      Create a player to join a team
    </v-alert>
  </div>
</template>

<script>
export default {
  data() {
    return {
      alert: false
    };
  },
  created() {
    setTimeout(() => {
      this.alert = true;
    }, 800);
  }
};
</script>

<style scoped>
</style>

