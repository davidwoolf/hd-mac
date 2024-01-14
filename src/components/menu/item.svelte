<li class="menu-item" role="menuitem">
  <button tabindex="-1" type="button" on:click={(e) => {}}>
    <slot />
  </button>
</li>

<style>
  button {
    outline: none;
    padding: 0rem 0.75rem;
    text-align: left;
    width: 100%;
  }

  :global(.menu-item[data-highlighted] button) {
    background-color: var(--color-highlight);
    color: var(--color-canvas);
    outline: none;
  }
</style>
