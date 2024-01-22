<!-- svelte-ignore a11y-role-has-required-aria-props (added via the use:slider action) -->

<span {...$$props} role="slider" />

<style>
  span {
    background-color: white;
    border: 1px solid var(--color-highlight);
    border-radius: 2px;
    width: 0.375rem;
    margin-top: -0.375rem;
    height: 1.25rem;
  }
</style>
