<!-- svelte-ignore a11y-role-has-required-aria-props (added via the use:slider action) -->
<span {...$$props} role="slider" />

<style>
  /* absolute and positoin styles should apply from action */

  span {
    box-sizing: border-box;
    background-color: white;
    border: 1px solid var(--color-highlight);
    display: block;
    border-radius: 2px;
    height: 1.25rem;
    margin-top: -0.375rem;
    width: 0.375rem;
    left: 28.5%;
    position: absolute;
  }
</style>
