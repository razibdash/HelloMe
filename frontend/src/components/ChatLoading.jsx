import { Skeleton, Stack } from "@chakra-ui/react";

function ChatLoading() {
  return (
    <Stack className="p-2 rounded-lg shadow">
      <Skeleton height="45px" />
      <Skeleton height="45px" />
      <Skeleton height="45px" />
      <Skeleton height="45px" />
      <Skeleton height="45px" />
      <Skeleton height="45px" />
      <Skeleton height="45px" />
      <Skeleton height="45px" />
      <Skeleton height="45px" />
      <Skeleton height="45px" />
      <Skeleton height="45px" />
    </Stack>
  );
}

export default ChatLoading;
