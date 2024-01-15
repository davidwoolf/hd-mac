<script>
</script>

<button type="button" {...$$props}>
  <slot />
</button>

<style>
  button {
    border: 1px solid var(--color-highlight);
    border-radius: var(--radius-md);
    line-height: 1;
    padding: 0.25rem 0.375rem;
  }

  button:active,
  button:focus {
    box-shadow: 0 0 0 1px white, 0 0 0 3px var(--color-highlight);
    outline: none;
  }
</style>
