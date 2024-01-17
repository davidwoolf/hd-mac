<h2>
  <button type="button">
    <slot />
  </button>
</h2>

<style>
  button {
    border-bottom: 1px solid var(--color-highlight);
    padding: 1rem;
    text-align: left;
    width: 100%;
  }

  button:focus {
    background-color: var(--color-document);
    outline: none;
  }
</style>
