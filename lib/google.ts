/** @format */
import { google } from "googleapis";
import crypto from "node:crypto";

const {
  GOOGLE_CLIENT_EMAIL,
  GOOGLE_PRIVATE_KEY,
  SHEET_ID,
  SHEET_USERS_RANGE = "Users!A:M",
  SHEET_LOGS_RANGE = "Logs!A:I",
  SHEET_SESSIONS_RANGE = "Sessions!A:D",
  SHEET_CREDITS_RANGE = "Credits!A:G",
  SHEET_DEPTS_RANGE = "DEPTS!A:B",
  SHEET_FLAGS_RANGE = "Flags!A:Z",
  SHEET_AUDIT_RANGE = "AdminAudit!A:G",
} = process.env;

export const RANGES = {
  USERS: SHEET_USERS_RANGE,
  LOGS: SHEET_LOGS_RANGE,
  SESSIONS: SHEET_SESSIONS_RANGE,
  CREDITS: SHEET_CREDITS_RANGE,
  DEPTS: SHEET_DEPTS_RANGE,
  FLAGS: SHEET_FLAGS_RANGE,
  AUDIT: SHEET_AUDIT_RANGE,
};

export function getAuth() {
  if (!GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY) {
    throw new Error("Missing GOOGLE_CLIENT_EMAIL / GOOGLE_PRIVATE_KEY");
  }
  return new google.auth.JWT({
    email: GOOGLE_CLIENT_EMAIL,
    key: (GOOGLE_PRIVATE_KEY as string).replace(/\\n/g, "\n"),
    scopes: [
      "https://www.googleapis.com/auth/spreadsheets",
      "https://www.googleapis.com/auth/drive.readonly",
    ],
  });
}

export async function sheetsGet(range: string) {
  if (!SHEET_ID) throw new Error("Missing SHEET_ID");
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range,
    valueRenderOption: "UNFORMATTED_VALUE",
  });
  return res.data;
}
export async function sheetsGetSafe(range: string) {
  try {
    return await sheetsGet(range);
  } catch (e: any) {
    const code = e?.response?.status || e?.code;
    const msg = e?.response?.data?.error?.message || e?.message || "";
    if (code === 400 && /parse range/i.test(msg)) return { values: [] as any[][] };
    if (code === 404) return { values: [] as any[][] };
    throw e;
  }
}

export async function sheetsUpdate(a1Range: string, values: any[][]) {
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });
  await sheets.spreadsheets.values.update({
    spreadsheetId: SHEET_ID!,
    range: a1Range,
    valueInputOption: "RAW",
    requestBody: { values },
  });
}
export async function sheetsAppend(a1Range: string, values: any[][]) {
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });
  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID!,
    range: a1Range,
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values },
  });
}

export function toObjects(values: any[][]) {
  if (!values?.length) return [];
  const header = values[0].map((x) => String(x ?? "").trim());
  return values.slice(1).map((row) => {
    const o: any = {};
    header.forEach((h, i) => (o[h] = row[i]));
    return o;
  });
}

export function toISODate(v: any): string {
  if (!v && v !== 0) return "";
  if (typeof v === "string") {
    const s = v.trim();
    if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.slice(0, 10);
    return "";
  }
  if (typeof v === "number") {
    const ms = Math.round((v - 25569) * 86400 * 1000);
    return new Date(ms).toISOString().slice(0, 10);
  }
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  return "";
}

export function sumBy<T>(arr: T[], pick: (x: T) => number) {
  return arr.reduce((s, x) => s + (Number(pick(x)) || 0), 0);
}

// A1 row range helper
export function a1RowRange(sheetName: string, rowIndex0: number, headerLen: number) {
  const start = rowIndex0 + 1;
  const end = rowIndex0 + 1;
  const lastCol = (n: number) => {
    let s = "",
      x = n;
    while (x > 0) {
      const m = (x - 1) % 26;
      s = String.fromCharCode(65 + m) + s;
      x = Math.floor((x - 1) / 26);
    }
    return s;
  };
  return `${sheetName}!A${start}:${lastCol(headerLen)}${end}`;
}

// Drive
export async function driveGetFileMeta(fileId: string) {
  const auth = getAuth();
  const drive = google.drive({ version: "v3", auth });
  const { data } = await drive.files.get({
    fileId,
    supportsAllDrives: true,
    fields: "id,name,thumbnailLink,webViewLink,createdTime,md5Checksum,mimeType,size",
  });
  return data;
}
export async function driveGetFileReadable(fileId: string) {
  const auth = getAuth();
  const drive = google.drive({ version: "v3", auth });
  const res = await drive.files.get(
    { fileId, alt: "media", supportsAllDrives: true },
    { responseType: "stream" }
  );
  return { stream: res.data as any, headers: res.headers as any };
}
export async function hashStreamMD5(stream: NodeJS.ReadableStream) {
  const h = crypto.createHash("md5");
  return new Promise<string>((resolve, reject) => {
    stream.on("data", (d) => h.update(d));
    stream.on("end", () => resolve(h.digest("hex")));
    stream.on("error", reject);
  });
}
