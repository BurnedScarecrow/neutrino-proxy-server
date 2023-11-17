<template>
  <div class="input-field">
    <div class="label">{{ label }}</div>
    <div class="input-field-content">
      <slot>
        <input type="text" />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "InputField",
  props: {
    label: String,
  },
});
</script>

<style lang="scss">
.input-field {
  width: 300px;
  font-family: "Kodchasan", sans-serif;
  display: flex;
  flex-direction: column;

  .label {
    font-size: 12px;
    padding: 3px 5px;
    margin-bottom: 2px;
    background: rgba(0, 0, 0, 0.2);
    width: fit-content;
    border-radius: 4px;
  }

  .input-field-content {
    display: flex;
    justify-content: space-between;
  }

  input,
  select {
    text-align: center;
    height: 35px;
    font-size: 1em;
    width: 100%;
  }

  button {
    font-size: 1em;
    height: 35px;
    width: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &.active {
      border: 1px solid #fafafa;
    }

    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  }
}
</style>
