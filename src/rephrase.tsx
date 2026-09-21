import {
  Action,
  ActionPanel,
  Detail,
  getSelectedText,
  popToRoot,
} from "@raycast/api";
import { usePromise } from "@raycast/utils";
import { fmTransform, LicenseNotAgreedError } from "./fm";
import { rephraseInstructions } from "./instructions";
import { LicenseDetail } from "./license";

async function rephraseSelection() {
  let original: string;
  try {
    original = await getSelectedText();
  } catch {
    throw new Error("No text selected");
  }
  if (!original.trim()) throw new Error("No text selected");
  return {
    original,
    rephrased: await fmTransform(rephraseInstructions, original),
  };
}

// Drop the finished view so the next launch starts from a clean state instead
// of showing the previous result.
const resetView = () => popToRoot({ clearSearchBar: true });

export default function Rephrase() {
  const { data, isLoading, error } = usePromise(rephraseSelection);

  if (error instanceof LicenseNotAgreedError) {
    return <LicenseDetail />;
  }

  if (error) {
    return <Detail markdown={`## ${error.message}`} />;
  }

  if (!data) {
    return <Detail isLoading={isLoading} markdown="Rephrasing…" />;
  }

  return (
    <Detail
      markdown={`${data.rephrased}\n\n---\n\n_Original:_\n\n> ${data.original.replace(/\n/g, "\n> ")}`}
      actions={
        <ActionPanel>
          <Action.Paste
            title="Replace Selection"
            content={data.rephrased}
            onPaste={resetView}
          />
          <Action.CopyToClipboard
            title="Copy Rephrased Text"
            content={data.rephrased}
            onCopy={resetView}
          />
        </ActionPanel>
      }
    />
  );
}
