"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export interface MenuItem {
    name: string;
    link?: string;
    icon?: React.ReactNode;
    subItems?: MenuItem[];
}

interface SidebarProps {
    menuItems: MenuItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ menuItems }) => {
    const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

    const toggleCategory = (categoryName: string) => {
        setExpandedCategories(prev =>
            prev.includes(categoryName)
                ? prev.filter(name => name !== categoryName)
                : [...prev, categoryName]
        );
    };

    const ChevronDownIcon = () => (
        <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
            />
        </svg>
    );

    const ChevronUpIcon = () => (
        <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
            />
        </svg>
    );

    const MenuItem = ({ item }: { item: MenuItem }) => {
        const hasSubItems = item.subItems && item.subItems.length > 0;
        const isExpanded = expandedCategories.includes(item.name);

        return (
            <div className="w-full">
                <div
                    className={`flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-100 rounded-md
            ${hasSubItems ? 'text-gray-700' : 'text-gray-600'}`}
                    onClick={() => hasSubItems && toggleCategory(item.name)}
                >
                    <div className="flex items-center gap-2">
                        {item.icon}
                        {item.link ? (
                            <Link href={item.link} className="hover:text-gray-900">
                                {item.name}
                            </Link>
                        ) : (
                            <span>{item.name}</span>
                        )}
                    </div>
                    {hasSubItems && (
                        <div className="text-gray-400">
                            {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
                        </div>
                    )}
                </div>

                {hasSubItems && isExpanded && (
                    <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-200">
                        {item.subItems!.map((subItem, index) => (
                            <MenuItem key={`${subItem.name}-${index}`} item={subItem} />
                        ))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="relative">
            <nav className="p-4 space-y-2">
                {menuItems.map((item, index) => (
                    <MenuItem key={`${item.name}-${index}`} item={item} />
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;