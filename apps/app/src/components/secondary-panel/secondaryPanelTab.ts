import type { ReactNode } from "react";
import type { SecondaryFileFixedPanelTab } from "@/lib/fixed-panel-tabs-state";

export const PANEL_TAB_DRAG_DISTANCE_PX = 8;

export interface SecondaryPanelTabReorderRequest {
  activeTabId: string;
  overTabId: string;
}

export type SecondaryPanelTabReorderHandler = (
  request: SecondaryPanelTabReorderRequest,
) => void;

export interface SecondaryPanelPaneRenderContext {
  isFocused: boolean;
  onFocusPane: () => void;
}

export interface SecondaryPanelRenderableTab {
  contentFillsRegion?: boolean;
  label: string;
  isHidden?: boolean;
  isPinned?: boolean;
  leadingVisual: ReactNode;
  onClose: () => void;
  onRename?: (title: string) => void;
  onSelect: () => void;
  renderContent: (pane: SecondaryPanelPaneRenderContext) => ReactNode;
  statusLabel: string | null;
  tab: SecondaryFileFixedPanelTab;
}

export const PANEL_TAB_RENAME_MAX_LENGTH = 120;

export function panelTabRenameHandler(
  tab: SecondaryFileFixedPanelTab,
  rename: (args: { tabId: string; title: string }) => void,
): ((title: string) => void) | undefined {
  if (tab.kind !== "plugin-panel" || tab.fileOpenerOwner !== undefined) {
    return undefined;
  }
  return (title) => rename({ tabId: tab.id, title });
}
