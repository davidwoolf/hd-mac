<script>
  import { tabs } from "./action";
</script>

<!-- 
  requirements 
  - dir
-->
<div
  use:tabs={{
    value: true, // remove
  }}>
  <slot />
</div>
