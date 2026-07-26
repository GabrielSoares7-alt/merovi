import Image from "next/image";
import { TEAM } from "@/lib/team";

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

/**
 * Renders every entry in lib/team.ts. One member today reads as a founder
 * spotlight; adding more entries later (a "Nossa Equipe" page) just stacks
 * more of the same card — no layout rewrite needed.
 */
export function Team() {
  return (
    <div className="flex flex-col gap-10">
      {TEAM.map((member) => (
        <div
          key={member.id}
          className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8"
        >
          {member.photo ? (
            <Image
              src={member.photo}
              alt={member.name}
              width={member.photoWidth ?? 400}
              height={member.photoHeight ?? 500}
              className="w-full max-w-[220px] shrink-0 rounded-2xl object-cover grayscale sm:w-56"
            />
          ) : (
            <div
              aria-hidden="true"
              className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full border border-white/10 bg-surface text-2xl font-bold"
            >
              {getInitials(member.name)}
            </div>
          )}
          <div className="flex flex-col gap-3">
            <div>
              <h2 className="text-xl font-semibold">{member.name}</h2>
              <p className="text-sm text-muted">{member.role}</p>
            </div>
            <p className="text-muted">{member.bio}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
