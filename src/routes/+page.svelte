<script>
  import Window from "@components/window.svelte";
  import MenuBar from "@components/menu/bar.svelte";
  import Menu from "@components/menu/menu.svelte";
  import MenuItem from "@components/menu/item.svelte";
  import "../app.css";
</script>

<header>
  <MenuBar>
    <Menu label="">
      <MenuItem>About</MenuItem>
      <MenuItem>Version</MenuItem>
      <MenuItem>License</MenuItem>
    </Menu>

    <Menu label="File" />

    <Menu label="Edit" />
    <Menu label="View" />
    <Menu label="Special" />
  </MenuBar>
</header>

<main>
  <Window title="System Disk" width={576} height={288} />
</main>

<style>
  :global(body) {
    background-color: var(--color-highlight);
    display: grid;
    font-family: var(--font-primary);
    font-size: var(--font-size-regular);
    grid-template-rows: 2rem 1fr;
    height: 100vh;
    overflow: hidden;
    -webkit-font-smoothing: antialiased;
  }

  header {
    background-color: white;
    border-radius: var(--radius-lg) var(--radius-lg) 0 0;
    border-bottom: 1px solid var(--color-highlight);
    height: 2rem;
    padding: 0 1rem;
    position: relative;
    z-index: 20;
  }

  main {
    background-color: var(--color-document);
    border-radius: 0 0 var(--radius-lg) var(--radius-lg);
    position: relative;
    z-index: 10;
  }
</style>
