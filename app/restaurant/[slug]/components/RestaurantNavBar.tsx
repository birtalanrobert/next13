import Link from "next/link";

export default function RestaurantNavBar({slug}: {slug: string}) {
  return (
    <nav className="flex text-reg border-b pb-2">
      <Link href={`/restaurants/${slug}`} className="mr-7">
        Overview
      </Link>
      <Link href={`/restaurants/${slug}/menu`} className="mr-7">
        Menu
      </Link>
    </nav>
  );
}
