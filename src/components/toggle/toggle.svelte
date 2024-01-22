<script>
  import { toggle } from "@components/anatomykit/toggle";

  export let value = false;
</script>

<div>
  <button use:toggle={{ value }}>
    <slot />
  </button>
</div>

<style>
  button {
    border: 1px solid var(--color-highlight);
    box-shadow: 0 2px 0 0 var(--color-highlight);
    padding: 1rem;
  }

  button:focus {
    background-color: var(--color-document);
    outline: none;
  }

  div :global(button[aria-pressed="true"]) {
    box-shadow: inset 0 2px 0 1px var(--color-document);
  }
</style>
