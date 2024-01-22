<script>
  import { menuRole, itemRole, menu, generateId } from "@components/anatomykit/menu.js";
  /** @type {string} */
  export let label;

  const id = generateId();
  let expanded = false;

  function toggleMenu() {
    expanded = !expanded;
  }
</script>

<li>
  <button
    aria-haspopup="menu"
    aria-expanded={expanded}
    data-selected={expanded}
    aria-controls={id}
    type="button"
    role={itemRole}
    on:keyup={(e) => {
      if (e.key === "ArrowDown") {
        expanded = true;
      }
    }}
    on:click={toggleMenu}>
    {label}
  </button>

  <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
  <ul
    {id}
    role={menuRole}
    class="control-menu"
    tabindex="0"
    data-open={expanded}
    use:menu={{
      enabled: expanded,
      requestOpen: () => {
        expanded = true;
      },
      requestClose: () => {
        expanded = false;
      },
    }}>
    <slot />
  </ul>
</li>

<style>
  button {
    padding: 0 0.75rem;
  }

  button[data-selected="true"] {
    background-color: var(--color-highlight);
    color: var(--color-canvas);
    outline: none;
  }

  .control-menu {
    background-color: var(--color-canvas);
    border: 1px solid var(--color-highlight);
    box-shadow: 3px 3px 0px -1px var(--color-highlight);
    display: none;
    left: 0;
    padding: 0.25rem 0;
    position: absolute;
    top: 100%;
    min-width: 12rem;
    width: max-content;
  }

  .control-menu[data-open="true"] {
    display: block;
  }
</style>
