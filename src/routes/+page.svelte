<script>
  import "../app.css";

  import image from "$lib/images/test.png";
  import Window from "@components/window.svelte";
  import MenuBar from "@components/menu/bar.svelte";
  /* Button */
  import Button from "@components/button.svelte";

  /** AnatomyKit */
  /* Avatar */
  import Avatar from "@components/avatar/avatar.svelte";
  import AvatarImage from "@components/avatar/image.svelte";
  import AvatarFallback from "@components/avatar/fallback.svelte";
  /* Menus */
  import Menu from "@components/menu/menu.svelte";
  import MenuItem from "@components/menu/item.svelte";
  /* Dialog */
  import Dialog from "@components/dialog/dialog.svelte";
  import DialogButton from "@components/dialog/button.svelte";
  import DialogContent from "@components/dialog/content.svelte";
  import DialogTitle from "@components/dialog/title.svelte";
  import DialogDescription from "@components/dialog/description.svelte";
  /* AlertDialog */
  import AlertDialog from "@components/alertdialog/dialog.svelte";
  import AlertDialogButton from "@components/alertdialog/button.svelte";
  import AlertDialogContent from "@components/alertdialog/content.svelte";
  import AlertDialogTitle from "@components/alertdialog/title.svelte";
  import AlertDialogDescription from "@components/alertdialog/description.svelte";
  /* Progress */
  import Progress from "@components/progress.svelte";
  /* Separator */
  import Separator from "@components/separator.svelte";
  /* Slider */
  import Slider from "@components/slider/slider.svelte";
  import SliderTrack from "@components/slider/track.svelte";
  import SliderRange from "@components/slider/range.svelte";
  import SliderThumb from "@components/slider/thumb.svelte";
  /* Switch */
  import Switch from "@components/switch/switch.svelte";
  /* Tooltip */
  import Tooltip from "@components/tooltip/tooltip.svelte";
  /* Toggle */
  import Toggle from "@components/toggle/toggle.svelte";
  import ToggleGroup from "@components/toggle/group.svelte";
  /* Accordion */
  import Accordion from "@components/accordion/accordion.svelte";
  import AccordionItem from "@components/accordion/item.svelte";
  import AccordionTrigger from "@components/accordion/trigger.svelte";
  import AccordionContent from "@components/accordion/content.svelte";
  /* Tabs */
  import Tabs from "@components/tabs/tabs.svelte";
  import TabsList from "@components/tabs/list.svelte";
  import TabsTrigger from "@components/tabs/trigger.svelte";
  import TabsContent from "@components/tabs/content.svelte";
  /* Select */
  import Select from "@components/select/select.svelte";
  import SelectContent from "@components/select/content.svelte";
  import SelectTrigger from "@components/select/trigger.svelte";
  import SelectLabel from "@components/select/label.svelte";
  import SelectGroup from "@components/select/group.svelte";
  import SelectOption from "@components/select/option.svelte";
  import SelectSeparator from "@components/select/separator.svelte";
  /* Toolbar */
  import Toolbar from "@components/toolbar/toolbar.svelte";
  /* Collapsible */
  import Collapsible from "@components/collapsible/collapsible.svelte";
  import CollapsibleTrigger from "@components/collapsible/trigger.svelte";
  import CollapsibleContent from "@components/collapsible/content.svelte";

  let sliderValue = 3;
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
  <Window title="System Disk" width={576} height={700} left={100} top={50}>
    <Avatar>
      <AvatarImage src={image} alt="Finder graphic" />
      <AvatarFallback>DW</AvatarFallback>
    </Avatar>

    <Dialog>
      <DialogButton>About</DialogButton>

      <DialogContent>
        <DialogTitle>Title</DialogTitle>

        <DialogDescription>This is a retro playground</DialogDescription>
      </DialogContent>
    </Dialog>

    <AlertDialog>
      <AlertDialogButton>Destroy</AlertDialogButton>

      <AlertDialogContent>
        <AlertDialogTitle>Destroy everything?</AlertDialogTitle>

        <AlertDialogDescription>Do it!</AlertDialogDescription>
      </AlertDialogContent>
    </AlertDialog>

    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label style:width="12rem" style:display="block">
      <span>Volume</span>

      <Slider
        name="volume"
        step={0.1}
        min={1}
        max={7}
        value={sliderValue}
        onChange={(value) => {
          sliderValue = value;
          console.log(value);
        }}>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>

        <SliderThumb aria-label="Volume" />
      </Slider>
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

    <Collapsible>
      <span>more info</span>

      <CollapsibleTrigger>show</CollapsibleTrigger>

      <p>item one</p>

      <CollapsibleContent>
        <p>item two</p>
        <p>item three</p>
      </CollapsibleContent>
    </Collapsible>
  </Window>

  <Window title="Finder" width={476} height={700} left={776} top={50}>
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

    <div style:height="30px" />

    <Toolbar label="Toolbar items">
      <Toggle>Bold</Toggle>
      <Toggle>Italic</Toggle>
      <Toggle>Underline</Toggle>
    </Toolbar>
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
    background-color: var(--color-canvas);
    border-radius: var(--radius-lg) var(--radius-lg) 0 0;
    border-bottom: 1px solid black;
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
