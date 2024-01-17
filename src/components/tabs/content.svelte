<script>
  /** @type {string} */
  export let value;
</script>

<!-- 
  requirements 
  - aria-labelledby (button id)
  - id
-->
<div role="tabpanel" data-value={value}>
  <slot />
</div>

<style>
  div {
    border: 1px solid var(--color-highlight);
    padding: 0.5rem;
  }
</style>
