export type AttendanceIconKey = "teachers" | "students";
export type AnalyticsIconKey = "classes" | "teachers" | "students" | "exam";
export type FeatureIconKey =
  | "curriculum"
  | "science"
  | "smart-classes"
  | "music"
  | "art"
  | "sports"
  | "ranking"
  | "certified";

export type ApprovalStatus = "approved" | "rejected";
export type FeeStatus = "Paid" | "Pending";
export type BroadcastAudience = "all" | "teachers" | "parents" | "students";

export interface AttendanceSummary {
  id: string;
  title: string;
  percent: number;
  label: string;
  total: string;
  present: string;
  absent: string;
  leave: string;
  color: string;
  totalIcon: AttendanceIconKey;
}

export interface ManagementScheduleItem {
  id: string;
  time: string;
  title: string;
  description: string;
}

export interface ApprovalRequest {
  id: string;
  name: string;
  meta: string;
  date: string;
  status?: ApprovalStatus;
}

export interface DashboardData {
  adminName: string;
  attendance: AttendanceSummary[];
  schedule: ManagementScheduleItem[];
  approvals: ApprovalRequest[];
}

export interface ChatGroup {
  id: string;
  title: string;
  message: string;
  members: string;
  time: string;
  unread?: number;
}

export interface DirectMessage {
  id: string;
  name: string;
  message: string;
  role: string;
  time: string;
  unread?: number;
}

export interface ChatsData {
  groups: ChatGroup[];
  directMessages: DirectMessage[];
  audiences: Array<{ value: BroadcastAudience; label: string }>;
}

export interface AnalyticsStat {
  id: string;
  label: string;
  value: string;
  icon: AnalyticsIconKey;
  chip: string;
}

export interface ClassInsight {
  id: string;
  name: string;
  students: number;
  absent: number;
  teacher: string;
  flaggedStudent?: string;
  flagReason?: string;
}

export interface TeacherInsight {
  id: string;
  name: string;
  subject: string;
  timetable: string;
  classes: string;
  late: number;
  leaves: number;
}

export interface StudentInsight {
  id: string;
  name: string;
  className: string;
  feeStatus: FeeStatus;
  parent?: string;
  contact?: string;
  address?: string;
  marks?: string;
  remarks?: string[];
  award?: string;
}

export interface AnalyticsData {
  stats: AnalyticsStat[];
  classes: ClassInsight[];
  teachers: TeacherInsight[];
  students: StudentInsight[];
}

export interface CalendarEvent {
  id: string;
  title: string;
  time: string;
  date: string;
  category: string;
  iconClass: string;
}

export interface TeacherScheduleRow {
  id: string;
  teacher: string;
  subject: string;
  classes: string[];
  time: string;
}

export interface CalendarData {
  monthLabel: string;
  selectedDay: number;
  days: number[];
  events: CalendarEvent[];
  teacherSchedule: TeacherScheduleRow[];
}

export interface ProfileDetail {
  id: string;
  label: string;
  value: string;
  icon: "admin" | "phone" | "email" | "address";
}

export interface ProfileFeature {
  id: string;
  title: string;
  detail: string;
  icon: FeatureIconKey;
}

export interface SchoolProfileData {
  name: string;
  code: string;
  description: string;
  details: ProfileDetail[];
  timings: string;
  features: ProfileFeature[];
}

export interface BroadcastPayload {
  audience: BroadcastAudience;
  message: string;
}

export interface BroadcastResult {
  id: string;
  status: "queued" | "sent";
  message: string;
}

export interface BroadcastHistoryItem extends BroadcastResult {
  audience: BroadcastAudience;
  createdAt: string;
}

type StoredBroadcast = BroadcastHistoryItem;

const managementFixture = {
  dashboard: {
    adminName: "Public - ID",
    attendance: [
      {
        id: "teacher-attendance",
        title: "Today's Teacher Attendance",
        percent: 92,
        label: "Present",
        total: "68 Total",
        present: "63 Present",
        absent: "3 Absent",
        leave: "2 On Leave",
        color: "#22c55e",
        totalIcon: "teachers",
      },
      {
        id: "student-attendance",
        title: "Today's Student Attendance",
        percent: 88,
        label: "Present",
        total: "1,247 Total",
        present: "1,097 Present",
        absent: "112 Absent",
        leave: "38 On Leave",
        color: "#07885f",
        totalIcon: "students",
      },
    ],
    schedule: [
      { id: "staff-meeting", time: "09:00 AM", title: "Staff Meeting", description: "Monthly review with department heads" },
      { id: "pt-conference", time: "11:00 AM", title: "Parent-Teacher Conference", description: "Grade 10 parents meeting" },
      { id: "board-review", time: "01:00 PM", title: "Board Review", description: "Annual budget presentation" },
      { id: "sports-committee", time: "03:00 PM", title: "Sports Committee", description: "Annual day planning" },
    ],
    approvals: [
      { id: "leave-priya", name: "Ms. Priya Sharma", meta: "Teacher - Sick Leave - 2 days", date: "Feb 19-20" },
      { id: "leave-ravi", name: "Mr. Ravi Kumar", meta: "Staff - Permission - Half day", date: "Feb 19" },
      { id: "leave-anita", name: "Mrs. Anita Desai", meta: "Teacher - Casual Leave - 1 day", date: "Feb 21" },
    ],
  } satisfies DashboardData,
  chats: {
    groups: [
      { id: "all-teachers", title: "All Teachers", message: "Staff meeting at 9 AM tomorrow", members: "68 members", time: "5m ago", unread: 2 },
      { id: "admin-staff", title: "Admin Staff", message: "Budget report uploaded", members: "12 members", time: "1h ago" },
      { id: "grade-10-teachers", title: "Grade 10 Teachers", message: "Exam schedule finalized", members: "8 members", time: "3h ago", unread: 5 },
    ],
    directMessages: [
      { id: "johnson", name: "Mr. Johnson", message: "Leave request approved", role: "Math Teacher", time: "10m ago" },
      { id: "williams", name: "Ms. Williams", message: "Report card ready", role: "English Teacher", time: "30m ago", unread: 1 },
      { id: "lee", name: "Mr. Lee", message: "Lab equipment request", role: "CS Teacher", time: "2h ago" },
    ],
    audiences: [
      { value: "all", label: "All" },
      { value: "teachers", label: "Teachers" },
      { value: "parents", label: "Parents" },
      { value: "students", label: "Students" },
    ],
  } satisfies ChatsData,
  analytics: {
    stats: [
      { id: "classes", label: "Total Classes", value: "42", icon: "classes", chip: "bg-[#07885f]/10 text-[#07885f]" },
      { id: "teachers", label: "Teachers", value: "68", icon: "teachers", chip: "bg-green-500/10 text-green-600" },
      { id: "students", label: "Students", value: "1,247", icon: "students", chip: "bg-cyan-500/10 text-cyan-600" },
      { id: "exam", label: "Avg. Exam %", value: "76.4%", icon: "exam", chip: "bg-amber/10 text-amber" },
    ],
    classes: [
      {
        id: "10-a",
        name: "Class 10-A",
        students: 35,
        absent: 3,
        teacher: "Mr. Johnson",
        flaggedStudent: "Rahul S.",
        flagReason: "Repeated misconduct",
      },
      { id: "10-b", name: "Class 10-B", students: 33, absent: 1, teacher: "Ms. Williams" },
      { id: "9-a", name: "Class 9-A", students: 38, absent: 5, teacher: "Dr. Smith" },
      { id: "9-b", name: "Class 9-B", students: 36, absent: 2, teacher: "Mrs. Davis" },
      { id: "8-a", name: "Class 8-A", students: 40, absent: 4, teacher: "Mr. Lee" },
    ],
    teachers: [
      { id: "johnson", name: "Mr. Johnson", subject: "Mathematics", timetable: "Mon-Fri, 8AM-2PM", classes: "10-A, 9-A", late: 2, leaves: 3 },
      { id: "williams", name: "Ms. Williams", subject: "English", timetable: "Mon-Fri, 8AM-1PM", classes: "10-B, 8-A", late: 0, leaves: 1 },
      { id: "smith", name: "Dr. Smith", subject: "Physics", timetable: "Mon-Fri, 9AM-3PM", classes: "9-A, 10-A", late: 5, leaves: 0 },
      { id: "davis", name: "Mrs. Davis", subject: "History", timetable: "Mon-Thu, 8AM-2PM", classes: "9-B, 10-B", late: 0, leaves: 2 },
    ],
    students: [
      {
        id: "arjun",
        name: "Arjun Kumar",
        className: "Class 10-A",
        feeStatus: "Paid",
        parent: "Mr. Raj Kumar",
        contact: "+91 98765 43210",
        address: "Springfield",
        marks: "82%",
        remarks: ["Math: Excellent", "English: Good"],
        award: "Science Olympiad Gold",
      },
      { id: "priya", name: "Priya Sharma", className: "Class 10-A", feeStatus: "Pending" },
      { id: "vikram", name: "Vikram Singh", className: "Class 9-A", feeStatus: "Paid" },
      { id: "neha", name: "Neha Patel", className: "Class 9-B", feeStatus: "Paid" },
    ],
  } satisfies AnalyticsData,
  calendar: {
    monthLabel: "February 2026",
    selectedDay: 19,
    days: Array.from({ length: 28 }, (_, index) => index + 1),
    events: [
      { id: "staff-meeting", title: "Staff Meeting", time: "09:00 AM", date: "2026-02-19", category: "Meeting", iconClass: "bg-[#07885f]/10 text-[#07885f]" },
      { id: "board-review", title: "Board Review", time: "11:00 AM", date: "2026-02-20", category: "Review", iconClass: "bg-amber/10 text-amber" },
      { id: "parent-teacher-day", title: "Parent-Teacher Day", time: "All Day", date: "2026-02-21", category: "Event", iconClass: "bg-green-500/10 text-green-600" },
      { id: "annual-day-planning", title: "Annual Day Planning", time: "03:00 PM", date: "2026-02-22", category: "Planning", iconClass: "bg-cyan-500/10 text-cyan-600" },
    ],
    teacherSchedule: [
      { id: "johnson", teacher: "Mr. Johnson", subject: "Mathematics", classes: ["10-A", "9-A"], time: "08:00 - 14:00" },
      { id: "williams", teacher: "Ms. Williams", subject: "English", classes: ["10-B", "8-A"], time: "08:30 - 13:00" },
      { id: "smith", teacher: "Dr. Smith", subject: "Physics", classes: ["9-A", "10-A"], time: "09:00 - 15:00" },
      { id: "davis", teacher: "Mrs. Davis", subject: "History", classes: ["9-B", "10-B"], time: "08:00 - 14:00" },
      { id: "lee", teacher: "Mr. Lee", subject: "Computer Science", classes: ["10-A", "8-A"], time: "10:00 - 15:00" },
    ],
  } satisfies CalendarData,
  profile: {
    name: "Springfield International School",
    code: "SIS2024",
    description: "Established 1998 - CBSE Affiliated - Co-Educational",
    details: [
      { id: "admin", label: "Admin Name", value: "Public - ID", icon: "admin" },
      { id: "contact", label: "Contact", value: "+91 98765 43210", icon: "phone" },
      { id: "email", label: "Email", value: "admin@classy.school", icon: "email" },
      { id: "address", label: "Address", value: "123 Education Lane, Springfield, IL 62704", icon: "address" },
    ],
    timings: "08:00 AM - 03:00 PM",
    features: [
      { id: "curriculum", title: "CBSE Curriculum", detail: "Grades 1-12", icon: "curriculum" },
      { id: "science", title: "Science Labs", detail: "6 Advanced Labs", icon: "science" },
      { id: "smart-classes", title: "Smart Classes", detail: "42 Rooms", icon: "smart-classes" },
      { id: "music", title: "Music Academy", detail: "Vocal & Instrumental", icon: "music" },
      { id: "art", title: "Art Studio", detail: "Fine Arts Program", icon: "art" },
      { id: "sports", title: "Sports Complex", detail: "Multi-sport Facility", icon: "sports" },
      { id: "ranking", title: "Top 50 Schools", detail: "State Ranking 2024", icon: "ranking" },
      { id: "certified", title: "ISO Certified", detail: "9001:2015", icon: "certified" },
    ],
  } satisfies SchoolProfileData,
};

const configuredApiBaseUrl = normalizeApiBaseUrl(import.meta.env.VITE_CLASSY_MANAGEMENT_API_URL as string | undefined);
const API_BASE_URL = configuredApiBaseUrl || "/api";
const LOCAL_APPROVALS_KEY = "classy.management.approvals.v1";
const LOCAL_BROADCASTS_KEY = "classy.management.broadcasts.v1";
const MAX_BROADCAST_MESSAGE_LENGTH = 280;
const MAX_STORED_BROADCASTS = 50;
const MAX_MUTATION_ID_LENGTH = 100;
const safeMutationIdPattern = /^[a-zA-Z0-9_.:-]+$/;
const approvalStatuses = new Set<ApprovalStatus>(["approved", "rejected"]);
const broadcastAudiences = new Set<BroadcastAudience>(["all", "teachers", "parents", "students"]);

function normalizeApiBaseUrl(value: string | undefined): string {
  const trimmed = value?.trim();

  if (!trimmed) {
    return "";
  }

  if (trimmed.startsWith("/")) {
    return trimmed.startsWith("//") ? "" : trimmed.replace(/\/+$/, "") || "/";
  }

  try {
    const url = new URL(trimmed);
    if (!["http:", "https:"].includes(url.protocol) || url.username || url.password) {
      return "";
    }

    url.hash = "";
    url.search = "";
    return url.toString().replace(/\/+$/, "");
  } catch {
    return "";
  }
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function getLocalStorage() {
  try {
    return typeof window === "undefined" ? null : window.localStorage;
  } catch {
    return null;
  }
}

function isApprovalStatus(value: unknown): value is ApprovalStatus {
  return typeof value === "string" && approvalStatuses.has(value as ApprovalStatus);
}

function isBroadcastAudience(value: unknown): value is BroadcastAudience {
  return typeof value === "string" && broadcastAudiences.has(value as BroadcastAudience);
}

function readApprovalOverrides(): Record<string, ApprovalStatus> {
  const storage = getLocalStorage();
  if (!storage) {
    return {};
  }

  try {
    const raw = storage.getItem(LOCAL_APPROVALS_KEY);
    if (!raw) {
      return {};
    }

    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return {};
    }

    return Object.entries(parsed).reduce<Record<string, ApprovalStatus>>((overrides, [id, status]) => {
      if (id && id.length <= 100 && isApprovalStatus(status)) {
        overrides[id] = status;
      }

      return overrides;
    }, {});
  } catch {
    return {};
  }
}

function writeJsonStorage(key: string, value: unknown) {
  const storage = getLocalStorage();
  if (!storage) {
    return;
  }

  try {
    storage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage may be disabled or full. The API fallback should still keep the UI usable.
  }
}

function persistLocalApprovalStatus(id: string, status: ApprovalStatus) {
  if (!id || id.length > MAX_MUTATION_ID_LENGTH) {
    return;
  }

  writeJsonStorage(LOCAL_APPROVALS_KEY, {
    ...readApprovalOverrides(),
    [id]: status,
  });
}

function applyLocalApprovalStatuses(data: DashboardData): DashboardData {
  if (configuredApiBaseUrl) {
    return data;
  }

  const overrides = readApprovalOverrides();
  if (Object.keys(overrides).length === 0) {
    return data;
  }

  return {
    ...data,
    approvals: data.approvals.map((approval) => {
      const status = overrides[approval.id];
      return status ? { ...approval, status } : approval;
    }),
  };
}

function readStoredBroadcasts(): StoredBroadcast[] {
  const storage = getLocalStorage();
  if (!storage) {
    return [];
  }

  try {
    const raw = storage.getItem(LOCAL_BROADCASTS_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((entry): entry is StoredBroadcast => {
      if (!entry || typeof entry !== "object") {
        return false;
      }

      const broadcast = entry as Partial<StoredBroadcast>;
      return (
        typeof broadcast.id === "string" &&
        typeof broadcast.createdAt === "string" &&
        typeof broadcast.message === "string" &&
        (broadcast.status === "queued" || broadcast.status === "sent") &&
        isBroadcastAudience(broadcast.audience)
      );
    });
  } catch {
    return [];
  }
}

function persistLocalBroadcast(payload: BroadcastPayload, result: BroadcastResult) {
  const nextEntry: StoredBroadcast = {
    ...result,
    message: payload.message,
    audience: payload.audience,
    createdAt: new Date().toISOString(),
  };

  writeJsonStorage(LOCAL_BROADCASTS_KEY, [nextEntry, ...readStoredBroadcasts()].slice(0, MAX_STORED_BROADCASTS));
}

function normalizeBroadcastPayload(payload: BroadcastPayload): BroadcastPayload {
  const message = payload.message.trim();

  if (!isBroadcastAudience(payload.audience)) {
    throw new Error("Invalid broadcast audience");
  }

  if (!message) {
    throw new Error("Broadcast message is required");
  }

  if (message.length > MAX_BROADCAST_MESSAGE_LENGTH) {
    throw new Error(`Broadcast message must be ${MAX_BROADCAST_MESSAGE_LENGTH} characters or fewer`);
  }

  return { audience: payload.audience, message };
}

function normalizeMutationId(id: string, label: string) {
  const normalized = id.trim();

  if (!normalized) {
    throw new Error(`${label} is required`);
  }

  if (normalized.length > MAX_MUTATION_ID_LENGTH || !safeMutationIdPattern.test(normalized)) {
    throw new Error(`Invalid ${label}`);
  }

  return normalized;
}

function endpoint(path: string) {
  const cleanPath = path.replace(/^\/+/, "");

  if (!configuredApiBaseUrl) {
    return `${API_BASE_URL.replace(/\/+$/, "")}/${cleanPath}.json`;
  }

  return `${API_BASE_URL.replace(/\/+$/, "")}/${cleanPath}`;
}

async function fallback<T>(value: T): Promise<T> {
  await new Promise((resolve) => window.setTimeout(resolve, 80));
  return clone(value);
}

async function requestJson<T>(path: string, localFallback: T, init?: RequestInit): Promise<T> {
  const url = endpoint(path);
  const method = init?.method?.toUpperCase() ?? "GET";

  if (!configuredApiBaseUrl && method !== "GET") {
    return fallback(localFallback);
  }

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 12_000);

  try {
    const response = await fetch(url, {
      ...init,
      credentials: "omit",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...init?.headers,
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      if (!configuredApiBaseUrl) {
        return fallback(localFallback);
      }

      throw new Error(`Management API ${response.status}`);
    }

    return (await response.json()) as T;
  } catch (error) {
    if (!configuredApiBaseUrl) {
      return fallback(localFallback);
    }

    throw error;
  } finally {
    window.clearTimeout(timeout);
  }
}

export async function fetchDashboardData() {
  const data = await requestJson<DashboardData>("/management/dashboard", managementFixture.dashboard);
  return applyLocalApprovalStatuses(data);
}

export function fetchChatsData() {
  return requestJson<ChatsData>("/management/chats", managementFixture.chats);
}

export function fetchBroadcastHistory() {
  if (!configuredApiBaseUrl) {
    return fallback<BroadcastHistoryItem[]>(readStoredBroadcasts());
  }

  return requestJson<BroadcastHistoryItem[]>("/management/broadcasts", []);
}

export function fetchAnalyticsData() {
  return requestJson<AnalyticsData>("/management/analytics", managementFixture.analytics);
}

export function fetchCalendarData() {
  return requestJson<CalendarData>("/management/calendar", managementFixture.calendar);
}

export function fetchSchoolProfileData() {
  return requestJson<SchoolProfileData>("/management/profile", managementFixture.profile);
}

export function updateApprovalStatus(id: string, status: ApprovalStatus) {
  const normalizedId = normalizeMutationId(id, "approval id");

  if (!isApprovalStatus(status)) {
    throw new Error("Invalid approval status");
  }

  if (!configuredApiBaseUrl) {
    persistLocalApprovalStatus(normalizedId, status);
  }

  return requestJson<{ id: string; status: ApprovalStatus }>(
    `/management/approvals/${encodeURIComponent(normalizedId)}`,
    { id: normalizedId, status },
    {
      method: "PATCH",
      body: JSON.stringify({ status }),
    },
  );
}

export async function sendBroadcast(payload: BroadcastPayload) {
  const normalizedPayload = normalizeBroadcastPayload(payload);
  const fallbackResult: BroadcastResult = {
    id: `broadcast-${Date.now()}`,
    status: "queued",
    message: `Broadcast queued for ${normalizedPayload.audience}.`,
  };

  if (!configuredApiBaseUrl) {
    persistLocalBroadcast(normalizedPayload, fallbackResult);
  }

  return requestJson<BroadcastResult>(
    "/management/broadcasts",
    fallbackResult,
    {
      method: "POST",
      body: JSON.stringify(normalizedPayload),
    },
  );
}
