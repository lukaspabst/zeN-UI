import type { ZenAudioSynthController, ZenUploadedFile } from '../../../lib';
import type { StoryArgValue, StoryEntry } from './storybookCatalog';
import { StorybookStageInteractive } from './StorybookStageInteractive';
import { StorybookStageTelemetry } from './StorybookStageTelemetry';

export interface StorybookStageRendererProps {
  readonly activeStory: StoryEntry;
  readonly currentArgs: Record<string, StoryArgValue>;
  readonly updateArg: (propName: string, nextValue: StoryArgValue) => void;
  readonly chipValues: readonly string[];
  readonly setChipValues: (nextSelected: readonly string[]) => void;
  readonly uploadedFiles: readonly ZenUploadedFile[];
  readonly setUploadedFiles: (nextFiles: readonly ZenUploadedFile[]) => void;
  readonly setSelectedId: (id: string) => void;
  readonly togglePolarity: () => void;
  readonly audio: ZenAudioSynthController;
}

export function StorybookStageRenderer(props: StorybookStageRendererProps) {
  const { category } = props.activeStory;
  if (category === 'data' || category === 'feedback') {
    return <StorybookStageTelemetry {...props} />;
  }
  return <StorybookStageInteractive {...props} />;
}
