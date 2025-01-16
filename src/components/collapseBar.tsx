import Link from "next/link";
import React from "react";

export interface dataLink {
    link: string;
    name: string;
}

type CollapseBarProps = {
    data: dataLink[];
};

const CollapseBar: React.FC<CollapseBarProps> = ({data}) =>{
    return (
        <>
        {data.map((item, index) => (
            <div key={index}>
                <Link href={item.link}>{item.name}</Link>
            </div>
        ))}
        </>
    )
}

export default CollapseBar;
