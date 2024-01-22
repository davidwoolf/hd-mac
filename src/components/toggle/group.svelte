<script>
  import { togglegroup } from "@components/anatomykit/toggle";
</script>

<div role="group" use:togglegroup={{}}>
  <slot />
</div>

<style>
  div {
    display: inline-flex;
  }
</style>
