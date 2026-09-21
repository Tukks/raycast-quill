import { execFile } from "child_process";
import { existsSync } from "fs";
import { rm } from "fs/promises";
import { tmpdir } from "os";
import { join } from "path";
import { promisify } from "util";
import { Clipboard, open, showHUD, showToast, Toast } from "@raycast/api";
import { fmOcr, LicenseNotAgreedError } from "./fm";
import { showLicenseToast } from "./license";

const execFileAsync = promisify(execFile);
const SCREEN_RECORDING_SETTINGS =
  "x-apple.systempreferences:com.apple.preference.security?Privacy_ScreenCapture";

export default async function OcrScreenshot() {
  const imagePath = join(tmpdir(), `quill-ocr-${Date.now()}.png`);

  try {
    await execFileAsync("/usr/sbin/screencapture", ["-i", "-x", imagePath]);
    if (!existsSync(imagePath)) return;

    const toast = await showToast({
      style: Toast.Style.Animated,
      title: "Reading text…",
    });
    const text = await fmOcr(imagePath);

    if (!text) {
      toast.style = Toast.Style.Failure;
      toast.title = "No text found";
      return;
    }

    await Clipboard.copy(text);
    await showHUD("Text copied to clipboard");
  } catch (error) {
    if (error instanceof LicenseNotAgreedError) {
      await showLicenseToast();
      return;
    }
    const message = error instanceof Error ? error.message : String(error);
    if (message.includes("could not create image from rect")) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Raycast needs Screen Recording access",
        message: "Enable it, then quit and reopen Raycast.",
        primaryAction: {
          title: "Open Screen Recording Settings",
          onAction: () => open(SCREEN_RECORDING_SETTINGS),
        },
      });
      return;
    }
    await showToast({
      style: Toast.Style.Failure,
      title: "Could not read text",
      message,
    });
  } finally {
    await rm(imagePath, { force: true });
  }
}
