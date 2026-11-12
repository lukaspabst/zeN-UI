import {
  STORYBOOK_CORE_CATALOG,
  type StoryArgValue,
  type StoryCategory,
  type StoryControlType,
  type StoryEntry,
  type StoryPropDef,
} from './storybookCatalogCore';
import { STORYBOOK_DATA_CATALOG } from './storybookCatalogData';

export type {
  StoryArgValue,
  StoryCategory,
  StoryControlType,
  StoryEntry,
  StoryPropDef,
};

export const STORYBOOK_CATALOG: readonly StoryEntry[] = [
  ...STORYBOOK_CORE_CATALOG,
  ...STORYBOOK_DATA_CATALOG,
];

export const CATEGORY_FILTERS: readonly { readonly id: StoryCategory; readonly label: string }[] = [
  { id: 'all', label: 'All (51)' },
  { id: 'actions', label: 'Actions & Icons (5)' },
  { id: 'forms', label: 'Forms (10)' },
  { id: 'navigation', label: 'Navigation (6)' },
  { id: 'overlays', label: 'Surfaces & Overlays (10)' },
  { id: 'data', label: 'Data & Telemetry (10)' },
  { id: 'feedback', label: 'Feedback & AI (10)' },
];

export function buildInitialArgs(): Record<string, Record<string, StoryArgValue>> {
  const map: Record<string, Record<string, StoryArgValue>> = {};
  for (const story of STORYBOOK_CATALOG) {
    const entryArgs: Record<string, StoryArgValue> = {};
    for (const prop of story.propDefs) {
      entryArgs[prop.name] = prop.defaultValue;
    }
    map[story.id] = entryArgs;
  }
  return map;
}
