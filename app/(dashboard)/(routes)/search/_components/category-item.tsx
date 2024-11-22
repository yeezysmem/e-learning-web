"use client";
import { cn } from "@/lib/utils";
import qs from "query-string";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
interface CategoryItemProps {
  label: string;
  value?: string;
}
("");

export const CategoryItem = ({ label, value }: CategoryItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategoryId = searchParams.get("categoryId");
  const currentTitle = searchParams.get("title");

  const isSelected = currentCategoryId === value;

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title: currentTitle,
          categoryId: isSelected ? null : value,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );
    router.push(url);
  };
  return (
    <button
      onClick={onClick}
      className={cn(
        "py-2 px-3 text-sm border border-black rounded-full flex items-center gap-x-1 bg-white",
        "transition-colors duration-300 ease-in-out",
        "hover:bg-purple-700 hover:text-white",
        isSelected && "text-white bg-[#222]"
      )}
      type="button"
    >
      <label className="truncate cursor-pointer">{label}</label>
    </button>
  );
};
