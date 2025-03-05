import { getSessions } from "@/app/profile/actions";
import { IMultiSessions } from "@/domain/models/MultiSessions";
import { Profile } from "@/domain/models/profile";
import { parseUserAgent } from "@/tipos/parseUserAgent";
import { getToken } from "@/utils/getUserToken";

export default async function ManageMySessions({
  userProfile,
}: {
  userProfile: Profile | null;
}) {
  const listSessions = await getSessions(userProfile?.id ?? 0);
  const currentSessionToken = await getToken();

  const isSessionExpired = (createdAt: Date, minutes: number) => {
    const now = new Date();

    return now.getTime() - createdAt.getTime() >= minutes * 60 * 1000;
  };

  const isCurrentSession = (token: string) => {
    return token === currentSessionToken;
  };

  const getSessionStatus = (session: IMultiSessions) => {
    if (isCurrentSession(session.token)) {
      return "Sesión actual";
    }

    if (isSessionExpired(session.createdAt, 2)) {
      return "Expirado";
    }

    return "Activo";
  };

  return (
    <section className="flex flex-col w-full max-w-md gap-3 border-2 border-gray-300 p-4 rounded-lg">
      <h1>Manage my sessions</h1>
      <ul className="flex flex-col gap-2">
        {listSessions.map((session: IMultiSessions) => {
          const userAgentInfo = parseUserAgent(session.userAgent);
          return (
            <li
              key={session.id}
              className={`
                  p-2 rounded-lg
                  ${isCurrentSession(session.token) && "bg-cyan-300"}
                  ${
                    isSessionExpired(session.createdAt, 2) &&
                    " border border-red-500"
                  }
              `}
            >
              <p>Sistema Operativo {userAgentInfo.os}</p>
              <p>Navegador {userAgentInfo.browser}</p>
              <p>Version {userAgentInfo.browserVersion}</p>
              <p>Estatus: {getSessionStatus(session)}</p>
              <p>
                {session.createdAt.toLocaleDateString("es-MX", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: false,
                })}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
