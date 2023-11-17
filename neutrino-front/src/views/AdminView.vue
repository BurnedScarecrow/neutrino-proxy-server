<template>
  <div class="admin">
    <header>
      <h3>Neutrino</h3>
    </header>

    <main>
      <section class="proxy-settings">
        <InputField label="Proxy password">
          <input :type="passVisibility" v-model="proxyConfig.password" />
          <img
            v-if="passVisibility == 'password'"
            class="squared-btn"
            @click="togglePassword()"
            src="../assets/icons/eye-opened.svg"
          />
          <img
            v-else
            class="squared-btn"
            @click="togglePassword()"
            src="../assets/icons/eye-closed.svg"
          />
        </InputField>
        <InputField label="Proxy port">
          <input type="number" v-model="proxyConfig.server_port" />
        </InputField>
        <InputField label="Encryption method">
          <select v-model="proxyConfig.method">
            <option value="chacha-ietf-poly1305">chacha-ietf-poly1305</option>
            <option value="aes-256-gcm">aes-256-gcm</option>
            <option value="rc4">rc4</option>
          </select>
        </InputField>
        <InputField label="Proxy mode">
          <button
            @click="setMode('tcp')"
            :class="{ active: proxyConfig.mode === 'tcp' }"
          >
            TCP
          </button>
          <button
            @click="setMode('tcp_and_udp')"
            :class="{ active: proxyConfig.mode === 'tcp_and_udp' }"
          >
            TCP&UDP
          </button>
          <button
            @click="setMode('udp')"
            :class="{ active: proxyConfig.mode === 'udp' }"
          >
            UDP
          </button>
        </InputField>

        <div class="delimiter"></div>
        <InputField>
          <button class="save-btn" @click="saveConfig()">
            Save and restart
          </button>
        </InputField>
      </section>
      <section class="access-list">
        <div class="access-list-header">
          One-time access list
          <div class="info">
            <img src="../assets/icons/info.svg" />
            <span>Click to copy key</span>
          </div>
        </div>
        <div class="empty-list-icon" v-show="!accessList.length">
          <img src="../assets/icons/empty-icon.svg" alt="" />
          <p>Add the first key →</p>
        </div>
        <div class="list-view">
          <div
            v-for="item in accessList"
            class="access-list-item"
            :key="item.key"
            @click="copyKey(item.key)"
          >
            {{ item.name }}
            <img
              @click="deleteAccess(item.key)"
              src="../assets/icons/delete-icon.svg"
              alt=""
            />
          </div>
        </div>
      </section>
      <section class="danger-zone">
        <div class="create-one-time">
          <InputField label="Create one-time access key">
            <input type="text" v-model="newKeyName" placeholder="Key name" />
            <img
              class="squared-btn"
              @click="createAccessKey()"
              src="../assets/icons/add-square.svg"
            />
          </InputField>
          <InputField label="Copy permanent access key">
            <input
              type="text"
              style="font-size: 0.6em"
              disabled
              :value="permanentKey"
            />
            <img
              class="squared-btn"
              src="../assets/icons/copy-icon.svg"
              @click="copyKey(permanentKey)"
            />
          </InputField>
        </div>
        <div class="admin-password-editor">
          <InputField label="Change admin password">
            <input :type="adminPassVisibility" v-model="adminPassword" />
            <img
              v-if="adminPassVisibility == 'password'"
              class="squared-btn"
              @click="toggleAdminPassword()"
              src="../assets/icons/eye-opened.svg"
            />
            <img
              v-else
              class="squared-btn"
              @click="toggleAdminPassword()"
              src="../assets/icons/eye-closed.svg"
            />
            <img
              class="squared-btn"
              @click="changeAdminPassword()"
              src="../assets/icons/tick.svg"
            />
          </InputField>
        </div>
        <button
          class="toggle-proxy"
          @click="toggleProxy()"
          :class="{ 'green-btn': !isProxyActive }"
        >
          {{ isProxyActive ? "Turn off proxy" : "Turn on proxy" }}
        </button>
      </section>
    </main>
    <div class="bg">
      <video autoplay muted loop id="blob">
        <source src="@/assets/blob.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  </div>
</template>

<style lang="scss">
.admin {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}

header {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fafafa;
  height: 30vh;
  font-family: "Kodchasan", sans-serif;

  h3 {
    font-weight: normal;
    font-size: 1.3em;
    margin: 0;
    padding: 0;
    user-select: none;
  }
}

.bg {
  display: block;
  position: fixed;
  top: calc((30vh) / 2);
  left: 50%;
  max-width: 400px;
  transform: translate(-50%, -50%);
  z-index: -1;

  video {
    width: 100%;
  }
}

main {
  padding: 10px 50px;
  margin-bottom: 5vh;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  align-items: center;
  height: 60vh;
  font-family: "Kodchasan", sans-serif;

  section {
    box-sizing: border-box;
    width: 300px;
    height: 400px;
    border-radius: 7px;
    gap: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &:nth-child(2) {
      background-color: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(5px);
      padding: 20px;
      justify-content: flex-start;

      .empty-list-icon {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-self: center;
        margin-top: 100px;

        img {
          align-self: center;
        }
        p {
          font-size: 0.8em;
        }
      }

      .access-list-header {
        text-align: center;

        .info {
          display: flex;
          margin-top: 5px;
          align-items: center;
          justify-content: center;

          img {
            height: 1em;
            margin-right: 3px;
          }
          span {
            font-size: 0.7em;
            font-weight: 100;
          }
        }
      }

      .list-view {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 20px;
        height: fit-content;
        max-height: 300px;
        overflow-y: auto;
        padding: 0 10px;
        box-sizing: border-box;
        scrollbar-color: rgba(255, 255, 255, 0.1);
        scrollbar-width: thin !important;

        &::-webkit-scrollbar {
          width: 4px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }

        &::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 3px;
        }
        .access-list-item {
          background: rgba(255, 255, 255, 0.1);
          display: flex;
          height: 35px;
          font-size: 1em;
          text-align: left;
          padding: 5px 10px;
          box-sizing: border-box;
          border-radius: 7px;
          display: flex;
          align-items: center;
          justify-content: space-between;

          &:hover {
            cursor: pointer;
            background: rgba(255, 255, 255, 0.2);
          }
        }
      }
    }

    .delimiter {
      width: 100%;
      height: 1px;
      background: #fafafa77;
    }

    .save-btn {
      width: 100%;
      background: rgba(255, 255, 255, 0.3);

      &:hover {
        color: var(--accent);
        background: #fafafa;
      }
    }

    .create-one-time {
      display: flex;
      flex-direction: column;
      gap: 20px;

      button {
        height: 35px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;

        &:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        img {
          width: 20px;
        }
      }
    }

    .squared-btn {
      height: 35px;
      width: 35px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 7px;
      margin-left: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 7px;
      box-sizing: border-box;
      cursor: pointer;

      &:hover {
        background: rgba(255, 255, 255, 0.2);
      }
    }

    button.toggle-proxy {
      background: #d74242;
      color: #fafafa;
      height: 35px;
      font-size: 1em;
      cursor: pointer;

      &:hover {
        background: #af2e2e;
      }

      &.green-btn {
        background: #1b532c;

        &:hover {
          background: #174625;
        }
      }
    }
  }
}
</style>

<script lang="ts" setup>
import InputField from "@/components/InputFieldComponent.vue";
import axios from "axios";
import { onMounted, ref } from "vue";
import { ToastType, toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
// import { useRouter } from "vue-router";

// const router = useRouter();
const baseurl = "http://localhost:4004/api/";
const passVisibility = ref("password");
const adminPassVisibility = ref("password");
const newKeyName = ref("");
const permanentKey = ref("");

const adminPassword = ref("");
const proxyConfig = ref({
  password: "",
  server_port: null,
  method: "",
  mode: "",
});

const accessList = ref([
  {
    name: "name1",
    key: "key1",
  },
  {
    name: "name2",
    key: "key2",
  },
  {
    name: "name3",
    key: "key3",
  },
  {
    name: "name4",
    key: "key4",
  },
  {
    name: "name5",
    key: "key5",
  },
  {
    name: "name6",
    key: "key6",
  },
  {
    name: "name7",
    key: "key7",
  },
  {
    name: "name8",
    key: "key8",
  },
]);

function setMode(mode: string) {
  proxyConfig.value.mode = mode;
  // TODO
}

function deleteAccess(key: string) {
  accessList.value = accessList.value.filter((item) => item.key != key);
  // TODO
}

async function sendRequest(cb: () => any) {
  try {
    await cb();
  } catch (e: any) {
    console.log(e);
    if (!e?.response?.data?.message) {
      notify(e.message, "error");
    } else {
      notify(e.response.data.message, "error");
    }
  }
}

async function changeAdminPassword() {
  sendRequest(async () => {
    const response = await axios.put(`${baseurl}change-password`, {
      username: "admin",
      password: adminPassword.value,
    });
    if (response.status == 200) {
      notify("Admin password changed!", "success");
    }
  });
}

function togglePassword() {
  passVisibility.value =
    passVisibility.value == "password" ? "text" : "password";
}

function toggleAdminPassword() {
  adminPassVisibility.value =
    adminPassVisibility.value == "password" ? "text" : "password";
}

function createAccessKey() {
  // TODO
  if (newKeyName.value.trim() === "") {
    notify("Enter key name firstly", "error");
    return;
  }
  console.log("create key");
  const item = {
    name: newKeyName.value,
    key: newKeyName.value,
  };
  accessList.value.push(item);
}

function getPermanentKey() {
  permanentKey.value = "ntrn://98ad7ab390b1c6f7012db18c04e16bba79d6e";
}

function notify(text: string, mode?: ToastType) {
  toast(text, {
    autoClose: 2000,
    pauseOnHover: true,
    theme: "dark",
    transition: "flip",
    type: mode || "default",
    position: "top-right",
  });
}

async function copyKey(key: string) {
  try {
    await navigator.clipboard.writeText(key);
    console.log("Content copied to clipboard");
    notify("Key copied to clipboard");
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
}

function toggleProxy() {
  if (isProxyActive.value) {
    // TODO turn off
    stopProxy();
    isProxyActive.value = false;
  } else {
    // TODO turn on
    startProxy();
  }
}

const isProxyActive = ref(true);

function getProxyConfig() {
  sendRequest(async () => {
    const result = await axios.get(`${baseurl}config`);
    console.log(result);
    proxyConfig.value = result?.data;
  });
}

function saveConfig() {
  sendRequest(async () => {
    const result = await axios.post(`${baseurl}config`, {
      ...proxyConfig.value,
    });
    console.log(result);
    notify("Config saved", "success");

    restartProxy();
    // notify("Restart required.", "default");
  });
}

function restartProxy() {
  const toastId = toast("Restart...", {
    theme: "dark",
    transition: "flip",
    position: "top-right",
    isLoading: true,
  });

  sendRequest(async () => {
    try {
      const result = await axios.post(`${baseurl}restart`);

      if (result.data == "active") {
        toast.update(toastId, {
          render: "Proxy restarted!",
          autoClose: 2200,
          type: "success",
          isLoading: false,
        });
      } else {
        toast.update(toastId, {
          render: "Failed to restart...",
          autoClose: 2000,
          type: "error",
          isLoading: false,
        });
      }
    } catch (e) {
      toast.update(toastId, {
        render: "Failed to restart...",
        autoClose: 2000,
        type: "error",
        isLoading: false,
      });
    }
  });
}

function startProxy() {
  const toastId = toast.loading("Starting...", {
    autoClose: 2000,
    pauseOnHover: true,
    theme: "dark",
    transition: "flip",
    position: "top-right",
  });

  sendRequest(async () => {
    try {
      const result = await axios.post(`${baseurl}start`);

      if (result.data == "active") {
        toast.update(toastId, {
          render: "Proxy is running!",
          autoClose: 2000,
          type: "success",
          isLoading: false,
        });
        isProxyActive.value = true;
      } else {
        toast.update(toastId, {
          render: "Failed to start...",
          autoClose: 2000,
          type: "error",
          isLoading: false,
        });
      }
    } catch (e) {
      toast.update(toastId, {
        render: "Failed to start...",
        autoClose: 2000,
        type: "error",
        isLoading: false,
      });
    }
  });
}

function proxyStatus() {
  sendRequest(async () => {
    const result = await axios.get(`${baseurl}status`);
    isProxyActive.value = result.data == "active" ? true : false;
  });
}

function stopProxy() {
  const toastId = toast.loading("Finishing...", {
    autoClose: 2000,
    pauseOnHover: true,
    theme: "dark",
    transition: "flip",
    position: "top-right",
  });

  sendRequest(async () => {
    try {
      const result = await axios.post(`${baseurl}stop`);

      if (result.data == "inactive") {
        toast.update(toastId, {
          render: "Proxy was stopped!",
          autoClose: 2000,
          type: "warning",
          isLoading: false,
        });
        isProxyActive.value = false;
      } else {
        toast.update(toastId, {
          render: "Failed to stop...",
          autoClose: 2000,
          type: "error",
          isLoading: false,
        });
      }
    } catch (e) {
      toast.update(toastId, {
        render: "Failed to stop...",
        autoClose: 2000,
        type: "error",
        isLoading: false,
      });
    }
  });
}

onMounted(() => {
  // const pass = prompt("Enter password");
  // if (pass != "admin") {
  //   router.push("/");
  // }
  proxyStatus();
  getPermanentKey();
  getProxyConfig();
});
</script>
