import { useCallback, useEffect, useRef, useState } from "react";

type AiMatchStatus = "idle" | "streaming" | "error";

export function useAiMatchStream() {
  const abortRef = useRef<AbortController | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [requirements, setRequirements] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [status, setStatus] = useState<AiMatchStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  const isShowingResult =
    Boolean(markdown) || Boolean(error) || status === "streaming";

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  const clear = useCallback(() => {
    abortRef.current?.abort();
    setRequirements("");
    setMarkdown("");
    setError(null);
    setStatus("idle");
    queueMicrotask(() => textareaRef.current?.focus());
  }, []);

  const match = useCallback(async () => {
    const text = requirements.trim();
    if (!text || status === "streaming") return;

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setError(null);
    setMarkdown("");
    setStatus("streaming");

    try {
      const res = await fetch("/api/ai-match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          messages: [
            {
              id: globalThis.crypto?.randomUUID?.() ?? String(Date.now()),
              role: "user",
              parts: [{ type: "text", text }],
            },
          ],
        }),
      });

      if (!res.ok) {
        const msg = await res.text().catch(() => "Request failed.");
        setStatus("error");
        setError(msg || "Request failed.");
        return;
      }
      if (!res.body) {
        setStatus("error");
        setError("Missing response body.");
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        if (!value) continue;
        setMarkdown((prev) => prev + decoder.decode(value, { stream: true }));
      }

      setStatus("idle");
    } catch (e) {
      if (controller.signal.aborted) return;
      setStatus("error");
      setError(e instanceof Error ? e.message : "Request failed.");
    }
  }, [requirements, status]);

  return {
    textareaRef,
    requirements,
    setRequirements,
    markdown,
    status,
    error,
    isShowingResult,
    match,
    clear,
  };
}
