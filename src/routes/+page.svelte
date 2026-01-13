<script lang="ts">
    // ============================================================================
    // SVELTE GARDEN - COMPONENT SHOWCASE
    // ============================================================================

    // -- BUTTONS --
    import {
        Button,
        IconButton,
        ToggleButton,
        ToggleIconButton,
        SplitButton,
        Anchor,
    } from "$lib/buttons";

    // -- FORMS --
    import {
        Field,
        Fieldset,
        Legend,
        Label,
        Hint,
        Message,
        Input,
        MediaInput,
        FauxInput,
        Textarea,
        Select,
        Checkbox,
        Radio,
        Toggle,
        Range,
        FileUpload,
        FileList,
        FileListItem,
        File,
        FileClose,
        FileDelete,
        Tiles,
        Tile,
        TileIcon,
        TileLabel,
        TileDescription,
    } from "$lib/forms";

    // -- MODALS --
    import {
        Modal,
        ModalHeader,
        ModalBody,
        ModalFooter,
        ModalClose,
    } from "$lib/modals";

    // -- DROPDOWNS --
    import { Menu, MenuItem, MenuSeparator } from "$lib/dropdowns";

    // -- AVATARS --
    import { Avatar } from "$lib/avatars";

    // -- TAGS --
    import { Tag, TagClose, TagAvatar } from "$lib/tags";

    // -- LOADERS --
    import { Spinner, Dots, Skeleton, Progress, Inline } from "$lib/loaders";

    // -- TYPOGRAPHY --
    import {
        Heading,
        Paragraph,
        Span,
        Code,
        CodeBlock,
        Blockquote,
        OrderedList,
        UnorderedList,
    } from "$lib/typography";

    // -- BREADCRUMBS --
    import { Breadcrumb, BreadcrumbItem } from "$lib/breadcrumbs";

    // -- TABS --
    import { Tabs, TabList, Tab, TabPanel } from "$lib/tabs";

    // -- NOTIFICATIONS --
    import { Alert, Notification, Toast } from "$lib/notifications";

    // -- TOOLTIPS --
    import { Tooltip } from "$lib/tooltips";

    // -- TABLES --
    import {
        Table,
        TableHead,
        TableBody,
        TableRow,
        TableHeaderCell,
        TableCell,
        Caption,
    } from "$lib/tables";

    // -- ACCORDIONS --
    import {
        Accordion,
        AccordionSection,
        AccordionHeader,
        AccordionPanel,
    } from "$lib/accordions";

    // -- GRID --
    import { Grid, Row, Col } from "$lib/grid";

    // -- PAGINATION --
    import {
        OffsetPagination,
        CursorPagination,
        CursorFirst,
        CursorPrevious,
        CursorNext,
        CursorLast,
    } from "$lib/pagination";

    // -- COLOR PICKERS --
    import { ColorPicker, ColorSwatch, type IColor } from "$lib/colorpickers";

    // -- DATE PICKERS --
    import { Calendar, DatePicker } from "$lib/datepickers";

    // -- DRAGGABLE --
    import {
        Draggable,
        DraggableGrip,
        DraggableContent,
        DraggableList,
        Dropzone,
    } from "$lib/draggable";

    // ============================================================================
    // STATE
    // ============================================================================

    // Navigation
    const sections = [
        { id: "buttons", label: "Buttons" },
        { id: "forms", label: "Forms" },
        { id: "typography", label: "Typography" },
        { id: "avatars", label: "Avatars" },
        { id: "tags", label: "Tags" },
        { id: "loaders", label: "Loaders" },
        { id: "notifications", label: "Notifications" },
        { id: "modals", label: "Modals" },
        { id: "dropdowns", label: "Dropdowns" },
        { id: "tooltips", label: "Tooltips" },
        { id: "breadcrumbs", label: "Breadcrumbs" },
        { id: "tabs", label: "Tabs" },
        { id: "accordions", label: "Accordions" },
        { id: "tables", label: "Tables" },
        { id: "grid", label: "Grid" },
        { id: "pagination", label: "Pagination" },
        { id: "colorpickers", label: "Color Pickers" },
        { id: "datepickers", label: "Date Pickers" },
        { id: "draggable", label: "Draggable" },
    ];

    // Buttons
    let isTogglePressed = $state(false);
    let isIconTogglePressed = $state(false);

    // Forms
    let inputValue = $state("");
    let textareaValue = $state("");
    let selectValue = $state("");
    let checkboxChecked = $state(false);
    let radioValue = $state("option1");
    let toggleChecked = $state(false);
    let rangeValue = $state(50);
    let tileValue = $state("tile1");

    // Modals
    let showModal = $state(false);
    let showDangerModal = $state(false);

    // Dropdowns
    let showMenu = $state(false);

    // Tabs
    let activeTab = $state(0);

    // Notifications
    let showToast = $state(false);

    // Accordions
    let accordionState = $state<Record<string, boolean>>({
        section1: true,
        section2: false,
        section3: false,
    });

    // Pagination
    let currentPage = $state(1);
    let cursorPage = $state(5);

    // Color Pickers
    let selectedColor = $state<IColor | undefined>(undefined);
    let swatchRow = $state<number | null>(null);
    let swatchCol = $state<number | null>(null);

    // Date Pickers
    let selectedDate = $state<Date | undefined>(undefined);
    let calendarDate = $state<Date | undefined>(undefined);

    // Loaders
    let progressValue = $state(65);

    // ============================================================================
    // DATA
    // ============================================================================

    const swatchColors = [
        [
            { value: "#e35b66", label: "Red" },
            { value: "#ffb648", label: "Yellow" },
            { value: "#30aabc", label: "Teal" },
            { value: "#5293c7", label: "Blue" },
            { value: "#b4a7c7", label: "Purple" },
        ],
        [
            { value: "#f5d5d8", label: "Red Light" },
            { value: "#fff0db", label: "Yellow Light" },
            { value: "#cef0f7", label: "Teal Light" },
            { value: "#cee2f2", label: "Blue Light" },
            { value: "#e7e0ed", label: "Purple Light" },
        ],
    ];

    const tableData = [
        { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
        {
            id: 2,
            name: "Jane Smith",
            email: "jane@example.com",
            role: "Editor",
        },
        { id: 3, name: "Bob Wilson", email: "bob@example.com", role: "Viewer" },
    ];

    // ============================================================================
    // ICONS (inline SVGs)
    // ============================================================================

    const icons = {
        settings: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M13.5 8c0-.56-.06-1.1-.17-1.62l1.72-1.27a.5.5 0 00.12-.64l-1.64-2.84a.5.5 0 00-.61-.22l-2.03.82a6.05 6.05 0 00-1.4-.8L9.18.42A.5.5 0 008.68 0H5.32a.5.5 0 00-.5.42l-.31 2.01c-.51.21-.98.48-1.4.8l-2.03-.82a.5.5 0 00-.61.22L.84 5.47a.5.5 0 00.12.64l1.72 1.27A6.18 6.18 0 002.5 8c0 .56.06 1.1.17 1.62l-1.72 1.27a.5.5 0 00-.12.64l1.64 2.84a.5.5 0 00.61.22l2.03-.82c.42.32.89.59 1.4.8l.31 2.01a.5.5 0 00.5.42h3.36a.5.5 0 00.5-.42l.31-2.01c.51-.21.98-.48 1.4-.8l2.03.82a.5.5 0 00.61-.22l1.64-2.84a.5.5 0 00-.12-.64l-1.72-1.27c.11-.52.17-1.06.17-1.62zM7 10.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"/></svg>`,
        plus: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1a1 1 0 011 1v5h5a1 1 0 110 2H9v5a1 1 0 11-2 0V9H2a1 1 0 110-2h5V2a1 1 0 011-1z"/></svg>`,
        trash: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M10 1H6a1 1 0 00-1 1v1H2a1 1 0 000 2h1v9a1 1 0 001 1h8a1 1 0 001-1V5h1a1 1 0 100-2h-3V2a1 1 0 00-1-1zm-4 3h4V3H6v1zm5 2H5v8h6V6z"/></svg>`,
        chevronDown: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><path d="M6 8.5l-4-4h8l-4 4z"/></svg>`,
        star: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0l2.47 5.01L16 5.82l-4 3.9.94 5.5L8 12.77l-4.94 2.45.94-5.5-4-3.9 5.53-.81L8 0z"/></svg>`,
        search: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M11.742 10.344a6.5 6.5 0 10-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 001.415-1.414l-3.85-3.85a1.007 1.007 0 00-.115-.1zM12 6.5a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0z"/></svg>`,
        user: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 8a4 4 0 100-8 4 4 0 000 8zm0 1c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`,
        mail: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M0 3v10h16V3H0zm1.4 1h13.2L8 8.5 1.4 4zM1 12V5.1l7 4.5 7-4.5V12H1z"/></svg>`,
        phone: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M3.654 1.328a.678.678 0 00-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 004.168 6.608 17.569 17.569 0 006.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 00-.063-1.015l-2.307-1.794a.678.678 0 00-.58-.122l-2.19.547a1.745 1.745 0 01-1.657-.459L5.482 8.062a1.745 1.745 0 01-.459-1.657l.547-2.19a.678.678 0 00-.122-.58L3.654 1.328z"/></svg>`,
        document: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M9 0H3a1 1 0 00-1 1v14a1 1 0 001 1h10a1 1 0 001-1V5l-5-5zm3 14H4V2h4v4h4v8z"/></svg>`,
        image: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M14 1H2a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V2a1 1 0 00-1-1zM3 13l2.5-4 1.75 2.5 2.5-4L13 13H3zM11 6a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"/></svg>`,
    };
</script>

<div class="showcase">
    <!-- Navigation -->
    <nav class="nav">
        {#each sections as section}
            <a href="#{section.id}" class="nav-link">{section.label}</a>
        {/each}
    </nav>

    <!-- Content -->
    <div class="content">
        <!-- ================================================================== -->
        <!-- BUTTONS -->
        <!-- ================================================================== -->
        <section id="buttons" class="section">
            <h2 class="section-title">Buttons</h2>

            <div class="demo-block">
                <h3 class="demo-title">Button Variants</h3>
                <div class="demo-row">
                    <Button>Default</Button>
                    <Button isPrimary>Primary</Button>
                    <Button isDanger>Danger</Button>
                    <Button isNeutral>Neutral</Button>
                    <Button isBasic>Basic</Button>
                    <Button isLink>Link</Button>
                </div>
            </div>

            <div class="demo-block">
                <h3 class="demo-title">Button Sizes</h3>
                <div class="demo-row">
                    <Button size="small">Small</Button>
                    <Button size="medium">Medium</Button>
                    <Button size="large">Large</Button>
                </div>
            </div>

            <div class="demo-block">
                <h3 class="demo-title">Pill Buttons</h3>
                <div class="demo-row">
                    <Button isPill>Default Pill</Button>
                    <Button isPill isPrimary>Primary Pill</Button>
                    <Button isPill isDanger>Danger Pill</Button>
                </div>
            </div>

            <div class="demo-block">
                <h3 class="demo-title">Stretched Button</h3>
                <Button isStretched>Full Width Button</Button>
            </div>

            <div class="demo-block">
                <h3 class="demo-title">Disabled Buttons</h3>
                <div class="demo-row">
                    <Button disabled>Disabled</Button>
                    <Button isPrimary disabled>Primary Disabled</Button>
                    <Button isDanger disabled>Danger Disabled</Button>
                </div>
            </div>

            <div class="demo-block">
                <h3 class="demo-title">Icon Buttons</h3>
                <div class="demo-row">
                    <IconButton aria-label="Settings"
                        >{@html icons.settings}</IconButton
                    >
                    <IconButton isPrimary aria-label="Add"
                        >{@html icons.plus}</IconButton
                    >
                    <IconButton isDanger aria-label="Delete"
                        >{@html icons.trash}</IconButton
                    >
                    <IconButton isBasic aria-label="Star"
                        >{@html icons.star}</IconButton
                    >
                    <IconButton isPill aria-label="Search"
                        >{@html icons.search}</IconButton
                    >
                </div>
            </div>

            <div class="demo-block">
                <h3 class="demo-title">Toggle Buttons</h3>
                <div class="demo-row">
                    <ToggleButton
                        isPressed={isTogglePressed}
                        onclick={() => (isTogglePressed = !isTogglePressed)}
                    >
                        {isTogglePressed ? "Pressed" : "Not Pressed"}
                    </ToggleButton>
                    <ToggleIconButton
                        isPressed={isIconTogglePressed}
                        onclick={() =>
                            (isIconTogglePressed = !isIconTogglePressed)}
                        aria-label="Favorite"
                    >
                        {@html icons.star}
                    </ToggleIconButton>
                    <span class="state-label"
                        >Toggle: {isTogglePressed}, Icon: {isIconTogglePressed}</span
                    >
                </div>
            </div>

            <div class="demo-block">
                <h3 class="demo-title">Split Button</h3>
                <div class="demo-row">
                    <SplitButton>
                        <Button isPrimary>Save</Button>
                        <IconButton isPrimary aria-label="More options"
                            >{@html icons.chevronDown}</IconButton
                        >
                    </SplitButton>
                </div>
            </div>

            <div class="demo-block">
                <h3 class="demo-title">Anchor Links</h3>
                <Paragraph>
                    Here is an <Anchor href="#">inline link</Anchor>, a <Anchor
                        href="#"
                        isDanger>danger link</Anchor
                    >, and an <Anchor href="https://example.com" isExternal
                        >external link</Anchor
                    >.
                </Paragraph>
            </div>
        </section>

        <!-- ================================================================== -->
        <!-- FORMS -->
        <!-- ================================================================== -->
        <section id="forms" class="section">
            <h2 class="section-title">Forms</h2>

            <div class="demo-block">
                <h3 class="demo-title">Text Input</h3>
                <div class="form-grid">
                    <Field>
                        <Label>Default Input</Label>
                        <Hint>Enter your information</Hint>
                        <Input
                            placeholder="Type here..."
                            value={inputValue}
                            oninput={(e) =>
                                (inputValue = e.currentTarget.value)}
                        />
                    </Field>
                    <Field>
                        <Label isRequired>Required Input</Label>
                        <Input placeholder="Required field" />
                    </Field>
                    <Field>
                        <Label>Disabled Input</Label>
                        <Input
                            placeholder="Disabled"
                            disabled
                            value="Cannot edit"
                        />
                    </Field>
                </div>
            </div>

            <div class="demo-block">
                <h3 class="demo-title">Input Validation States</h3>
                <div class="form-grid">
                    <Field>
                        <Label>Success</Label>
                        <Input validation="success" value="Valid input" />
                        <Message validation="success">Looks good!</Message>
                    </Field>
                    <Field>
                        <Label>Warning</Label>
                        <Input validation="warning" value="Check this" />
                        <Message validation="warning">Please review</Message>
                    </Field>
                    <Field>
                        <Label>Error</Label>
                        <Input validation="error" value="Invalid" />
                        <Message validation="error"
                            >This field has an error</Message
                        >
                    </Field>
                </div>
            </div>

            <div class="demo-block">
                <h3 class="demo-title">Media Input (with icons)</h3>
                <div class="form-grid">
                    <Field>
                        <Label>Search</Label>
                        <MediaInput placeholder="Search...">
                            {#snippet start()}{@html icons.search}{/snippet}
                        </MediaInput>
                    </Field>
                    <Field>
                        <Label>Email</Label>
                        <MediaInput placeholder="Enter email">
                            {#snippet start()}{@html icons.mail}{/snippet}
                        </MediaInput>
                    </Field>
                </div>
            </div>

            <div class="demo-block">
                <h3 class="demo-title">Faux Input (display only)</h3>
                <Field>
                    <Label>Read-only Value</Label>
                    <FauxInput
                        >This looks like an input but isn't editable</FauxInput
                    >
                </Field>
            </div>

            <div class="demo-block">
                <h3 class="demo-title">Textarea</h3>
                <Field>
                    <Label>Description</Label>
                    <Hint>Provide a detailed description</Hint>
                    <Textarea
                        placeholder="Write something..."
                        value={textareaValue}
                        oninput={(e) => (textareaValue = e.currentTarget.value)}
                        rows={4}
                    />
                </Field>
            </div>

            <div class="demo-block">
                <h3 class="demo-title">Select</h3>
                <Field>
                    <Label>Choose an option</Label>
                    <Select
                        value={selectValue}
                        onchange={(e) => (selectValue = e.currentTarget.value)}
                    >
                        <option value="">Select...</option>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                    </Select>
                </Field>
            </div>

            <div class="demo-block">
                <h3 class="demo-title">Checkbox</h3>
                <div class="stack">
                    <Checkbox
                        checked={checkboxChecked}
                        onchange={() => (checkboxChecked = !checkboxChecked)}
                    >
                        Accept terms and conditions
                    </Checkbox>
                    <Checkbox checked disabled>Checked and disabled</Checkbox>
                    <Checkbox indeterminate>Indeterminate state</Checkbox>
                </div>
            </div>

            <div class="demo-block">
                <h3 class="demo-title">Radio Buttons</h3>
                <div class="stack">
                    <Radio
                        name="demo-radio"
                        value="option1"
                        checked={radioValue === "option1"}
                        onchange={() => (radioValue = "option1")}
                    >
                        Option 1
                    </Radio>
                    <Radio
                        name="demo-radio"
                        value="option2"
                        checked={radioValue === "option2"}
                        onchange={() => (radioValue = "option2")}
                    >
                        Option 2
                    </Radio>
                    <Radio
                        name="demo-radio"
                        value="option3"
                        checked={radioValue === "option3"}
                        onchange={() => (radioValue = "option3")}
                    >
                        Option 3
                    </Radio>
                </div>
                <p class="state-label">Selected: {radioValue}</p>
            </div>

            <div class="demo-block">
                <h3 class="demo-title">Toggle Switch</h3>
                <div class="stack">
                    <Toggle
                        checked={toggleChecked}
                        onchange={() => (toggleChecked = !toggleChecked)}
                    >
                        Enable notifications
                    </Toggle>
                    <Toggle checked>Already enabled</Toggle>
                    <Toggle disabled>Disabled toggle</Toggle>
                </div>
            </div>

            <div class="demo-block">
                <h3 class="demo-title">Range Slider</h3>
                <Field>
                    <Label>Volume: {rangeValue}%</Label>
                    <Range
                        min={0}
                        max={100}
                        step={1}
                        value={rangeValue}
                        oninput={(e) =>
                            (rangeValue = Number(e.currentTarget.value))}
                    />
                </Field>
            </div>

            <div class="demo-block">
                <h3 class="demo-title">File Upload</h3>
                <FileUpload />
            </div>

            <div class="demo-block">
                <h3 class="demo-title">File List</h3>
                <FileList>
                    <FileListItem>
                        <File type="document">report.pdf</File>
                        <FileClose onclick={() => alert("Close clicked")} />
                    </FileListItem>
                    <FileListItem>
                        <File type="image">photo.jpg</File>
                        <FileDelete onclick={() => alert("Delete clicked")} />
                    </FileListItem>
                    <FileListItem>
                        <File type="document" validation="success"
                            >approved.docx</File
                        >
                    </FileListItem>
                    <FileListItem>
                        <File type="document" validation="error"
                            >invalid.pdf</File
                        >
                    </FileListItem>
                </FileList>
            </div>

            <div class="demo-block">
                <h3 class="demo-title">Fieldset & Legend</h3>
                <Fieldset>
                    <Legend>Contact Information</Legend>
                    <div class="form-grid">
                        <Field>
                            <Label>Name</Label>
                            <Input placeholder="Full name" />
                        </Field>
                        <Field>
                            <Label>Email</Label>
                            <Input
                                type="email"
                                placeholder="email@example.com"
                            />
                        </Field>
                    </div>
                </Fieldset>
            </div>

            <div class="demo-block">
                <h3 class="demo-title">Tiles</h3>
                <Tiles name="demo-tiles" bind:value={tileValue}>
                    <Tile value="tile1">
                        <TileIcon>{@html icons.mail}</TileIcon>
                        <TileLabel>Email</TileLabel>
                        <TileDescription>Send via email</TileDescription>
                    </Tile>
                    <Tile value="tile2">
                        <TileIcon>{@html icons.phone}</TileIcon>
                        <TileLabel>Phone</TileLabel>
                        <TileDescription>Call directly</TileDescription>
                    </Tile>
                    <Tile value="tile3">
                        <TileIcon>{@html icons.user}</TileIcon>
                        <TileLabel>In Person</TileLabel>
                        <TileDescription>Meet face to face</TileDescription>
                    </Tile>
                </Tiles>
                <p class="state-label">Selected: {tileValue}</p>
            </div>
        </section>

        <!-- ================================================================== -->
        <!-- TYPOGRAPHY -->
        <!-- ================================================================== -->
        <section id="typography" class="section">
            <h2 class="section-title">Typography</h2>

            <div class="demo-block">
                <h3 class="demo-title">Headings</h3>
                <Heading level={1}>Heading 1 (XXL)</Heading>
                <Heading level={2}>Heading 2 (XL)</Heading>
                <Heading level={3}>Heading 3 (LG)</Heading>
                <Heading level={4}>Heading 4 (MD)</Heading>
                <Heading level={5}>Heading 5 (SM)</Heading>
                <Heading level={6}>Heading 6 (XS)</Heading>
            </div>

            <div class="demo-block">
                <h3 class="demo-title">Paragraphs</h3>
                <Paragraph>
                    Default paragraph text. Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua.
                </Paragraph>
                <Paragraph size="small"
                    >Small paragraph for secondary content.</Paragraph
                >
                <Paragraph size="large">Large paragraph for emphasis.</Paragraph
                >
            </div>

            <div class="demo-block">
                <h3 class="demo-title">Text Styles</h3>
                <Paragraph>
                    <Span isBold>Bold text</Span> | <Span isMono>Monospace</Span
                    > | Use <Code>inline code</Code> for code snippets.
                </Paragraph>
            </div>

            <div class="demo-block">
                <h3 class="demo-title">Code Block</h3>
                <div class="code-examples">
                    <CodeBlock language="typescript">
                        {`function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

console.log(greet('World'));`}
                    </CodeBlock>

                    <CodeBlock language="jsx" highlightLines={[2, 3]}>
                        {`function Button({ children }) {
  return (
    <button className="btn">
      {children}
    </button>
  );
}`}
                    </CodeBlock>

                    <CodeBlock language="bash" isNumbered>
                        {`npm install svelte-garden
cd my-project
npm run dev`}
                    </CodeBlock>
                </div>
            </div>

            <div class="demo-block">
                <h3 class="demo-title">Blockquote</h3>
                <Blockquote>
                    "Design is not just what it looks like and feels like.
                    Design is how it works."
                    <br /><Span isBold>- Steve Jobs</Span>
                </Blockquote>
            </div>

            <div class="demo-block">
                <h3 class="demo-title">Lists</h3>
                <div class="demo-row-top">
                    <div>
                        <Paragraph isBold>Unordered</Paragraph>
                        <UnorderedList>
                            <li>First item</li>
                            <li>Second item</li>
                            <li>Third item</li>
                        </UnorderedList>
                    </div>
                    <div>
                        <Paragraph isBold>Ordered</Paragraph>
                        <OrderedList>
                            <li>Step one</li>
                            <li>Step two</li>
                            <li>Step three</li>
                        </OrderedList>
                    </div>
                </div>
            </div>
        </section>

        <!-- ================================================================== -->
        <!-- AVATARS -->
        <!-- ================================================================== -->
        <section id="avatars" class="section">
            <h2 class="section-title">Avatars</h2>

            <div class="demo-block">
                <h3 class="demo-title">Sizes (with text)</h3>
                <div class="demo-row">
                    <Avatar size="extraextrasmall" text="XS" />
                    <Avatar size="extrasmall" text="XS" />
                    <Avatar size="small" text="SM" />
                    <Avatar size="medium" text="MD" />
                    <Avatar size="large" text="LG" />
                </div>
            </div>

            <div class="demo-block">
                <h3 class="demo-title">With Images</h3>
                <div class="demo-row">
                    <Avatar
                        size="large"
                        src="https://i.pravatar.cc/100?img=1"
                        alt="User 1"
                    />
                    <Avatar
                        size="large"
                        src="https://i.pravatar.cc/100?img=2"
                        alt="User 2"
                    />
                    <Avatar
                        size="large"
                        src="https://i.pravatar.cc/100?img=3"
                        alt="User 3"
                    />
                </div>
            </div>

            <div class="demo-block">
                <h3 class="demo-title">Status Indicators</h3>
                <div class="demo-row">
                    <Avatar size="large" text="AB" status="available" />
                    <Avatar size="large" text="CD" status="away" />
                    <Avatar size="large" text="EF" status="transfers" />
                    <Avatar size="large" text="GH" status="offline" />
                </div>
            </div>

            <div class="demo-block">
                <h3 class="demo-title">System Avatar</h3>
                <Avatar size="large" text="SY" isSystem />
            </div>
        </section>

        <!-- ================================================================== -->
        <!-- TAGS -->
        <!-- ================================================================== -->
        <section id="tags" class="section">
            <h2 class="section-title">Tags</h2>

            <div class="demo-block">
                <h3 class="demo-title">Sizes</h3>
                <div class="demo-row">
                    <Tag size="small">Small</Tag>
                    <Tag size="medium">Medium</Tag>
                    <Tag size="large">Large</Tag>
                </div>
            </div>

            <div class="demo-block">
                <h3 class="demo-title">Colors</h3>
                <div class="demo-row">
                    <Tag hue="#e35b66">Red</Tag>
                    <Tag hue="#ffb648">Yellow</Tag>
                    <Tag hue="#5eae91">Green</Tag>
                    <Tag hue="#30aabc">Teal</Tag>
                    <Tag hue="#5293c7">Blue</Tag>
                    <Tag hue="#b4a7c7">Purple</Tag>
                </div>
            </div>

            <div class="demo-block">
                <h3 class="demo-title">Pill Tags</h3>
                <div class="demo-row">
                    <Tag isPill>Pill Tag</Tag>
                    <Tag isPill hue="#5293c7">Blue Pill</Tag>
                    <Tag isPill hue="#5eae91">Green Pill</Tag>
                </div>
            </div>

            <div class="demo-block">
                <h3 class="demo-title">With Close Button</h3>
                <div class="demo-row">
                    <Tag>
                        Removable
                        <TagClose onclick={() => alert("Removed!")} />
                    </Tag>
                    <Tag hue="#5293c7">
                        Blue Tag
                        <TagClose onclick={() => alert("Removed!")} />
                    </Tag>
                </div>
            </div>

            <div class="demo-block">
                <h3 class="demo-title">With Avatar</h3>
                <div class="demo-row">
                    <Tag>
                        <TagAvatar>
                            <Avatar
                                size="extraextrasmall"
                                src="https://i.pravatar.cc/40?img=1"
                            />
                        </TagAvatar>
                        John Doe
                    </Tag>
                    <Tag hue="#b4a7c7">
                        <TagAvatar>
                            <Avatar
                                size="extraextrasmall"
                                src="https://i.pravatar.cc/40?img=2"
                            />
                        </TagAvatar>
                        Jane Smith
                        <TagClose onclick={() => {}} />
                    </Tag>
                </div>
            </div>
        </section>

        <!-- ================================================================== -->
        <!-- LOADERS -->
        <!-- ================================================================== -->
        <section id="loaders" class="section">
            <h2 class="section-title">Loaders</h2>

            <div class="demo-block">
                <h3 class="demo-title">Spinner</h3>
                <div class="demo-row">
                    <Spinner size="small" />
                    <Spinner size="medium" />
                    <Spinner size="large" />
                </div>
            </div>

            <div class="demo-block">
                <h3 class="demo-title">Dots</h3>
                <div class="demo-row">
                    <Dots size="small" />
                    <Dots size="medium" />
                    <Dots size="large" />
                </div>
            </div>

            <div class="demo-block">
                <h3 class="demo-title">Inline Loader (in button)</h3>
                <Button isPrimary disabled>
                    <Inline size="small" />
                    Loading...
                </Button>
            </div>

            <div class="demo-block">
                <h3 class="demo-title">Progress Bar</h3>
                <div class="stack">
                    <Progress value={progressValue} />
                    <div class="demo-row">
                        <Button
                            size="small"
                            onclick={() =>
                                (progressValue = Math.max(
                                    0,
                                    progressValue - 10,
                                ))}>-10%</Button
                        >
                        <span>{progressValue}%</span>
                        <Button
                            size="small"
                            onclick={() =>
                                (progressValue = Math.min(
                                    100,
                                    progressValue + 10,
                                ))}>+10%</Button
                        >
                    </div>
                </div>
            </div>

            <div class="demo-block">
                <h3 class="demo-title">Skeleton</h3>
                <div class="stack">
                    <Skeleton height="20px" width="60%" />
                    <Skeleton height="16px" width="80%" />
                    <Skeleton height="16px" width="70%" />
                    <Skeleton height="100px" />
                </div>
            </div>
        </section>

        <!-- ================================================================== -->
        <!-- NOTIFICATIONS -->
        <!-- ================================================================== -->
        <section id="notifications" class="section">
            <h2 class="section-title">Notifications</h2>

            <div class="demo-block">
                <h3 class="demo-title">Alerts</h3>
                <div class="stack">
                    <Alert type="info"
                        >This is an informational alert message.</Alert
                    >
                    <Alert type="success"
                        >Success! Your changes have been saved.</Alert
                    >
                    <Alert type="warning"
                        >Warning: Please review your information.</Alert
                    >
                    <Alert type="error"
                        >Error: Something went wrong. Please try again.</Alert
                    >
                </div>
            </div>

            <div class="demo-block">
                <h3 class="demo-title">Notification</h3>
                <Notification type="info" title="New Update Available">
                    A new version of the application is ready. Would you like to
                    update now?
                </Notification>
            </div>

            <div class="demo-block">
                <h3 class="demo-title">Toast</h3>
                <Button onclick={() => (showToast = true)}>Show Toast</Button>
                {#if showToast}
                    <div class="toast-container">
                        <Toast
                            type="success"
                            title="Success"
                            onDismiss={() => (showToast = false)}
                        >
                            Your changes have been saved successfully!
                        </Toast>
                    </div>
                {/if}
            </div>
        </section>

        <!-- ================================================================== -->
        <!-- MODALS -->
        <!-- ================================================================== -->
        <section id="modals" class="section">
            <h2 class="section-title">Modals</h2>

            <div class="demo-block">
                <div class="demo-row">
                    <Button onclick={() => (showModal = true)}
                        >Open Modal</Button
                    >
                    <Button isDanger onclick={() => (showDangerModal = true)}
                        >Danger Modal</Button
                    >
                </div>
            </div>
        </section>

        <!-- ================================================================== -->
        <!-- DROPDOWNS -->
        <!-- ================================================================== -->
        <section id="dropdowns" class="section">
            <h2 class="section-title">Dropdowns</h2>

            <div class="demo-block">
                <h3 class="demo-title">Menu</h3>
                <div class="dropdown-container">
                    <Button onclick={() => (showMenu = !showMenu)}>
                        Actions {@html icons.chevronDown}
                    </Button>
                    <Menu
                        isExpanded={showMenu}
                        onClose={() => (showMenu = false)}
                    >
                        <MenuItem onclick={() => (showMenu = false)}
                            >Edit</MenuItem
                        >
                        <MenuItem onclick={() => (showMenu = false)}
                            >Duplicate</MenuItem
                        >
                        <MenuItem type="add" onclick={() => (showMenu = false)}
                            >Add new</MenuItem
                        >
                        <MenuSeparator />
                        <MenuItem
                            type="danger"
                            onclick={() => (showMenu = false)}>Delete</MenuItem
                        >
                    </Menu>
                </div>
            </div>
        </section>

        <!-- ================================================================== -->
        <!-- TOOLTIPS -->
        <!-- ================================================================== -->
        <section id="tooltips" class="section">
            <h2 class="section-title">Tooltips</h2>

            <div class="demo-block">
                <h3 class="demo-title">Placements</h3>
                <div class="demo-row">
                    <Tooltip content="Tooltip on top" placement="top">
                        <Button>Top</Button>
                    </Tooltip>
                    <Tooltip content="Tooltip on right" placement="right">
                        <Button>Right</Button>
                    </Tooltip>
                    <Tooltip content="Tooltip on bottom" placement="bottom">
                        <Button>Bottom</Button>
                    </Tooltip>
                    <Tooltip content="Tooltip on left" placement="left">
                        <Button>Left</Button>
                    </Tooltip>
                </div>
            </div>

            <div class="demo-block">
                <h3 class="demo-title">Sizes</h3>
                <div class="demo-row">
                    <Tooltip content="Small" size="small">
                        <Button>Small</Button>
                    </Tooltip>
                    <Tooltip
                        content="Medium tooltip with more content"
                        size="medium"
                    >
                        <Button>Medium</Button>
                    </Tooltip>
                    <Tooltip
                        content="Large tooltip that can contain even more descriptive text"
                        size="large"
                    >
                        <Button>Large</Button>
                    </Tooltip>
                </div>
            </div>
        </section>

        <!-- ================================================================== -->
        <!-- BREADCRUMBS -->
        <!-- ================================================================== -->
        <section id="breadcrumbs" class="section">
            <h2 class="section-title">Breadcrumbs</h2>

            <div class="demo-block">
                <Breadcrumb>
                    <BreadcrumbItem href="#">Home</BreadcrumbItem>
                    <BreadcrumbItem href="#">Products</BreadcrumbItem>
                    <BreadcrumbItem href="#">Category</BreadcrumbItem>
                    <BreadcrumbItem isCurrent>Current Page</BreadcrumbItem>
                </Breadcrumb>
            </div>
        </section>

        <!-- ================================================================== -->
        <!-- TABS -->
        <!-- ================================================================== -->
        <section id="tabs" class="section">
            <h2 class="section-title">Tabs</h2>

            <div class="demo-block">
                <Tabs selectedIndex={activeTab}>
                    <TabList>
                        <Tab index={0} onclick={() => (activeTab = 0)}
                            >Overview</Tab
                        >
                        <Tab index={1} onclick={() => (activeTab = 1)}
                            >Details</Tab
                        >
                        <Tab index={2} onclick={() => (activeTab = 2)}
                            >Settings</Tab
                        >
                        <Tab index={3} disabled>Disabled</Tab>
                    </TabList>
                    <TabPanel index={0}>
                        <Paragraph
                            >This is the overview content panel.</Paragraph
                        >
                    </TabPanel>
                    <TabPanel index={1}>
                        <Paragraph>This is the details content panel.</Paragraph
                        >
                    </TabPanel>
                    <TabPanel index={2}>
                        <Paragraph
                            >This is the settings content panel.</Paragraph
                        >
                    </TabPanel>
                    <TabPanel index={3}>
                        <Paragraph>This tab is disabled.</Paragraph>
                    </TabPanel>
                </Tabs>
            </div>
        </section>

        <!-- ================================================================== -->
        <!-- ACCORDIONS -->
        <!-- ================================================================== -->
        <section id="accordions" class="section">
            <h2 class="section-title">Accordions</h2>

            <div class="demo-block">
                <Accordion>
                    <AccordionSection
                        isExpanded={accordionState.section1}
                        onToggle={(v) => (accordionState.section1 = v)}
                    >
                        <AccordionHeader>What is Svelte Garden?</AccordionHeader
                        >
                        <AccordionPanel>
                            <Paragraph>
                                Svelte Garden is a component library built with
                                Svelte 5, based on the Zendesk Garden design
                                system.
                            </Paragraph>
                        </AccordionPanel>
                    </AccordionSection>
                    <AccordionSection
                        isExpanded={accordionState.section2}
                        onToggle={(v) => (accordionState.section2 = v)}
                    >
                        <AccordionHeader>How do I install it?</AccordionHeader>
                        <AccordionPanel>
                            <Paragraph>
                                Install via npm: <Code
                                    >npm install svelte-garden</Code
                                >
                            </Paragraph>
                        </AccordionPanel>
                    </AccordionSection>
                    <AccordionSection
                        isExpanded={accordionState.section3}
                        onToggle={(v) => (accordionState.section3 = v)}
                    >
                        <AccordionHeader>Is it accessible?</AccordionHeader>
                        <AccordionPanel>
                            <Paragraph>
                                Yes! All components follow WCAG guidelines with
                                proper ARIA attributes and keyboard navigation.
                            </Paragraph>
                        </AccordionPanel>
                    </AccordionSection>
                </Accordion>
            </div>
        </section>

        <!-- ================================================================== -->
        <!-- TABLES -->
        <!-- ================================================================== -->
        <section id="tables" class="section">
            <h2 class="section-title">Tables</h2>

            <div class="demo-block">
                <Table>
                    <Caption>User Directory</Caption>
                    <TableHead>
                        <TableRow>
                            <TableHeaderCell>ID</TableHeaderCell>
                            <TableHeaderCell>Name</TableHeaderCell>
                            <TableHeaderCell>Email</TableHeaderCell>
                            <TableHeaderCell>Role</TableHeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {#each tableData as row}
                            <TableRow>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.role}</TableCell>
                            </TableRow>
                        {/each}
                    </TableBody>
                </Table>
            </div>
        </section>

        <!-- ================================================================== -->
        <!-- GRID -->
        <!-- ================================================================== -->
        <section id="grid" class="section">
            <h2 class="section-title">Grid</h2>

            <div class="demo-block">
                <h3 class="demo-title">12-Column Grid</h3>
                <Grid>
                    <Row>
                        <Col size={4}><div class="grid-cell">4</div></Col>
                        <Col size={4}><div class="grid-cell">4</div></Col>
                        <Col size={4}><div class="grid-cell">4</div></Col>
                    </Row>
                    <Row>
                        <Col size={3}><div class="grid-cell">3</div></Col>
                        <Col size={6}><div class="grid-cell">6</div></Col>
                        <Col size={3}><div class="grid-cell">3</div></Col>
                    </Row>
                </Grid>
            </div>

            <div class="demo-block">
                <h3 class="demo-title">Auto-sizing</h3>
                <Grid>
                    <Row>
                        <Col><div class="grid-cell">Auto</div></Col>
                        <Col><div class="grid-cell">Auto</div></Col>
                        <Col><div class="grid-cell">Auto</div></Col>
                    </Row>
                </Grid>
            </div>
        </section>

        <!-- ================================================================== -->
        <!-- PAGINATION -->
        <!-- ================================================================== -->
        <section id="pagination" class="section">
            <h2 class="section-title">Pagination</h2>

            <div class="demo-block">
                <h3 class="demo-title">Offset Pagination</h3>
                <OffsetPagination
                    {currentPage}
                    totalPages={20}
                    onChange={(page) => (currentPage = page)}
                />
                <p class="state-label">Page: {currentPage}</p>
            </div>

            <div class="demo-block">
                <h3 class="demo-title">Cursor Pagination</h3>
                <CursorPagination>
                    <CursorFirst
                        disabled={cursorPage === 1}
                        onClick={() => (cursorPage = 1)}
                    />
                    <CursorPrevious
                        disabled={cursorPage === 1}
                        onClick={() =>
                            (cursorPage = Math.max(1, cursorPage - 1))}
                    />
                    <span class="cursor-label">Page {cursorPage} of 10</span>
                    <CursorNext
                        disabled={cursorPage === 10}
                        onClick={() =>
                            (cursorPage = Math.min(10, cursorPage + 1))}
                    />
                    <CursorLast
                        disabled={cursorPage === 10}
                        onClick={() => (cursorPage = 10)}
                    />
                </CursorPagination>
            </div>
        </section>

        <!-- ================================================================== -->
        <!-- COLOR PICKERS -->
        <!-- ================================================================== -->
        <section id="colorpickers" class="section">
            <h2 class="section-title">Color Pickers</h2>

            <div class="demo-block">
                <h3 class="demo-title">Full Color Picker</h3>
                <div class="demo-row-top">
                    <ColorPicker
                        onChange={(color) => (selectedColor = color)}
                    />
                    {#if selectedColor}
                        <div class="color-preview">
                            <div
                                class="color-swatch"
                                style:background-color={selectedColor.hex}
                            ></div>
                            <div class="color-info">
                                <div>Hex: {selectedColor.hex}</div>
                                <div>
                                    RGB: {selectedColor.red}, {selectedColor.green},
                                    {selectedColor.blue}
                                </div>
                                <div>Alpha: {selectedColor.alpha}%</div>
                            </div>
                        </div>
                    {/if}
                </div>
            </div>

            <div class="demo-block">
                <h3 class="demo-title">Color Swatch Palette</h3>
                <ColorSwatch
                    name="demo-swatch"
                    colors={swatchColors}
                    selectedRowIndex={swatchRow}
                    selectedColIndex={swatchCol}
                    onSelect={(row, col) => {
                        swatchRow = row;
                        swatchCol = col;
                    }}
                />
                {#if swatchRow !== null && swatchCol !== null}
                    <p class="state-label">
                        Selected: {swatchColors[swatchRow][swatchCol].label}
                    </p>
                {/if}
            </div>
        </section>

        <!-- ================================================================== -->
        <!-- DATE PICKERS -->
        <!-- ================================================================== -->
        <section id="datepickers" class="section">
            <h2 class="section-title">Date Pickers</h2>

            <div class="demo-block">
                <h3 class="demo-title">Date Picker Input</h3>
                <DatePicker
                    value={selectedDate}
                    onChange={(date) => (selectedDate = date)}
                    placeholder="Select a date"
                />
                {#if selectedDate}
                    <p class="state-label">
                        Selected: {selectedDate.toLocaleDateString()}
                    </p>
                {/if}
            </div>

            <div class="demo-block">
                <h3 class="demo-title">Standalone Calendar</h3>
                <Calendar
                    value={calendarDate}
                    onChange={(date) => (calendarDate = date)}
                />
                {#if calendarDate}
                    <p class="state-label">
                        Selected: {calendarDate.toLocaleDateString()}
                    </p>
                {/if}
            </div>
        </section>

        <!-- ================================================================== -->
        <!-- DRAGGABLE -->
        <!-- ================================================================== -->
        <section id="draggable" class="section">
            <h2 class="section-title">Draggable</h2>

            <div class="demo-block">
                <h3 class="demo-title">Draggable List</h3>
                <DraggableList>
                    <li>
                        <Draggable>
                            <DraggableGrip />
                            <DraggableContent>Item 1 - Default</DraggableContent
                            >
                        </Draggable>
                    </li>
                    <li>
                        <Draggable isCompact>
                            <DraggableGrip />
                            <DraggableContent>Item 2 - Compact</DraggableContent
                            >
                        </Draggable>
                    </li>
                    <li>
                        <Draggable isBare>
                            <DraggableGrip />
                            <DraggableContent>Item 3 - Bare</DraggableContent>
                        </Draggable>
                    </li>
                    <li>
                        <Draggable isDisabled>
                            <DraggableGrip />
                            <DraggableContent
                                >Item 4 - Disabled</DraggableContent
                            >
                        </Draggable>
                    </li>
                </DraggableList>
            </div>

            <div class="demo-block">
                <h3 class="demo-title">Dropzone</h3>
                <div class="demo-row-top">
                    <Dropzone isVertical>
                        {@html icons.plus}
                        <span>Drop here</span>
                    </Dropzone>
                    <Dropzone isActive isVertical>
                        <span>Active</span>
                    </Dropzone>
                    <Dropzone isDanger isVertical>
                        <span>Danger</span>
                    </Dropzone>
                </div>
            </div>
        </section>
    </div>
</div>

<!-- ======================================================================= -->
<!-- MODALS (rendered outside main content) -->
<!-- ======================================================================= -->

<Modal isOpen={showModal} onClose={() => (showModal = false)}>
    <ModalHeader>Modal Title</ModalHeader>
    <ModalBody>
        <Paragraph
            >This is the modal body. You can put any content here.</Paragraph
        >
    </ModalBody>
    <ModalFooter>
        <Button onclick={() => (showModal = false)}>Cancel</Button>
        <Button isPrimary onclick={() => (showModal = false)}>Confirm</Button>
    </ModalFooter>
    <ModalClose />
</Modal>

<Modal isOpen={showDangerModal} onClose={() => (showDangerModal = false)}>
    <ModalHeader isDanger>Delete Item</ModalHeader>
    <ModalBody>
        <Paragraph>Are you sure? This action cannot be undone.</Paragraph>
    </ModalBody>
    <ModalFooter>
        <Button onclick={() => (showDangerModal = false)}>Cancel</Button>
        <Button isPrimary isDanger onclick={() => (showDangerModal = false)}
            >Delete</Button
        >
    </ModalFooter>
    <ModalClose />
</Modal>

<style>
    /* ========================================================================
   * LAYOUT
   * ======================================================================== */

    .showcase {
        max-width: 1200px;
        margin: 0 auto;
    }

    /* Navigation */
    .nav {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        padding: 16px;
        margin-bottom: 32px;
        background-color: var(--garden-color-background-subtle, #f8f9f9);
        border-radius: 8px;
    }

    .nav-link {
        padding: 8px 14px;
        font-size: 13px;
        font-weight: 500;
        color: var(--garden-color-foreground-primary, #1f73b7);
        text-decoration: none;
        border-radius: 4px;
        transition: background-color 0.15s;
    }

    .nav-link:hover {
        background-color: var(--garden-color-background-emphasis, #e9ebed);
    }

    /* Content */
    .content {
        display: flex;
        flex-direction: column;
        gap: 48px;
    }

    /* Sections */
    .section {
        scroll-margin-top: 80px;
    }

    .section-title {
        font-size: 24px;
        font-weight: 600;
        color: var(--garden-color-foreground-default, #2f3941);
        margin: 0 0 24px;
        padding-bottom: 12px;
        border-bottom: 2px solid
            var(--garden-color-border-primary-emphasis, #1f73b7);
    }

    /* Demo blocks */
    .demo-block {
        margin-bottom: 28px;
    }

    .demo-title {
        font-size: 13px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: var(--garden-color-foreground-subtle, #68737d);
        margin: 0 0 14px;
    }

    /* Layout helpers */
    .demo-row {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 12px;
    }

    .demo-row-top {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        gap: 20px;
    }

    .stack {
        display: flex;
        flex-direction: column;
        gap: 12px;
        max-width: 400px;
    }

    .form-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 20px;
    }

    .state-label {
        font-size: 12px;
        color: var(--garden-color-foreground-subtle, #68737d);
        margin-top: 8px;
        padding: 4px 8px;
        background-color: var(--garden-color-background-subtle, #f8f9f9);
        border-radius: 4px;
        display: inline-block;
    }

    /* Component-specific */
    .dropdown-container {
        position: relative;
        display: inline-block;
    }

    .grid-cell {
        padding: 16px;
        background-color: var(--garden-color-background-subtle, #e9ebed);
        border: 1px solid var(--garden-color-border-default, #c2c8cc);
        border-radius: 4px;
        text-align: center;
        font-size: 14px;
        font-weight: 500;
        color: var(--garden-color-foreground-default, #2f3941);
    }

    .cursor-label {
        padding: 0 12px;
        font-size: 14px;
        color: var(--garden-color-foreground-default, #2f3941);
    }

    .toast-container {
        position: fixed;
        top: 64px;
        right: 12px;
        z-index: 1000;
    }

    .color-preview {
        display: flex;
        align-items: flex-start;
        gap: 16px;
    }

    .color-swatch {
        width: 60px;
        height: 60px;
        border-radius: 8px;
        border: 1px solid var(--garden-color-border-default, rgba(0, 0, 0, 0.1));
    }

    .color-info {
        font-size: 13px;
        color: var(--garden-color-foreground-default, #2f3941);
        line-height: 1.6;
    }

    /* Responsive */
    @media (max-width: 768px) {
        .nav {
            padding: 12px;
        }

        .nav-link {
            padding: 6px 10px;
            font-size: 12px;
        }

        .form-grid {
            grid-template-columns: 1fr;
        }
    }

    .code-examples {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
</style>
