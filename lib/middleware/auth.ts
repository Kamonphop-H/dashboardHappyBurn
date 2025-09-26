/** @format */

// สำหรับเดโม่: เปิดเสรี (ไม่บังคับล็อกอิน). ถ้าต้องล็อกอิน ค่อยเติมที่นี่ได้
export async function withAuth<T>(fn: () => Promise<T>) {
  return fn();
}
