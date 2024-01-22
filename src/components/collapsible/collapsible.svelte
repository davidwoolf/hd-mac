<script>
  import { collapsible } from "@components/anatomykit/collapsible";

  export let defaultOpen = false;
  export let disabled = false;
  export let open = false;
  /** @type {((state: boolean) => void) | undefined}*/
  export let onChange = undefined;
</script>

<div
  use:collapsible={{
    defaultOpen,
    disabled,
    open,
    onChange,
  }}>
  <slot />
</div>
