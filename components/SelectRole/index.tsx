import { Select, SelectProps as MantineSelectProps } from "@mantine/core";

type SelectProps = Omit<MantineSelectProps, "data">;

const roles = [
  {
    value: "USER",
    label: "User",
  },
  {
    value: "SUPPLIER",
    label: "Supplier",
  },
  {
    value: "ADMIN",
    label: "Admin",
  },
];

const SelectRole = (props: SelectProps) => {
  if (props.value === "ADMIN") {
    return <>Admin</>;
  } else {
    return <Select {...props} data={roles} />;
  }
};

export default SelectRole;
