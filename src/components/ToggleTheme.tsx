import { FC, useCallback, useMemo } from "react";
import { Icons } from "./Icons";
import { useState } from "react";
import Switch from "react-switch";
import { useTheme } from "next-themes";

const ToggleTheme: FC = () => {
  const { setTheme, theme } = useTheme();

  const toggleTheme = useCallback(() => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, [theme, setTheme]);

  return (
    <div className="flex place-items-center">
      <Switch
        onChange={toggleTheme}
        checked={theme === "light" ? true : false}
        checkedIcon={<Icons.SunIcon style={{ color: "white" }} />}
        uncheckedIcon={<Icons.MoonIcon style={{ color: "white" }} />}
        onColor="#656565"
        offColor="#656565"
      />
    </div>
  );
};

export default ToggleTheme;
