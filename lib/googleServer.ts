/** @format */
import { google } from "googleapis";
import crypto from "node:crypto";

export const runtime = "nodejs";

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

function getAuth() {
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

export async function sheetsGetValues(range: string) {
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

export async function sheetsGetValuesSafe(range: string) {
  try {
    return await sheetsGetValues(range);
  } catch (e: any) {
    const code = e?.response?.status || e?.code;
    const msg = e?.response?.data?.error?.message || e?.message || "";
    if (code === 400 && /parse range/i.test(msg)) return { values: [] as any[][] };
    if (code === 404) return { values: [] as any[][] };
    throw e;
  }
}

async function ensureSheetTab(title: string) {
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });
  const ss = await sheets.spreadsheets.get({ spreadsheetId: SHEET_ID! });
  const exists = ss.data.sheets?.some((s) => s.properties?.title === title);
  if (!exists) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SHEET_ID!,
      requestBody: { requests: [{ addSheet: { properties: { title } } }] },
    });
  }
}

export async function sheetsUpdateRow(a1Range: string, values: any[][]) {
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
  const title = a1Range.split("!")[0].replace(/^'|'$/g, "");
  await ensureSheetTab(title);
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

// 0-based row → A1 range (เต็มแถว)
export function a1RowRange(sheetName: string, rowIndex0: number, headerLen: number) {
  const start = rowIndex0 + 1;
  const end = rowIndex0 + 1;
  const lastColLetter = (n: number) => {
    let s = "",
      x = n;
    while (x > 0) {
      const m = (x - 1) % 26;
      s = String.fromCharCode(65 + m) + s;
      x = Math.floor((x - 1) / 26);
    }
    return s;
  };
  return `${sheetName}!A${start}:${lastColLetter(headerLen)}${end}`;
}

// ---- Drive ----
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
  const hash = crypto.createHash("md5");
  return new Promise<string>((resolve, reject) => {
    stream.on("data", (d) => hash.update(d));
    stream.on("end", () => resolve(hash.digest("hex")));
    stream.on("error", reject);
  });
}

export function sumBy<T>(arr: T[], pick: (x: T) => number) {
  return arr.reduce((s, x) => s + (Number(pick(x)) || 0), 0);
}

export {
  SHEET_ID,
  SHEET_USERS_RANGE,
  SHEET_LOGS_RANGE,
  SHEET_CREDITS_RANGE,
  SHEET_SESSIONS_RANGE,
  SHEET_FLAGS_RANGE,
  SHEET_AUDIT_RANGE,
  SHEET_DEPTS_RANGE,
};
