<script>
  import { accordion } from "./action";
</script>

<div use:accordion={{}}>
  <slot />
</div>

<style>
  div {
    border: 1px solid var(--color-highlight);
  }
</style>
