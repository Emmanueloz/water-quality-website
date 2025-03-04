import { getSessions } from "@/app/profile/actions";
import { IMultiSessions } from "@/domain/models/MultiSessions";
import { Profile } from "@/domain/models/profile";
import { getToken } from "@/utils/getUserToken";

export default async function ManageMySessions({
  userProfile,
}: {
  userProfile: Profile | null;
}) {
  const listSessions = await getSessions(userProfile?.id ?? 0);
  const currentSessionToken = await getToken();

  return (
    <section className="flex flex-col w-full max-w-md gap-3 border-2 border-gray-300 p-4 rounded-lg">
      <h1>Manage my sessions</h1>
      <ul>
        {listSessions.map((session: IMultiSessions) => (
          <li
            key={session.id}
            className={`
                    ${session.token === currentSessionToken && "bg-cyan-300"}
                `}
          >
            <p>{session.id}</p>
            <p>{session.userAgent}</p>
            <p>{session.xForwardedFor}</p>
            <p>{session.createdAt.toDateString()}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
