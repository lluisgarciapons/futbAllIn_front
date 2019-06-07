<template>
  <div class="match">
    <div id="time" class="time">
      {{ this.date(match) }}
    </div>
    <div>
      <div class="team" v-for="team in match.teams" :key="team.id">
        {{ team.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["match"],
  methods: {
    date(match) {
      var date = new Date(parseInt(match.date));
      var h = date.getHours();
      var m = date.getMinutes();

      function checkTime(i) {
        if (i < 10) {
          i = "0" + i;
        }
        return i;
      }

      h = checkTime(h);
      m = checkTime(m);

      var month = new Array();
      month[0] = "January";
      month[1] = "February";
      month[2] = "March";
      month[3] = "April";
      month[4] = "May";
      month[5] = "June";
      month[6] = "July";
      month[7] = "August";
      month[8] = "September";
      month[9] = "October";
      month[10] = "November";
      month[11] = "December";

      var weekday = new Array(7);
      weekday[0] = "Sunday";
      weekday[1] = "Monday";
      weekday[2] = "Tuesday";
      weekday[3] = "Wednesday";
      weekday[4] = "Thursday";
      weekday[5] = "Friday";
      weekday[6] = "Saturday";
      // return `${weekday[date.getDay()].slice(0, 3)} ${date.getDate()} ${
      //   month[date.getMonth()]
      // }
      //         ${h}:${m}h.`;
      return `${h}:${m}`;
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300&display=swap");

.match {
  display: flex;
  align-items: center;
}

.time {
  font-family: "Open Sans Condensed", sans-serif;
  font-size: 70px;
  padding-left: 15px;
  /* border-left: 2px groove red; */
  position: relative;
}

.time:after {
  content: "";
  width: 10px;
  height: 10px;
  position: absolute;
  bottom: 20%;
  left: 0;
  border-left: 2px solid red;
  border-bottom: 2px solid red;
}

.team {
  letter-spacing: 3px;
  font-weight: 400;
  font-size: 20px;
  margin-left: 10px;
}
</style>
