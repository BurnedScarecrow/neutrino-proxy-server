<template>
  <router-view v-slot="{ Component }">
    <transition name="slide-fade">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Kodchasan:ital,wght@0,200;0,400;0,700;1,200&display=swap");

.slide-fade-enter-active {
  transition: all 1s ease-out 0.6s;
}

.slide-fade-leave-active {
  transition: all 0.6s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  // transform: translateX(20px);
  opacity: 0;
}

:root {
  --accent: #180a33;
}

body {
  background-color: var(--accent);
  color: #fafafa;
  overflow: hidden;
}
body,
html {
  margin: 0;
  padding: 0;
  height: 100%;
}

input,
select,
button {
  display: block;
  border: 0;
  background: rgba(255, 255, 255, 0.1);
  color: #fafafa;
  border-radius: 7px;
  box-sizing: border-box;
  outline: none !important;
  transition: all ease 0.2s;
}

option {
  background: var(--accent);
}
</style>
