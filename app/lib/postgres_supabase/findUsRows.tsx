/** Matches Supabase public."FindUs" table columns */
export type FindUsRow = {
  id?: number;
  created_at?: string;
  market_title: string;
  market_address: string;
  date: string;
  time: string;
};

export type CreateFindUsRowInput = {
  market_title: string;
  market_address: string;
  date: string;
  time: string;
};

export type UpdateFindUsRowInput = Partial<CreateFindUsRowInput>;

/** Fetches Find Us rows via API so reads work even when RLS blocks the publishable key. */
export async function fetchFindUsRows(): Promise<FindUsRow[]> {
  const response = await fetch("/api/find-us");

  const payload = (await response.json().catch(() => ({}))) as
    | FindUsRow[]
    | { error?: string };

  if (!response.ok) {
    throw new Error(
      Array.isArray(payload)
        ? "Failed to load locations."
        : (payload.error ?? "Failed to load locations.")
    );
  }

  return payload as FindUsRow[];
}

/** Inserts via server API so admin writes bypass Supabase RLS. */
export async function createFindUsRow(
  row: CreateFindUsRowInput
): Promise<FindUsRow> {
  const response = await fetch("/api/find-us", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(row),
  });

  const payload = (await response.json().catch(() => ({}))) as
    | FindUsRow
    | { error?: string };

  if (!response.ok) {
    throw new Error(
      "error" in payload && payload.error
        ? payload.error
        : "Failed to create location."
    );
  }

  return payload as FindUsRow;
}

async function parseApiError(response: Response, fallback: string): Promise<string> {
  const payload = (await response.json().catch(() => ({}))) as { error?: string };
  return payload.error ?? fallback;
}

export async function updateFindUsRow(
  id: number,
  updates: UpdateFindUsRowInput
): Promise<FindUsRow> {
  const response = await fetch(`/api/find-us/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });

  const payload = (await response.json().catch(() => ({}))) as
    | FindUsRow
    | { error?: string };

  if (!response.ok) {
    throw new Error(
      "error" in payload && payload.error
        ? payload.error
        : await parseApiError(response, "Failed to update location.")
    );
  }

  return payload as FindUsRow;
}

export async function deleteFindUsRow(id: number): Promise<void> {
  const response = await fetch(`/api/find-us/${id}`, { method: "DELETE" });

  if (!response.ok) {
    throw new Error(await parseApiError(response, "Failed to delete location."));
  }
}

/** Formats a Postgres date (YYYY-MM-DD) for display. */
export function formatFindUsDate(date: string): string {
  const parsed = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/** Formats a Postgres time (HH:MM:SS) for display. */
export function formatFindUsTime(time: string): string {
  const match = time.match(/^(\d{1,2}):(\d{2})/);
  if (!match) return time;
  const hours = Number(match[1]);
  const minutes = match[2];
  const period = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 || 12;
  return `${hour12}:${minutes} ${period}`;
}
