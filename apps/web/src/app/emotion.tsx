"use client";
import { CacheProvider, MantineProvider } from "@/providers/mantine";
import { Notifications } from "@/components/ui/notifications";
import { useEmotionCache } from "@/hooks/useMantine";
import { useServerInsertedHTML } from "next/navigation";

export default function RootStyleRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const cache = useEmotionCache();
  cache.compat = true;

  useServerInsertedHTML(() => (
    <style
      data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(" ")}`}
      dangerouslySetInnerHTML={{
        __html: Object.values(cache.inserted).join(" "),
      }}
    />
  ));

  return (
    <CacheProvider value={cache}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Notifications />
        {children}
      </MantineProvider>
    </CacheProvider>
  );
}