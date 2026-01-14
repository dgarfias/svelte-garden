/**
 * Garden icons for CKEditor 5.
 *
 * This file re-exports all CKEditor icons, replacing specific ones with
 * Zendesk Garden equivalents from the shared icons folder.
 *
 * Used via Vite alias in vite.config.js:
 *   '@ckeditor/ckeditor5-icons/dist/index.js': resolve(import.meta.dirname, './src/lib/ckeditor/icons.js')
 */

// Garden icon replacements (imported from shared icons folder)
import IconBold from '../icons/svg/bold-stroke.svg?raw';
import IconItalic from '../icons/svg/italic-stroke.svg?raw';
import IconUnderline from '../icons/svg/underline-stroke.svg?raw';
import IconCode from '../icons/svg/markup-stroke.svg?raw';
import IconLink from '../icons/svg/link-stroke.svg?raw';
import IconUnlink from '../icons/svg/link-remove-stroke.svg?raw';
import IconPencil from '../icons/svg/pencil-stroke.svg?raw';
import IconQuote from '../icons/svg/quote-stroke.svg?raw';
import IconBulletedList from '../icons/svg/list-bullet-stroke.svg?raw';
import IconNumberedList from '../icons/svg/list-number-stroke.svg?raw';
import IconHorizontalLine from '../icons/svg/horizontal-rule-stroke.svg?raw';
import IconIndent from '../icons/svg/indent-increase-stroke.svg?raw';
import IconOutdent from '../icons/svg/indent-decrease-stroke.svg?raw';
import IconDropdownArrow from '../icons/svg/chevron-down-stroke.svg?raw';
import IconCodeBlock from '../icons/svg/terminal-window-stroke.svg?raw';
import IconCheck from '../icons/svg/check-lg-stroke.svg?raw';
import IconCancel from '../icons/svg/x-stroke.svg?raw';

// Export Garden icons
export {
  IconBold,
  IconItalic,
  IconUnderline,
  IconCode,
  IconLink,
  IconUnlink,
  IconPencil,
  IconQuote,
  IconBulletedList,
  IconNumberedList,
  IconHorizontalLine,
  IconIndent,
  IconOutdent,
  IconDropdownArrow,
  IconCodeBlock,
  IconCheck,
  IconCancel
};

// Re-export all other icons from CKEditor (that we haven't replaced)
export { default as IconAccessibility } from '@ckeditor/ckeditor5-icons/theme/icons/accessibility.svg?raw';
export { default as IconAddComment } from '@ckeditor/ckeditor5-icons/theme/icons/add-comment.svg?raw';
export { default as IconAI } from '@ckeditor/ckeditor5-icons/theme/icons/ai.svg?raw';
export { default as IconAIAdjustLength } from '@ckeditor/ckeditor5-icons/theme/icons/ai-adjust-length.svg?raw';
export { default as IconAIAskAI } from '@ckeditor/ckeditor5-icons/theme/icons/ai-ask-ai.svg?raw';
export { default as IconAIChangeTone } from '@ckeditor/ckeditor5-icons/theme/icons/ai-change-tone.svg?raw';
export { default as IconAIChatCommands } from '@ckeditor/ckeditor5-icons/theme/icons/ai-chat-commands.svg?raw';
export { default as IconAIContinueWriting } from '@ckeditor/ckeditor5-icons/theme/icons/ai-continue-writing.svg?raw';
export { default as IconAIGrammarCheck } from '@ckeditor/ckeditor5-icons/theme/icons/ai-grammar-check.svg?raw';
export { default as IconAIImproveWriting } from '@ckeditor/ckeditor5-icons/theme/icons/ai-improve-writing.svg?raw';
export { default as IconAIOther } from '@ckeditor/ckeditor5-icons/theme/icons/ai-other.svg?raw';
export { default as IconAIQuickActions } from '@ckeditor/ckeditor5-icons/theme/icons/ai-quick-actions.svg?raw';
export { default as IconAIReview } from '@ckeditor/ckeditor5-icons/theme/icons/ai-review.svg?raw';
export { default as IconAITranslate } from '@ckeditor/ckeditor5-icons/theme/icons/ai-translate.svg?raw';
export { default as IconAIChat } from '@ckeditor/ckeditor5-icons/theme/icons/ai-chat.svg?raw';
export { default as IconAIHistory } from '@ckeditor/ckeditor5-icons/theme/icons/ai-history.svg?raw';
export { default as IconAlignBottom } from '@ckeditor/ckeditor5-icons/theme/icons/align-bottom.svg?raw';
export { default as IconAlignCenter } from '@ckeditor/ckeditor5-icons/theme/icons/align-center.svg?raw';
export { default as IconAlignJustify } from '@ckeditor/ckeditor5-icons/theme/icons/align-justify.svg?raw';
export { default as IconAlignLeft } from '@ckeditor/ckeditor5-icons/theme/icons/align-left.svg?raw';
export { default as IconAlignMiddle } from '@ckeditor/ckeditor5-icons/theme/icons/align-middle.svg?raw';
export { default as IconAlignRight } from '@ckeditor/ckeditor5-icons/theme/icons/align-right.svg?raw';
export { default as IconAlignTop } from '@ckeditor/ckeditor5-icons/theme/icons/align-top.svg?raw';
export { default as IconArrowDown } from '@ckeditor/ckeditor5-icons/theme/icons/arrow-down.svg?raw';
export { default as IconArrowUp } from '@ckeditor/ckeditor5-icons/theme/icons/arrow-up.svg?raw';
export { default as IconBookmarkInline } from '@ckeditor/ckeditor5-icons/theme/icons/bookmark-inline.svg?raw';
export { default as IconBookmark } from '@ckeditor/ckeditor5-icons/theme/icons/bookmark.svg?raw';
export { default as IconBookmarkMedium } from '@ckeditor/ckeditor5-icons/theme/icons/bookmark-medium.svg?raw';
export { default as IconBookmarkSmall } from '@ckeditor/ckeditor5-icons/theme/icons/bookmark-small.svg?raw';
export { default as IconBrowseFiles } from '@ckeditor/ckeditor5-icons/theme/icons/browse-files.svg?raw';
export { default as IconBulb } from '@ckeditor/ckeditor5-icons/theme/icons/bulb.svg?raw';
export { default as IconCaption } from '@ckeditor/ckeditor5-icons/theme/icons/caption.svg?raw';
export { default as IconCaseChange } from '@ckeditor/ckeditor5-icons/theme/icons/case-change.svg?raw';
export { default as IconChevronDown } from '@ckeditor/ckeditor5-icons/theme/icons/chevron-down.svg?raw';
export { default as IconChevronUp } from '@ckeditor/ckeditor5-icons/theme/icons/chevron-up.svg?raw';
export { default as IconChevronRight } from '@ckeditor/ckeditor5-icons/theme/icons/chevron-right.svg?raw';
export { default as IconCkboxImageEdit } from '@ckeditor/ckeditor5-icons/theme/icons/ckbox-image-edit.svg?raw';
export { default as IconClose } from '@ckeditor/ckeditor5-icons/theme/icons/close.svg?raw';
export { default as IconCog } from '@ckeditor/ckeditor5-icons/theme/icons/cog.svg?raw';
export { default as IconColorPalette } from '@ckeditor/ckeditor5-icons/theme/icons/color-palette.svg?raw';
export { default as IconColorTileCheck } from '@ckeditor/ckeditor5-icons/theme/icons/color-tile-check.svg?raw';
export { default as IconCommentsArchive } from '@ckeditor/ckeditor5-icons/theme/icons/comments-archive.svg?raw';
export { default as IconContentLock } from '@ckeditor/ckeditor5-icons/theme/icons/content-lock.svg?raw';
export { default as IconContentUnlock } from '@ckeditor/ckeditor5-icons/theme/icons/content-unlock.svg?raw';
export { default as IconCopy } from '@ckeditor/ckeditor5-icons/theme/icons/copy.svg?raw';
export { default as IconDocument } from '@ckeditor/ckeditor5-icons/theme/icons/document.svg?raw';
export { default as IconDocumentWithCheckmark } from '@ckeditor/ckeditor5-icons/theme/icons/document-with-checkmark.svg?raw';
export { default as IconDocumentWithCross } from '@ckeditor/ckeditor5-icons/theme/icons/document-with-cross.svg?raw';
export { default as IconDocumentWithLoupe } from '@ckeditor/ckeditor5-icons/theme/icons/document-with-loupe.svg?raw';
export { default as IconDocumentOutline } from '@ckeditor/ckeditor5-icons/theme/icons/document-outline.svg?raw';
export { default as IconDocumentOutlineToggle } from '@ckeditor/ckeditor5-icons/theme/icons/document-outline-toggle.svg?raw';
export { default as IconDragHandle } from '@ckeditor/ckeditor5-icons/theme/icons/drag-handle.svg?raw';
export { default as IconDragIndicator } from '@ckeditor/ckeditor5-icons/theme/icons/drag-indicator.svg?raw';
export { default as IconDropbox } from '@ckeditor/ckeditor5-icons/theme/icons/dropbox.svg?raw';
export { default as IconEditComment } from '@ckeditor/ckeditor5-icons/theme/icons/edit-comment.svg?raw';
export { default as IconEmoji } from '@ckeditor/ckeditor5-icons/theme/icons/emoji.svg?raw';
export { default as IconEraser } from '@ckeditor/ckeditor5-icons/theme/icons/eraser.svg?raw';
export { default as IconError } from '@ckeditor/ckeditor5-icons/theme/icons/error.svg?raw';
export { default as IconExportPdf } from '@ckeditor/ckeditor5-icons/theme/icons/export-pdf.svg?raw';
export { default as IconExportWord } from '@ckeditor/ckeditor5-icons/theme/icons/export-word.svg?raw';
export { default as IconEye } from '@ckeditor/ckeditor5-icons/theme/icons/eye.svg?raw';
export { default as IconEyeCrossedOut } from '@ckeditor/ckeditor5-icons/theme/icons/eye-crossed-out.svg?raw';
export { default as IconFacebook } from '@ckeditor/ckeditor5-icons/theme/icons/facebook.svg?raw';
export { default as IconFileUpload } from '@ckeditor/ckeditor5-icons/theme/icons/file-upload.svg?raw';
export { default as IconFindReplace } from '@ckeditor/ckeditor5-icons/theme/icons/find-replace.svg?raw';
export { default as IconFontBackground } from '@ckeditor/ckeditor5-icons/theme/icons/font-background.svg?raw';
export { default as IconFontColor } from '@ckeditor/ckeditor5-icons/theme/icons/font-color.svg?raw';
export { default as IconFontFamily } from '@ckeditor/ckeditor5-icons/theme/icons/font-family.svg?raw';
export { default as IconFontSize } from '@ckeditor/ckeditor5-icons/theme/icons/font-size.svg?raw';
export { default as IconFootnote } from '@ckeditor/ckeditor5-icons/theme/icons/footnote.svg?raw';
export { default as IconFullscreenEnter } from '@ckeditor/ckeditor5-icons/theme/icons/fullscreen-enter.svg?raw';
export { default as IconFullscreenLeave } from '@ckeditor/ckeditor5-icons/theme/icons/fullscreen-leave.svg?raw';
export { default as IconGoogleDrive } from '@ckeditor/ckeditor5-icons/theme/icons/google-drive.svg?raw';
export { default as IconGooglePhotos } from '@ckeditor/ckeditor5-icons/theme/icons/google-photos.svg?raw';
export { default as IconHeading1 } from '@ckeditor/ckeditor5-icons/theme/icons/heading1.svg?raw';
export { default as IconHeading2 } from '@ckeditor/ckeditor5-icons/theme/icons/heading2.svg?raw';
export { default as IconHeading3 } from '@ckeditor/ckeditor5-icons/theme/icons/heading3.svg?raw';
export { default as IconHeading4 } from '@ckeditor/ckeditor5-icons/theme/icons/heading4.svg?raw';
export { default as IconHeading5 } from '@ckeditor/ckeditor5-icons/theme/icons/heading5.svg?raw';
export { default as IconHeading6 } from '@ckeditor/ckeditor5-icons/theme/icons/heading6.svg?raw';
export { default as IconHistory } from '@ckeditor/ckeditor5-icons/theme/icons/history.svg?raw';
export { default as IconHtml } from '@ckeditor/ckeditor5-icons/theme/icons/html.svg?raw';
export { default as IconImageAssetManager } from '@ckeditor/ckeditor5-icons/theme/icons/image-asset-manager.svg?raw';
export { default as IconImage } from '@ckeditor/ckeditor5-icons/theme/icons/image.svg?raw';
export { default as IconImageUpload } from '@ckeditor/ckeditor5-icons/theme/icons/image-upload.svg?raw';
export { default as IconImageUrl } from '@ckeditor/ckeditor5-icons/theme/icons/image-url.svg?raw';
export { default as IconImportExport } from '@ckeditor/ckeditor5-icons/theme/icons/import-export.svg?raw';
export { default as IconImportWord } from '@ckeditor/ckeditor5-icons/theme/icons/import-word.svg?raw';
export { default as IconInfo } from '@ckeditor/ckeditor5-icons/theme/icons/info.svg?raw';
export { default as IconInsertMergeField } from '@ckeditor/ckeditor5-icons/theme/icons/insert-merge-field.svg?raw';
export { default as IconLegalStyleList } from '@ckeditor/ckeditor5-icons/theme/icons/legal-style-list.svg?raw';
export { default as IconLineHeight } from '@ckeditor/ckeditor5-icons/theme/icons/line-height.svg?raw';
export { default as IconListStyleCircle } from '@ckeditor/ckeditor5-icons/theme/icons/list-style-circle.svg?raw';
export { default as IconListStyleDecimalLeadingZero } from '@ckeditor/ckeditor5-icons/theme/icons/list-style-decimal-leading-zero.svg?raw';
export { default as IconListStyleDecimal } from '@ckeditor/ckeditor5-icons/theme/icons/list-style-decimal.svg?raw';
export { default as IconListStyleDisc } from '@ckeditor/ckeditor5-icons/theme/icons/list-style-disc.svg?raw';
export { default as IconListStyleLowerLatin } from '@ckeditor/ckeditor5-icons/theme/icons/list-style-lower-latin.svg?raw';
export { default as IconListStyleLowerRoman } from '@ckeditor/ckeditor5-icons/theme/icons/list-style-lower-roman.svg?raw';
export { default as IconListStyleSquare } from '@ckeditor/ckeditor5-icons/theme/icons/list-style-square.svg?raw';
export { default as IconListStyleUpperLatin } from '@ckeditor/ckeditor5-icons/theme/icons/list-style-upper-latin.svg?raw';
export { default as IconListStyleUpperRoman } from '@ckeditor/ckeditor5-icons/theme/icons/list-style-upper-roman.svg?raw';
export { default as IconLocal } from '@ckeditor/ckeditor5-icons/theme/icons/local.svg?raw';
export { default as IconLoupe } from '@ckeditor/ckeditor5-icons/theme/icons/loupe.svg?raw';
export { default as IconLowVision } from '@ckeditor/ckeditor5-icons/theme/icons/low-vision.svg?raw';
export { default as IconMagicWand } from '@ckeditor/ckeditor5-icons/theme/icons/magic-wand.svg?raw';
export { default as IconMarker } from '@ckeditor/ckeditor5-icons/theme/icons/marker.svg?raw';
export { default as IconMaximize } from '@ckeditor/ckeditor5-icons/theme/icons/maximize.svg?raw';
export { default as IconMediaPlaceholder } from '@ckeditor/ckeditor5-icons/theme/icons/media-placeholder.svg?raw';
export { default as IconMedia } from '@ckeditor/ckeditor5-icons/theme/icons/media.svg?raw';
export { default as IconMinimize } from '@ckeditor/ckeditor5-icons/theme/icons/minimize.svg?raw';
export { default as IconMultiLevelList } from '@ckeditor/ckeditor5-icons/theme/icons/multi-level-list.svg?raw';
export { default as IconNextArrow } from '@ckeditor/ckeditor5-icons/theme/icons/next-arrow.svg?raw';
export { default as IconNotification } from '@ckeditor/ckeditor5-icons/theme/icons/notification.svg?raw';
export { default as IconObjectCenter } from '@ckeditor/ckeditor5-icons/theme/icons/object-center.svg?raw';
export { default as IconObjectFullWidth } from '@ckeditor/ckeditor5-icons/theme/icons/object-full-width.svg?raw';
export { default as IconObjectInlineLeft } from '@ckeditor/ckeditor5-icons/theme/icons/object-inline-left.svg?raw';
export { default as IconObjectInlineRight } from '@ckeditor/ckeditor5-icons/theme/icons/object-inline-right.svg?raw';
export { default as IconObjectInline } from '@ckeditor/ckeditor5-icons/theme/icons/object-inline.svg?raw';
export { default as IconObjectLeft } from '@ckeditor/ckeditor5-icons/theme/icons/object-left.svg?raw';
export { default as IconObjectRight } from '@ckeditor/ckeditor5-icons/theme/icons/object-right.svg?raw';
export { default as IconObjectSizeCustom } from '@ckeditor/ckeditor5-icons/theme/icons/object-size-custom.svg?raw';
export { default as IconObjectSizeFull } from '@ckeditor/ckeditor5-icons/theme/icons/object-size-full.svg?raw';
export { default as IconObjectSizeLarge } from '@ckeditor/ckeditor5-icons/theme/icons/object-size-large.svg?raw';
export { default as IconObjectSizeMedium } from '@ckeditor/ckeditor5-icons/theme/icons/object-size-medium.svg?raw';
export { default as IconObjectSizeSmall } from '@ckeditor/ckeditor5-icons/theme/icons/object-size-small.svg?raw';
export { default as IconOneDrive } from '@ckeditor/ckeditor5-icons/theme/icons/onedrive.svg?raw';
export { default as IconOutdated } from '@ckeditor/ckeditor5-icons/theme/icons/outdated.svg?raw';
export { default as IconPageBreak } from '@ckeditor/ckeditor5-icons/theme/icons/page-break.svg?raw';
export { default as IconPaginationExample } from '@ckeditor/ckeditor5-icons/theme/icons/pagination-example.svg?raw';
export { default as IconPaintRollerCursorDefault } from '@ckeditor/ckeditor5-icons/theme/icons/paint-roller-cursor-default.svg?raw';
export { default as IconPaintRollerCursorText } from '@ckeditor/ckeditor5-icons/theme/icons/paint-roller-cursor-text.svg?raw';
export { default as IconPaintRoller } from '@ckeditor/ckeditor5-icons/theme/icons/paint-roller.svg?raw';
export { default as IconPaperClip } from '@ckeditor/ckeditor5-icons/theme/icons/paper-clip.svg?raw';
export { default as IconParagraph } from '@ckeditor/ckeditor5-icons/theme/icons/paragraph.svg?raw';
export { default as IconPen } from '@ckeditor/ckeditor5-icons/theme/icons/pen.svg?raw';
export { default as IconPilcrow } from '@ckeditor/ckeditor5-icons/theme/icons/pilcrow.svg?raw';
export { default as IconPlay } from '@ckeditor/ckeditor5-icons/theme/icons/play.svg?raw';
export { default as IconPlus } from '@ckeditor/ckeditor5-icons/theme/icons/plus.svg?raw';
export { default as IconPreviewMergeFields } from '@ckeditor/ckeditor5-icons/theme/icons/preview-merge-fields.svg?raw';
export { default as IconPreviousArrow } from '@ckeditor/ckeditor5-icons/theme/icons/previous-arrow.svg?raw';
export { default as IconPrint } from '@ckeditor/ckeditor5-icons/theme/icons/print.svg?raw';
export { default as IconProjectLogo } from '@ckeditor/ckeditor5-icons/theme/icons/project-logo.svg?raw';
export { default as IconRedo } from '@ckeditor/ckeditor5-icons/theme/icons/redo.svg?raw';
export { default as IconRefresh } from '@ckeditor/ckeditor5-icons/theme/icons/refresh.svg?raw';
export { default as IconRemoveComment } from '@ckeditor/ckeditor5-icons/theme/icons/remove-comment.svg?raw';
export { default as IconRemoveFormat } from '@ckeditor/ckeditor5-icons/theme/icons/remove-format.svg?raw';
export { default as IconRemove } from '@ckeditor/ckeditor5-icons/theme/icons/remove.svg?raw';
export { default as IconReturnArrow } from '@ckeditor/ckeditor5-icons/theme/icons/return-arrow.svg?raw';
export { default as IconRevisionHistory } from '@ckeditor/ckeditor5-icons/theme/icons/revision-history.svg?raw';
export { default as IconRobotPencil } from '@ckeditor/ckeditor5-icons/theme/icons/robot-pencil.svg?raw';
export { default as IconSelectAll } from '@ckeditor/ckeditor5-icons/theme/icons/select-all.svg?raw';
export { default as IconSelection } from '@ckeditor/ckeditor5-icons/theme/icons/selection.svg?raw';
export { default as IconSettings } from '@ckeditor/ckeditor5-icons/theme/icons/settings.svg?raw';
export { default as IconShowBlocks } from '@ckeditor/ckeditor5-icons/theme/icons/show-blocks.svg?raw';
export { default as IconShowChangesOff } from '@ckeditor/ckeditor5-icons/theme/icons/show-changes-off.svg?raw';
export { default as IconShowChangesOn } from '@ckeditor/ckeditor5-icons/theme/icons/show-changes-on.svg?raw';
export { default as IconSource } from '@ckeditor/ckeditor5-icons/theme/icons/source.svg?raw';
export { default as IconSpecialCharacters } from '@ckeditor/ckeditor5-icons/theme/icons/special-characters.svg?raw';
export { default as IconStop } from '@ckeditor/ckeditor5-icons/theme/icons/stop.svg?raw';
export { default as IconStrikethrough } from '@ckeditor/ckeditor5-icons/theme/icons/strikethrough.svg?raw';
export { default as IconSubmit } from '@ckeditor/ckeditor5-icons/theme/icons/submit.svg?raw';
export { default as IconSubscript } from '@ckeditor/ckeditor5-icons/theme/icons/subscript.svg?raw';
export { default as IconSuperscript } from '@ckeditor/ckeditor5-icons/theme/icons/superscript.svg?raw';
export { default as IconTableCellProperties } from '@ckeditor/ckeditor5-icons/theme/icons/table-cell-properties.svg?raw';
export { default as IconTableColumn } from '@ckeditor/ckeditor5-icons/theme/icons/table-column.svg?raw';
export { default as IconTableMergeCell } from '@ckeditor/ckeditor5-icons/theme/icons/table-merge-cell.svg?raw';
export { default as IconTableOfContents } from '@ckeditor/ckeditor5-icons/theme/icons/table-of-contents.svg?raw';
export { default as IconTableProperties } from '@ckeditor/ckeditor5-icons/theme/icons/table-properties.svg?raw';
export { default as IconTableRow } from '@ckeditor/ckeditor5-icons/theme/icons/table-row.svg?raw';
export { default as IconTable } from '@ckeditor/ckeditor5-icons/theme/icons/table.svg?raw';
export { default as IconTableLayout } from '@ckeditor/ckeditor5-icons/theme/icons/table-layout.svg?raw';
export { default as IconTemplateGeneric } from '@ckeditor/ckeditor5-icons/theme/icons/template-generic.svg?raw';
export { default as IconTemplate } from '@ckeditor/ckeditor5-icons/theme/icons/template.svg?raw';
export { default as IconTextAlternative } from '@ckeditor/ckeditor5-icons/theme/icons/text-alternative.svg?raw';
export { default as IconText } from '@ckeditor/ckeditor5-icons/theme/icons/text.svg?raw';
export { default as IconThreeHorizontalDots } from '@ckeditor/ckeditor5-icons/theme/icons/three-horizontal-dots.svg?raw';
export { default as IconThreeStars } from '@ckeditor/ckeditor5-icons/theme/icons/three-stars.svg?raw';
export { default as IconThreeVerticalDots } from '@ckeditor/ckeditor5-icons/theme/icons/three-vertical-dots.svg?raw';
export { default as IconThumbUp } from '@ckeditor/ckeditor5-icons/theme/icons/thumb-up.svg?raw';
export { default as IconThumbDown } from '@ckeditor/ckeditor5-icons/theme/icons/thumb-down.svg?raw';
export { default as IconTodoList } from '@ckeditor/ckeditor5-icons/theme/icons/todo-list.svg?raw';
export { default as IconTrackChangesAccept } from '@ckeditor/ckeditor5-icons/theme/icons/track-changes-accept.svg?raw';
export { default as IconTrackChangesDiscard } from '@ckeditor/ckeditor5-icons/theme/icons/track-changes-discard.svg?raw';
export { default as IconTrackChanges } from '@ckeditor/ckeditor5-icons/theme/icons/track-changes.svg?raw';
export { default as IconUndo } from '@ckeditor/ckeditor5-icons/theme/icons/undo.svg?raw';
export { default as IconUploadcareImageEdit } from '@ckeditor/ckeditor5-icons/theme/icons/uploadcare-image-edit.svg?raw';
export { default as IconUploadcareImageUpload } from '@ckeditor/ckeditor5-icons/theme/icons/uploadcare-image-upload.svg?raw';
export { default as IconUploadcareLink } from '@ckeditor/ckeditor5-icons/theme/icons/uploadcare-link.svg?raw';
export { default as IconUser } from '@ckeditor/ckeditor5-icons/theme/icons/user.svg?raw';
export { default as IconPin } from '@ckeditor/ckeditor5-icons/theme/icons/pin.svg?raw';
export { default as IconWarning } from '@ckeditor/ckeditor5-icons/theme/icons/warning.svg?raw';
export { default as IconWeb } from '@ckeditor/ckeditor5-icons/theme/icons/web.svg?raw';
