"use client";

import {
  Footer as MantineFooter,
  Header as MantineHeader,
  AppShell,
} from "@mantine/core";
import { ActionIcon } from "@/components/ui/ActionIcon";
import { Drawer } from "@/components/ui/Drawer";
import { Group } from "@/components/ui/Group";
import { Image } from "@/components/ui/Image";
import { Link } from "@/components/ui/Link";
import { Flex } from "@/components/ui/Flex";
import { IconMenu2 } from "@/components/ui/Icon";
import { localImages, routes, siteMeta } from "@/config";
import { useDisclosure } from "@/hooks/useMantine";
import React from "react";

export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Drawer opened={opened} onClose={close}>
        <Flex gap="xl" direction="column">
          <Link href={routes.index.path} onClick={close}>
            {routes.index.name}
          </Link>
          <Link href={routes.courses.models.index.path} onClick={close}>
            {routes.courses.models.index.name}
          </Link>
          <Link href={routes.courses.originals.index.path} onClick={close}>
            {routes.courses.originals.index.name}
          </Link>
          <Link href={routes.courses.originals.create.path} onClick={close}>
            {routes.courses.originals.create.name}
          </Link>
        </Flex>
      </Drawer>

      <AppShell
        padding="xl"
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
        <Link href={routes.index.path} className="flex-1">
          <Image
            src={localImages.logo.path}
            alt={localImages.logo.alt}
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
