<script>
  /** @type {string} */
  export let value;
</script>

<!-- svelte-ignore a11y-role-has-required-aria-props added via action -->
<div role="option" data-value={value}>
  <span>
    <slot />
  </span>
</div>

<style>
  div {
    cursor: pointer;
    padding: 0.25rem 0.5rem;
  }

  :global(div[data-highlighted="true"]) {
    background-color: var(--color-highlight);
    color: var(--color-canvas);
  }
</style>
