<script>
  import { select } from "@components/anatomykit/select.js";
</script>

<div use:select={{}}>
  <slot />
</div>

<style>
  div {
    position: relative;
  }
</style>
