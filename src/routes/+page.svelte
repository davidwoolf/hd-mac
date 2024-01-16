<script>
  import Window from "@components/window.svelte";
  import MenuBar from "@components/menu/bar.svelte";

  /* AnatomyKit */
  import Button from "@components/button.svelte";
  import Menu from "@components/menu/menu.svelte";
  import MenuItem from "@components/menu/item.svelte";
  import Dialog from "@components/dialog/dialog.svelte";
  import DialogButton from "@components/dialog/button.svelte";
  import DialogContent from "@components/dialog/content.svelte";
  import Progress from "@components/progress.svelte";
  import Separator from "@components/separator.svelte";
  import Slider from "@components/slider/slider.svelte";
  import Switch from "@components/switch/switch.svelte";
  import Tooltip from "@components/tooltip/tooltip.svelte";
  import "../app.css";
</script>

<header>
  <MenuBar>
    <Menu label="">
      <MenuItem>About</MenuItem>
      <MenuItem>Version</MenuItem>
      <MenuItem>License</MenuItem>
    </Menu>

    <Menu label="File">
      <MenuItem>Open</MenuItem>
      <MenuItem>Close</MenuItem>
      <MenuItem>Print</MenuItem>
    </Menu>

    <Menu label="Edit" />
    <Menu label="View" />
    <Menu label="Special" />
  </MenuBar>
</header>

<main>
  <Window title="System Disk" width={576} height={500}>
    <Dialog>
      <DialogButton>About</DialogButton>

      <DialogContent>
        <p>This is a retro playground</p>
      </DialogContent>
    </Dialog>

    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label style:width="12rem" style:display="block">
      <span>Volume</span>

      <Slider
        name="volumn"
        min={1}
        max={7}
        value={3}
        showIndicators={true}
        onUpdate={(value) => {
          console.log(value);
        }} />
    </label>

    <div style:height="30px" />
    <Progress value={50} />
    <div style:height="30px" />
    <Separator />
    <div style:height="30px" />
    <Switch />
    <div style:height="30px" />
    <Tooltip>
      <svelte:fragment slot="info">I am a tooltip</svelte:fragment>
      <div slot="content">
        <Button>click me</Button>
      </div>
    </Tooltip>
    <div style:height="30px" />
  </Window>
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
