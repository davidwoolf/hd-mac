<!-- data-orientation="horizontal" -->

<span data-type="track">
  <slot />
</span>

<style>
  span {
    background: var(--color-document);

    box-shadow: 0 0 0 1px var(--color-canvas), 0 0 0 2px var(--color-highlight);
    height: 100%;
    width: 100%;
  }
</style>
