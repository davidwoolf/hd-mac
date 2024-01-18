<script>
  import { select } from "./action.js";
</script>

<div use:select={{}}>
  <slot />
</div>

<style>
  div {
    position: relative;
  }
</style>
