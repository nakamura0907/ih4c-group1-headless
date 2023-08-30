"use client";

import {
  Footer as MantineFooter,
  Header as MantineHeader,
  AppShell,
} from "@mantine/core";
import { ActionIcon } from "@/components/ui/action-icon";
import { Drawer } from "@/components/ui/drawer";
import { Group } from "@/components/ui/group";
import { Image } from "@/components/ui/image";
import { Link } from "@/components/ui/link";
import { Flex } from "@/components/ui/flex";
import { IconMenu2 } from "@/components/ui/icon";
import { siteMeta } from "@/config";
import { useDisclosure } from "@/hooks/useMantine";
import React from "react";

export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Drawer opened={opened} onClose={close}>
        <Flex gap="xl" direction="column">
          <Link href="/">HOME</Link>
          <Link href="/courses/models">モデルコース一覧</Link>
          <Link href="/courses/originals">オリジナルコース一覧</Link>
          <Link href="/courses/originals/create">オリジナルコース作成</Link>
        </Flex>
      </Drawer>

      <AppShell
        padding="md"
        header={<Header onClick={open} />}
        footer={<Footer />}
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        })}
      >
        {children}
      </AppShell>
    </>
  );
};

type HeaderProps = {
  onClick: () => void;
};
const Header: React.FC<HeaderProps> = ({ onClick }) => {
  return (
    <MantineHeader height={90}>
      <Group sx={{ height: "100%" }} px={20} position="apart">
        <Link href="/" className="flex-1">
          <Image
            src="/logo.png"
            alt={`${siteMeta.title} ロゴ`}
            width={300}
            height={75}
            priority
          />
        </Link>
        <ActionIcon size="xl" variant="default" onClick={onClick}>
          <IconMenu2 size="2.125rem" />
        </ActionIcon>
      </Group>
    </MantineHeader>
  );
};

const Footer = () => {
  return (
    <MantineFooter height={60} p="md">
      <small className="flex justify-center">
        Copyright &copy; 2023 {siteMeta.title}
      </small>
    </MantineFooter>
  );
};
