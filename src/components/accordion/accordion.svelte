<script>
  import { accordion } from "@components/anatomykit/accordion";
</script>

<div use:accordion={{}}>
  <slot />
</div>

<style>
  div {
    border: 1px solid var(--color-highlight);
  }
</style>
