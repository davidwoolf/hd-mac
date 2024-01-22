<script>
  import { menubar, role } from "@components/anatomykit/menubar.js";
</script>

<ul use:menubar class="menubar" {role}>
  <slot />
</ul>

<style>
  .menubar {
    align-items: stretch;
    display: flex;
    height: 100%;
  }

  :global(.menubar li) {
    align-items: stretch;
    display: flex;
    position: relative;
  }
</style>
