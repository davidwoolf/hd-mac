<script>
  import { togglegroup } from "./action";
</script>

<div use:togglegroup>
  <slot />
</div>

<style>
  div {
    display: flex;
  }
</style>
