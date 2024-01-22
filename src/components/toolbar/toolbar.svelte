<script>
  import { toolbar } from "@components/anatomykit/toolbar";
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
