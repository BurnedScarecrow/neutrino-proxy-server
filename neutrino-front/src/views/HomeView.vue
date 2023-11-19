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

      <div class="bottom-content">
        <div class="actions">
          <a @click="formVisible = !formVisible">Admin panel</a>
          <a href="#">Create my own</a>
        </div>
        <InputField
          class="hidden-form"
          :class="{ visible: formVisible }"
          label="Admin password"
        >
          <input type="password" placeholder: v-model="password" />
          <div class="squared-btn" @click="signIn()">
            <img src="../assets/icons/login-icon.svg" alt="" />
          </div>
        </InputField>
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

    .bottom-content {
      display: flex;
      flex-direction: column;
      gap: 15px;

      .hidden-form {
        transition: all 0.3s ease;
        opacity: 0;
        cursor: default;

        &.visible {
          opacity: 1;
        }
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
          }
        }
      }
    }
  }
}
</style>

<script lang="ts" setup>
import "vue3-toastify/dist/index.css";
import InputField from "@/components/InputFieldComponent.vue";
import axios from "axios";
import { onMounted, ref } from "vue";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const baseurl = "http://localhost:4004/api/";

const store = useStore();
const router = useRouter();

const password = ref("");
const formVisible = ref(false);

async function signIn() {
  try {
    const result = await axios.post(`${baseurl}auth`, {
      username: "admin",
      password: password.value,
    });

    if (result.status === 201) {
      store.dispatch("authorize");
      router.push("/admin");
    } else {
      toast.error("Unauthorised");
    }
  } catch (e) {
    toast.error("Unauthorised", {
      theme: "dark",
      transition: "flip",
      autoClose: 2000,
    });
  }
}

onMounted(() => {
  store.dispatch("logout");
});
</script>
