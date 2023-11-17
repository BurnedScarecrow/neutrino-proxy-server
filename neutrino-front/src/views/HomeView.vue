<template>
  <div class="home">
    <video autoplay muted loop id="blob">
      <source src="@/assets/blob.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <div class="content">
      <div class="hello">
        <span class="small-text">You've just opened</span>
        <h1>Neutrino <span class="description"> — smart proxy</span></h1>
      </div>

      <div class="actions">
        <router-link to="admin">Admin panel</router-link>
        <a href="#">Create my own</a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0px;
  color: #fadafa;

  #blob {
    width: 70vh;
  }
  .content {
    width: 50vh;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: "Kodchasan", sans-serif;
    gap: 60px;

    .hello {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      * {
        padding: 0;
        margin: 0;
      }

      h1 {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 3em;
      }
    }
    .description {
      font-size: 0.8rem;
      font-style: italic;
      font-weight: normal;
    }

    .actions {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 20px;

      a:first-child {
        border: 1px solid #fadafa;
        color: #fadafa;
        padding: 5px 20px;
        font-size: 1rem;
        border-radius: 10px;
        background: none;
        font-family: "Kodchasan", sans-serif;
        cursor: pointer;
        transition: all 0.1s ease-in;

        &:hover {
          background: #fadafa;
          text-decoration: none;
          color: #180a33;
        }
      }

      a {
        text-decoration: none;
        color: #fadafa;
        display: block;
        &:hover {
          text-decoration: underline;
          // color: #180a33;
        }
      }
    }
  }
}
</style>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeView",
  components: {},
});
</script>
