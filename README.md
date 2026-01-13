# Svelte Garden Component API

A Svelte 5 implementation of the Zendesk Garden design system.

> [!NOTE]
> This package was built with the assistance of AI coding tools.

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Theming](#theming)
- [Components](#components)
  - [Buttons](#buttons)
  - [Forms](#forms)
  - [Typography](#typography)
  - [Layout](#layout)
  - [Navigation](#navigation)
  - [Data Display](#data-display)
  - [Feedback](#feedback)
  - [Overlays](#overlays)
  - [Utilities](#utilities)

---

## Installation

```bash
npm install github:dgarfias/svelte-garden
```

## Quick Start

```svelte
<script>
  import { ThemeProvider } from 'svelte-garden/theming';
  import { Button } from 'svelte-garden/buttons';
</script>

<ThemeProvider>
  <Button isPrimary>Click me</Button>
</ThemeProvider>
```

---

## Theming

### ThemeProvider

Wraps your application and provides theme context and CSS custom properties.

```svelte
<ThemeProvider colorScheme="light" rtl={false}>
  <App />
</ThemeProvider>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `theme` | `GardenTheme` | Default theme | Custom theme configuration |
| `colorScheme` | `'light' \| 'dark'` | `'light'` | Color scheme |
| `rtl` | `boolean` | `false` | Right-to-left text direction |
| `includeReset` | `boolean` | `true` | Apply CSS reset styles |

### Color Variables

The theme provides CSS custom properties for colors:

- `--garden-color-background-*` - Background colors
- `--garden-color-foreground-*` - Text/foreground colors
- `--garden-color-border-*` - Border colors

---

## Components

### Buttons

#### Button

```svelte
<Button isPrimary size="medium" onclick={handleClick}>
  Click me
</Button>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Button size |
| `isPrimary` | `boolean` | `false` | Primary button styling |
| `isDanger` | `boolean` | `false` | Danger button styling |
| `isNeutral` | `boolean` | `false` | Neutral button styling |
| `isBasic` | `boolean` | `false` | Basic button styling |
| `isLink` | `boolean` | `false` | Link button styling |
| `isPill` | `boolean` | `false` | Pill-shaped button |
| `isStretched` | `boolean` | `false` | Full-width button |
| `focusInset` | `boolean` | `false` | Inset focus ring |
| `disabled` | `boolean` | `false` | Disabled state |

#### IconButton

```svelte
<IconButton aria-label="Settings" isPrimary>
  <SettingsIcon />
</IconButton>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Button size |
| `isPrimary` | `boolean` | `false` | Primary styling |
| `isDanger` | `boolean` | `false` | Danger styling |
| `isRotated` | `boolean` | `false` | Rotate icon 180° |
| `isNeutral` | `boolean` | `false` | Neutral styling |
| `isBasic` | `boolean` | `false` | Basic styling |
| `isPill` | `boolean` | `false` | Pill-shaped |

#### ToggleButton

```svelte
<ToggleButton isPressed={isActive} onclick={toggle}>
  Bold
</ToggleButton>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isPressed` | `boolean \| 'mixed'` | `false` | Toggle state |
| _...all Button props_ | | | |

#### Anchor

```svelte
<Anchor href="/page" isExternal>External Link</Anchor>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string` | - | Link URL |
| `isDanger` | `boolean` | `false` | Danger styling |
| `isExternal` | `boolean` | `false` | External link (adds icon) |
| `isUnderlined` | `boolean` | `false` | Underlined styling |
| `externalIconLabel` | `string` | `'Opens in new tab'` | Screen reader label |

---

### Forms

#### Field

Container for form inputs with label, hint, and message.

```svelte
<Field>
  <Label>Email</Label>
  <Hint>We'll never share your email</Hint>
  <Input type="email" placeholder="you@example.com" />
  <Message validation="error">Invalid email address</Message>
</Field>
```

#### Input

```svelte
<Input type="text" placeholder="Enter text" validation="success" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `string` | `'text'` | Input type |
| `validation` | `'success' \| 'warning' \| 'error'` | - | Validation state |
| `isCompact` | `boolean` | `false` | Compact size |
| `isBare` | `boolean` | `false` | Remove border/background |
| `focusInset` | `boolean` | `false` | Inset focus ring |
| `disabled` | `boolean` | `false` | Disabled state |

#### Textarea

```svelte
<Textarea placeholder="Enter description" minRows={3} maxRows={10} />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `validation` | `'success' \| 'warning' \| 'error'` | - | Validation state |
| `isCompact` | `boolean` | `false` | Compact size |
| `isResizable` | `boolean` | `false` | Allow manual resize |
| `minRows` | `number` | - | Minimum rows |
| `maxRows` | `number` | - | Maximum rows |

#### Checkbox

```svelte
<Checkbox checked={isChecked} onchange={handleChange}>
  Accept terms
</Checkbox>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | `false` | Checked state |
| `indeterminate` | `boolean` | `false` | Indeterminate state |
| `validation` | `'success' \| 'warning' \| 'error'` | - | Validation state |
| `isCompact` | `boolean` | `false` | Compact size |
| `disabled` | `boolean` | `false` | Disabled state |

#### Radio

```svelte
<Radio name="choice" value="option1" checked>Option 1</Radio>
<Radio name="choice" value="option2">Option 2</Radio>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | - | Radio group name |
| `value` | `string` | - | Radio value |
| `checked` | `boolean` | `false` | Checked state |
| `validation` | `'success' \| 'warning' \| 'error'` | - | Validation state |
| `isCompact` | `boolean` | `false` | Compact size |
| `disabled` | `boolean` | `false` | Disabled state |

#### Toggle

```svelte
<Toggle checked={isEnabled} onchange={handleToggle}>
  Enable notifications
</Toggle>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | `false` | Toggle state |
| `validation` | `'success' \| 'warning' \| 'error'` | - | Validation state |
| `isCompact` | `boolean` | `false` | Compact size |
| `disabled` | `boolean` | `false` | Disabled state |

#### Select

```svelte
<Select validation="success">
  <option value="">Select option</option>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
</Select>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `validation` | `'success' \| 'warning' \| 'error'` | - | Validation state |
| `isCompact` | `boolean` | `false` | Compact size |
| `isBare` | `boolean` | `false` | Remove border/background |
| `focusInset` | `boolean` | `false` | Inset focus ring |
| `disabled` | `boolean` | `false` | Disabled state |

#### Range

```svelte
<Range min={0} max={100} value={50} hasLowerTrack />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `min` | `number` | `0` | Minimum value |
| `max` | `number` | `100` | Maximum value |
| `step` | `number` | `1` | Step value |
| `value` | `number` | - | Current value |
| `hasLowerTrack` | `boolean` | `false` | Show progress track |
| `disabled` | `boolean` | `false` | Disabled state |

#### FileUpload

```svelte
<FileUpload accept="image/*" multiple onchange={handleFiles}>
  <span>Drop files here or click to upload</span>
</FileUpload>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `accept` | `string` | - | Accepted file types |
| `multiple` | `boolean` | `false` | Allow multiple files |
| `isDragging` | `boolean` | `false` | Dragging state |
| `isCompact` | `boolean` | `false` | Compact size |
| `disabled` | `boolean` | `false` | Disabled state |

---

### Typography

#### Heading

```svelte
<Heading level={1} size="xxl">Page Title</Heading>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `level` | `1 \| 2 \| 3 \| 4 \| 5 \| 6` | `1` | HTML heading level |
| `size` | `'xxxl' \| 'xxl' \| 'xl' \| 'lg' \| 'md' \| 'sm' \| 'xs'` | - | Visual size |
| `isTruncated` | `boolean` | `false` | Truncate with ellipsis |
| `isBold` | `boolean` | `false` | Bold weight |

#### Paragraph

```svelte
<Paragraph size="medium">Body text content here.</Paragraph>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Visual size |
| `isBold` | `boolean` | `false` | Bold weight |
| `isTruncated` | `boolean` | `false` | Truncate with ellipsis |

#### Code

```svelte
<Code>const x = 1;</Code>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Visual size |
| `hue` | `string` | - | Color hue |

#### CodeBlock

```svelte
<CodeBlock isNumbered highlightLines={[2, 3]}>
{`function hello() {
  console.log('Hello');
  return true;
}`}
</CodeBlock>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Visual size |
| `isNumbered` | `boolean` | `false` | Show line numbers |
| `highlightLines` | `number[]` | `[]` | Lines to highlight |
| `isLight` | `boolean` | `false` | Light mode |

---

### Layout

#### Grid, Row, Col

Responsive grid system based on flexbox.

```svelte
<Grid columns={12} gutters="md">
  <Row>
    <Col md={6}>Left column</Col>
    <Col md={6}>Right column</Col>
  </Row>
</Grid>
```

**Grid Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `number \| string` | `12` | Number of columns |
| `gutters` | `'xxs' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'xxl' \| false` | `'md'` | Gutter width |
| `debug` | `boolean` | `false` | Show debug highlighting |

**Col Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number \| string` | - | Column span (all sizes) |
| `xs` | `number \| string \| boolean` | - | Span on xs screens |
| `sm` | `number \| string \| boolean` | - | Span on sm screens |
| `md` | `number \| string \| boolean` | - | Span on md screens |
| `lg` | `number \| string \| boolean` | - | Span on lg screens |
| `xl` | `number \| string \| boolean` | - | Span on xl screens |
| `offset` | `number \| string` | - | Column offset |
| `order` | `number \| string` | - | Flex order |

---

### Navigation

#### Tabs

```svelte
<Tabs selectedIndex={0} onChange={(i) => selectedIndex = i}>
  <TabList>
    <Tab>Tab 1</Tab>
    <Tab>Tab 2</Tab>
  </TabList>
  <TabPanel>Content 1</TabPanel>
  <TabPanel>Content 2</TabPanel>
</Tabs>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `selectedIndex` | `number` | `0` | Selected tab index |
| `isVertical` | `boolean` | `false` | Vertical tabs |
| `onChange` | `(index: number) => void` | - | Tab change handler |

#### Breadcrumb

```svelte
<Breadcrumb>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/products">Products</BreadcrumbItem>
  <BreadcrumbItem isCurrent>Current Page</BreadcrumbItem>
</Breadcrumb>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isCurrent` | `boolean` | `false` | Current page indicator |

#### Pagination

```svelte
<OffsetPagination 
  currentPage={1} 
  totalPages={10} 
  onChange={(page) => currentPage = page} 
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `currentPage` | `number` | **required** | Current page (1-based) |
| `totalPages` | `number` | **required** | Total number of pages |
| `pagePadding` | `number` | `2` | Pages around current |
| `pageGap` | `number` | `2` | Gap indicator position |
| `onChange` | `(page: number) => void` | - | Page change handler |

---

### Data Display

#### Table

```svelte
<Table size="medium" isStriped isHoverable>
  <Head>
    <Row>
      <HeaderCell>Name</HeaderCell>
      <HeaderCell sortDirection="asc">Date</HeaderCell>
    </Row>
  </Head>
  <Body>
    <Row>
      <Cell>John</Cell>
      <Cell>2024-01-01</Cell>
    </Row>
  </Body>
</Table>
```

**Table Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Table size |
| `isStriped` | `boolean` | `false` | Striped rows |
| `isHoverable` | `boolean` | `false` | Hoverable rows |
| `isBordered` | `boolean` | `false` | Show borders |

**HeaderCell Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `sortDirection` | `'asc' \| 'desc' \| null` | - | Sort direction |
| `isSortable` | `boolean` | `false` | Enable sorting |
| `width` | `string \| number` | - | Column width |
| `isTruncated` | `boolean` | `false` | Truncate content |

#### Avatar

```svelte
<Avatar src="/user.jpg" size="medium" status="available" />
<Avatar text="JD" backgroundColor="#1f73b7" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'extraextrasmall' \| 'extrasmall' \| 'small' \| 'medium' \| 'large'` | `'medium'` | Avatar size |
| `src` | `string` | - | Image source URL |
| `alt` | `string` | - | Image alt text |
| `text` | `string` | - | Text/initials to display |
| `status` | `'available' \| 'away' \| 'transfers' \| 'offline' \| 'active'` | - | Status indicator |
| `badge` | `string \| number` | - | Badge content |
| `isSystem` | `boolean` | `false` | System/bot avatar (square) |
| `backgroundColor` | `string` | - | Custom background color |
| `foregroundColor` | `string` | - | Custom text color |
| `surfaceColor` | `string` | - | Status ring color |

#### Tag

```svelte
<Tag hue="blue" size="medium" isPill>
  Label
  <TagClose onclick={handleRemove} />
</Tag>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Tag size |
| `hue` | `string` | - | Color hue |
| `isPill` | `boolean` | `false` | Pill shape |
| `isRound` | `boolean` | `false` | Round shape |
| `isRegular` | `boolean` | `false` | Regular weight text |

---

### Feedback

#### Alert

```svelte
<Alert type="success" title="Success!">
  Your changes have been saved.
</Alert>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | Alert type |
| `title` | `string` | - | Alert title |
| `isDismissible` | `boolean` | `true` | Show dismiss button |
| `onDismiss` | `() => void` | - | Dismiss callback |

#### Notification

```svelte
<Notification type="info" title="Update Available">
  A new version is ready to install.
</Notification>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | Notification type |
| `title` | `string` | - | Notification title |
| `isDismissible` | `boolean` | `true` | Show dismiss button |
| `onDismiss` | `() => void` | - | Dismiss callback |

#### Toast

```svelte
<Toast type="success" title="Saved!" duration={5000}>
  Your changes have been saved.
</Toast>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | Toast type |
| `title` | `string` | - | Toast title |
| `isDismissible` | `boolean` | `true` | Show dismiss button |
| `duration` | `number` | `5000` | Auto-hide duration (ms), 0 = no auto-hide |
| `onDismiss` | `() => void` | - | Dismiss callback |

#### Loaders

##### Spinner

```svelte
<Spinner size="medium" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'small' \| 'medium' \| 'large' \| number` | `'medium'` | Spinner size |
| `color` | `string` | - | Custom color |
| `duration` | `number` | `1250` | Animation duration (ms) |

##### Dots

```svelte
<Dots size="medium" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'small' \| 'medium' \| 'large' \| number` | `'medium'` | Dots size |
| `color` | `string` | - | Custom color |
| `delayMS` | `number` | `750` | Delay before showing |

##### Skeleton

```svelte
<Skeleton width="200px" height="20px" />
<Skeleton width={40} height={40} isRound />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `width` | `string \| number` | `'100%'` | Skeleton width |
| `height` | `string \| number` | `'16px'` | Skeleton height |
| `isRound` | `boolean` | `false` | Circular skeleton |

##### Progress

```svelte
<Progress value={75} size="medium" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | `0` | Progress value (0-100) |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Progress bar size |
| `color` | `string` | - | Custom color |

---

### Overlays

#### Modal

```svelte
<Modal isOpen={showModal} onClose={() => showModal = false}>
  <ModalHeader>Modal Title</ModalHeader>
  <ModalBody>Modal content here</ModalBody>
  <ModalFooter>
    <Button onclick={() => showModal = false}>Cancel</Button>
    <Button isPrimary>Confirm</Button>
  </ModalFooter>
</Modal>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | `false` | Modal visibility |
| `onClose` | `() => void` | - | Close callback |
| `isCentered` | `boolean` | `false` | Vertically center modal |
| `isLarge` | `boolean` | `false` | Large modal (768px vs 576px) |
| `isAnimated` | `boolean` | `true` | Enable animations |
| `focusOnMount` | `boolean` | `true` | Focus modal on open |
| `restoreFocus` | `boolean` | `true` | Restore focus on close |

#### Tooltip

```svelte
<Tooltip content="Helpful information" placement="top">
  <Button>Hover me</Button>
</Tooltip>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `string` | **required** | Tooltip text |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right' \| ...` | `'top'` | Tooltip position |
| `size` | `'small' \| 'medium' \| 'large' \| 'extra-large'` | `'medium'` | Tooltip size |
| `type` | `'light' \| 'dark'` | `'dark'` | Tooltip type |
| `hasArrow` | `boolean` | `true` | Show arrow |
| `delayShow` | `number` | `500` | Show delay (ms) |
| `delayHide` | `number` | `0` | Hide delay (ms) |

#### Menu

```svelte
<Menu isExpanded={menuOpen} placement="bottom-start" onClose={() => menuOpen = false}>
  <MenuTrigger>
    <Button onclick={() => menuOpen = !menuOpen}>Open Menu</Button>
  </MenuTrigger>
  <MenuItem onSelect={() => handleSelect('edit')}>Edit</MenuItem>
  <MenuItem onSelect={() => handleSelect('delete')} type="danger">Delete</MenuItem>
</Menu>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isExpanded` | `boolean` | `false` | Menu visibility |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right' \| ...` | `'bottom-start'` | Menu position |
| `onClose` | `() => void` | - | Close callback |
| `hasArrow` | `boolean` | `false` | Show arrow |
| `maxHeight` | `string` | - | Maximum height |

---

### Utilities

#### Accordion

```svelte
<Accordion isExpandable isBordered>
  <AccordionSection>
    <AccordionHeader>Section 1</AccordionHeader>
    <AccordionPanel>Content 1</AccordionPanel>
  </AccordionSection>
  <AccordionSection>
    <AccordionHeader>Section 2</AccordionHeader>
    <AccordionPanel>Content 2</AccordionPanel>
  </AccordionSection>
</Accordion>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isExpandable` | `boolean` | `false` | Allow multiple sections open |
| `isBordered` | `boolean` | `false` | Show borders |
| `isCompact` | `boolean` | `false` | Compact spacing |
| `isCollapsible` | `boolean` | `true` | Allow full collapse |
| `level` | `1-6` | `3` | Heading level |

#### ColorPicker

```svelte
<ColorPicker color="#1f73b7" onchange={handleColorChange} />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `string \| IColor` | - | Current color (controlled) |
| `defaultColor` | `string \| IColor` | - | Default color (uncontrolled) |
| `isOpaque` | `boolean` | `false` | Hide alpha controls |

#### DatePicker

```svelte
<DatePicker value={selectedDate} onchange={(d) => selectedDate = d} />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `Date` | - | Selected date |
| `placeholder` | `string` | - | Placeholder text |
| `minValue` | `Date` | - | Minimum date |
| `maxValue` | `Date` | - | Maximum date |
| `locale` | `string` | - | Locale code |
| `weekStartsOn` | `0-6` | - | Week start day |
| `disabled` | `boolean` | `false` | Disabled state |

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Apache-2.0
