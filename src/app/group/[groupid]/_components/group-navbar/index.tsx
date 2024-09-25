"use client"
import { Card, CardContent } from "@/components/ui/card"
import { SAMAWA_CONSTANTS } from "@/constants"
import { useNavigation } from "@/hooks/navigation"
import { cn } from "@/lib/utils"
import Link from "next/link"

type MenuProps = {
  orientation: "mobile" | "desktop",
  groupId: string; // Ensure the groupId is passed as a prop
}

const Menu = ({ orientation, groupId }: MenuProps) => {
  const { section, onSetSection } = useNavigation();
  return (
    <>
      {orientation === "desktop" && (
        <Card className="bg-themeGray border-themeGray bg-clip-padding backdrop--blur__safari backdrop-filter backdrop-blur-2xl bg-opacity-60 p-1 lg:flex md:rounded-xl flex items-center justify-center w-fit">
          <CardContent className="p-0 flex gap-2">
            {SAMAWA_CONSTANTS.groupPageMenu.map((menuItem) => {
              const dynamicPath = menuItem.path === "/courses"
                ? `/group/${groupId}${menuItem.path}` // Inject groupId into path
                : `/group/${groupId}${menuItem.path}`; // Ensure all paths include groupId

              return (
                <Link
                  href={dynamicPath}
                  onClick={() => onSetSection(menuItem.path)}
                  className={cn(
                    "rounded-xl flex gap-2 py-2 px-4 items-center",
                    section === menuItem.path
                      ? "bg-[#09090B] border-[#27272A]"
                      : ""
                  )}
                  key={menuItem.id}
                >
                  {section === menuItem.path && menuItem.icon}
                  {menuItem.label}
                </Link>
              )
            })}
          </CardContent>
        </Card>
      )}

      {orientation === "mobile" && (
        <div className="flex flex-col mt-10">
          {SAMAWA_CONSTANTS.groupPageMenu.map((menuItem) => {
            const dynamicPath = menuItem.path === "/courses"
              ? `/groups/${groupId}${menuItem.path}` // Inject groupId into path for mobile too
              : `/groups/${groupId}${menuItem.path}`;

            return (
              <Link
                href={dynamicPath}
                onClick={() => onSetSection(menuItem.path)}
                className={cn(
                  "rounded-xl flex gap-2 py-2 px-4 items-center",
                  section === menuItem.path ? "bg-themeGray border-[#27272A]" : ""
                )}
                key={menuItem.id}
              >
                {menuItem.icon}
                {menuItem.label}
              </Link>
            )
          })}
        </div>
      )}
    </>
  )
}

export default Menu;

