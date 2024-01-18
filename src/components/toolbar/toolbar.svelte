<script>
  import { toolbar } from "./action";
  /** @type {string} */
  export let label;
</script>

<div
  role="toolbar"
  use:toolbar={{
    label,
  }}>
  <slot />
</div>

<style>
  div {
    display: inline-flex;
  }
</style>
