import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Affix as MantineAffix, Button, Transition } from "@mantine/core";

const Affix = () => {
  const router = useRouter();
  const { data: session } = useSession();

  if (
    session?.role === "USER" ||
    router.asPath.startsWith("/admin") ||
    router.asPath.startsWith("/supplier")
  ) {
    return <></>;
  }

  const handleAffixClick = () => {
    if (session?.role === "ADMIN") {
      return router.push("/admin");
    }

    return router.push("/supplier");
  };

  return (
    <MantineAffix position={{ bottom: 20, right: 20 }}>
      <Transition transition="slide-up" mounted={true}>
        {(transitionStyles) => (
          <Button
            color="teal"
            style={transitionStyles}
            onClick={handleAffixClick}
          >
            {session?.role === "ADMIN"
              ? "Go to Admin Panel"
              : "Go to your Supplier Page"}
          </Button>
        )}
      </Transition>
    </MantineAffix>
  );
};

export default Affix;
