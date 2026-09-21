import { Action, ActionPanel, Detail, getSelectedText } from "@raycast/api";
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
          <Action.Paste title="Replace Selection" content={data.rephrased} />
          <Action.CopyToClipboard
            title="Copy Rephrased Text"
            content={data.rephrased}
          />
        </ActionPanel>
      }
    />
  );
}
