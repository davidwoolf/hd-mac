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
  import Toggle from "@components/toggle/toggle.svelte";
  import ToggleGroup from "@components/toggle/group.svelte";
  import Accordion from "@components/accordion/accordion.svelte";
  import AccordionItem from "@components/accordion/item.svelte";
  import AccordionTrigger from "@components/accordion/trigger.svelte";
  import AccordionContent from "@components/accordion/content.svelte";

  import Tabs from "@components/tabs/tabs.svelte";
  import TabsList from "@components/tabs/list.svelte";
  import TabsTrigger from "@components/tabs/trigger.svelte";
  import TabsContent from "@components/tabs/content.svelte";

  // Select
  import Select from "@components/select/select.svelte";
  import SelectContent from "@components/select/content.svelte";
  import SelectTrigger from "@components/select/trigger.svelte";
  import SelectLabel from "@components/select/label.svelte";
  import SelectGroup from "@components/select/group.svelte";
  import SelectOption from "@components/select/option.svelte";
  import SelectSeparator from "@components/select/separator.svelte";
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
  <Window title="System Disk" width={576} height={500} left={100} top={50}>
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
        onUpdate={(value) => {}} />
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
    <ToggleGroup>
      <Toggle value={false}>press me</Toggle>
      <Toggle value={false}>press me</Toggle>
    </ToggleGroup>
  </Window>

  <Window title="Finder" width={476} height={500} left={776} top={50}>
    <Accordion>
      <AccordionItem>
        <AccordionTrigger>Item 1</AccordionTrigger>
        <AccordionContent>I am the first content</AccordionContent>
      </AccordionItem>

      <AccordionItem>
        <AccordionTrigger>Item 1</AccordionTrigger>
        <AccordionContent>I am the second content</AccordionContent>
      </AccordionItem>

      <AccordionItem>
        <AccordionTrigger>Item 1</AccordionTrigger>
        <AccordionContent>I am the third content</AccordionContent>
      </AccordionItem>
    </Accordion>

    <div style:height="30px" />

    <Tabs>
      <TabsList aria-label="Tabs example">
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>

        <TabsTrigger value="tab2">Tab 2</TabsTrigger>

        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
      </TabsList>

      <TabsContent value="tab1">
        <p>Tab 1</p>
      </TabsContent>

      <TabsContent value="tab2">
        <p>Tab 2</p>
      </TabsContent>

      <TabsContent value="tab3">
        <p>Tab 3</p>
      </TabsContent>
    </Tabs>

    <div style:height="30px" />

    <Select>
      <SelectTrigger>Open menu</SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>Group one</SelectLabel>
          <SelectOption value="apple">Apple</SelectOption>
          <SelectOption value="pear">Pear</SelectOption>
        </SelectGroup>

        <SelectSeparator />

        <SelectGroup>
          <SelectLabel>Group two</SelectLabel>
          <SelectOption value="broccoli">Broccoli</SelectOption>
          <SelectOption value="squash">Squash</SelectOption>
        </SelectGroup>
      </SelectContent>
    </Select>
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
