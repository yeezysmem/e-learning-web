"use client"

import { Category } from "@prisma/client"
import { CategoryItem } from "./category-item";

interface CategoriesProps {
    items: Category[];
}

// const iconMap: Record<Category["name"], IconType> 

export const Categories = ({
    items,
}: CategoriesProps) => {
    return (
        <div className="flex items-center gap-x-2 mt-6 overflow-x-auto pb-2 justify-center">
            {items.map((category) => (
                <CategoryItem key={category.id} label={category.name} value={category.id} />
            ))}
        </div>
    )
}