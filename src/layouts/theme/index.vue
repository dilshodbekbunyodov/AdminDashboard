  <template>
      <div class="moon" @click="changeTheme">
          <i :class="themeType ? 'ri-sun-line' : 'ri-moon-line'"/>
      </div>
  </template>

  <script setup>
  import {onMounted, ref} from "vue";

  const themeType = ref(false);

  const changeTheme = () => {
      const theme = document.getElementById("dark").className === "dark";

      if (theme) {
          document.getElementById("dark").className = "";
          themeType.value = !themeType.value;
          localStorage.setItem('nightMode', JSON.stringify(false))
      } else {
          document.getElementById("dark").className = "dark";
          themeType.value = !themeType.value;
          localStorage.setItem('nightMode', JSON.stringify(true))
      }
  };

  onMounted(async () => {
      let local = JSON.parse(JSON.stringify(localStorage.getItem('nightMode')))
      if (local?.includes('true')) {
          document.getElementById("dark").className = "dark";
      } else {
          document.getElementById("dark").className = "";
      }
  })
  </script>

  <style>
  .moon i {
      font-size: 20px;
  }
  </style>
