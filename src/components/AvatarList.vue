<template>
  <v-radio-group v-model="radioGroup">
    <v-layout id="avatars-container" wrap>
      <v-flex>
        <label class="avatars"
          ><v-radio type="radio" name="avatar" :value="image" />
          <img class="avatar" :src="image" alt="avatar" />
        </label>
      </v-flex>
      <v-flex v-for="(avatar, index) in avatars" :key="index">
        <label class="avatars"
          ><v-radio type="radio" name="avatar" :value="'uploads/' + avatar" />
          <img class="avatar" :src="'/uploads/' + avatar" alt="avatar" />
        </label>
      </v-flex>
    </v-layout>
  </v-radio-group>
</template>

<script>
import axios from "axios";
export default {
  props: ["image"],
  data() {
    return {
      avatars: [],
      radioGroup: ""
    };
  },
  methods: {
    getAvatars: function() {
      axios.get("/uploads").then(avatars => (this.avatars = avatars.data));
    }
  },
  created() {
    this.getAvatars();
  },
  updated() {
    this.$emit("update", this.radioGroup);
  }
};
</script>

<style>
#avatars-container {
  height: 300px;
  overflow-y: scroll;
}

/* .avatars > input {
  display: none;
} */

.v-radio {
  display: none;
}

.avatars > input + img {
  cursor: pointer;
  border: 2px solid transparent;
}

.avatars > .accent--text + img {
  border: 4px groove green;
}

.avatar {
  width: 90px;
}
</style>
