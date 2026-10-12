
import Link from 'next/link';
interface navs {
    id: string,
    slug: string,
    nameBn: string,
    icon: string
}

const NavLinks = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/bazardor/categories');

    if (!res.ok) {
        throw new Error('Failed to fetch categories');
    }

    const navs = await res.json();

    return (
        <nav className="container mx-auto flex gap-4 py-4 items-center">
            {navs.map((n: navs) => (
                <Link
                    key={n.id}
                    href={`/category/${n.slug}`}
                    className="flex items-center hover:bg-gray-300 p-2 rounded-xl " 
                >
                    <span>{n.icon}</span>
                    <span className='capitalize'>{n.slug}</span>
                </Link>
            ))}
        </nav>
    );
};

export default NavLinks;
