<script>
  import { togglegroup } from "./action";
</script>

<div role="group" use:togglegroup={{}}>
  <slot />
</div>

<style>
  div {
    display: flex;
  }
</style>
