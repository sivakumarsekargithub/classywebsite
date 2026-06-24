import { useEffect, useMemo, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import {
  AlertTriangle,
  Award,
  BarChart3,
  BookOpen,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Eye,
  FlaskConical,
  Globe2,
  GraduationCap,
  Hash,
  House,
  LogOut,
  Mail,
  MapPin,
  Megaphone,
  MessageCircle,
  Music2,
  Palette,
  Phone,
  Plus,
  School,
  Search,
  Send,
  Shield,
  Star,
  Trophy,
  TrendingUp,
  UserRound,
  UsersRound,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  fetchAnalyticsData,
  fetchBroadcastHistory,
  fetchCalendarData,
  fetchChatsData,
  fetchDashboardData,
  fetchSchoolProfileData,
  sendBroadcast,
  updateApprovalStatus,
  type AnalyticsIconKey,
  type ApprovalRequest,
  type AttendanceIconKey,
  type AttendanceSummary,
  type BroadcastAudience,
  type BroadcastHistoryItem,
  type CalendarData,
  type CalendarEvent,
  type FeatureIconKey,
  type ManagementScheduleItem,
  type SchoolProfileData,
} from "@/lib/managementApi";
import { cn } from "@/lib/utils";

type ManagementScreen = "dashboard" | "institute" | "chat" | "schedule" | "profile";
type AnalyticsTab = "classes" | "teachers" | "students";
type CalendarTab = "events" | "schedule";

const managementBasePath = "/management";

const screenAliases: Record<string, ManagementScreen> = {
  home: "dashboard",
  dashboard: "dashboard",
  institute: "institute",
  analytics: "institute",
  chat: "chat",
  chats: "chat",
  communication: "chat",
  communications: "chat",
  schedule: "schedule",
  calendar: "schedule",
  profile: "profile",
  codes: "institute",
  users: "institute",
};

const navItems: Array<{ id: ManagementScreen; label: string; path: string; icon: typeof House }> = [
  { id: "dashboard", label: "Home", path: managementBasePath, icon: House },
  { id: "institute", label: "Institute", path: `${managementBasePath}/institute`, icon: Building2 },
  { id: "chat", label: "Chat", path: `${managementBasePath}/chat`, icon: MessageCircle },
  { id: "schedule", label: "Schedule", path: `${managementBasePath}/schedule`, icon: CalendarDays },
  { id: "profile", label: "Profile", path: `${managementBasePath}/profile`, icon: UserRound },
];

const attendanceIconMap: Record<AttendanceIconKey, typeof UsersRound> = {
  teachers: UsersRound,
  students: GraduationCap,
};

const analyticsIconMap: Record<AnalyticsIconKey, typeof BookOpen> = {
  classes: BookOpen,
  teachers: UsersRound,
  students: GraduationCap,
  exam: TrendingUp,
};

const profileDetailIconMap = {
  admin: School,
  phone: Phone,
  email: Mail,
  address: MapPin,
};

const featureIconMap: Record<FeatureIconKey, typeof BookOpen> = {
  curriculum: BookOpen,
  science: FlaskConical,
  "smart-classes": Globe2,
  music: Music2,
  art: Palette,
  sports: Trophy,
  ranking: Star,
  certified: Award,
};

const analyticsStatStyleMap: Record<string, string> = {
  classes: "bg-[#07885f]/10 text-[#07885f]",
  teachers: "bg-emerald-500/10 text-emerald-600",
  students: "bg-cyan-500/10 text-cyan-600",
  exam: "bg-amber/10 text-amber",
};

const calendarEventStyleMap: Record<string, string> = {
  Meeting: "bg-[#07885f]/10 text-[#07885f]",
  Review: "bg-amber/10 text-amber",
  Event: "bg-emerald-500/10 text-emerald-600",
  Planning: "bg-cyan-500/10 text-cyan-600",
};

const managementQueryOptions = {
  staleTime: 60_000,
  retry: 1,
};

const academyName = "Silver Lynx Academy";
const academyFullName = "Silver Lynx International Academy";

const managementScreenMeta: Record<ManagementScreen, { title: string; subtitle: string }> = {
  dashboard: {
    title: "Management Command Center",
    subtitle: "",
  },
  institute: {
    title: "Institute Operational Directory",
    subtitle: "Manage classrooms, teachers, and students",
  },
  chat: {
    title: "Broadcast & Direct Hub",
    subtitle: "Communicate with staff and departments",
  },
  schedule: {
    title: "Institutional Master Calendar",
    subtitle: "Overarching schedule control",
  },
  profile: {
    title: "Institution Profile",
    subtitle: "Administrative identity and settings",
  },
};

export function ManagementUsersPage() {
  const { screen } = useParams();
  const currentScreen = screenAliases[screen ?? "dashboard"];

  if (!currentScreen) {
    return <Navigate to={managementBasePath} replace />;
  }

  return (
    <div className="min-h-screen bg-[#eef3f9] font-body text-slate-950 [&_h1]:font-body [&_h2]:font-body [&_h3]:font-body [&_h4]:font-body">
      <ManagementSidebar currentScreen={currentScreen} />
      <div className="min-h-screen lg:pl-[18.25rem]">
        <ManagementTopbar currentScreen={currentScreen} />
        <main className="min-w-0 px-4 pb-28 pt-5 sm:px-6 lg:px-8 lg:pb-8">
          <div className="w-full">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3 lg:hidden">
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-slate-500 transition-colors hover:text-[#07885f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07885f]/40"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                Website
              </Link>
              <span className="rounded-full bg-[#07885f]/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#07885f]">
                Management
              </span>
            </div>
            {currentScreen === "dashboard" && <DashboardScreen />}
            {currentScreen === "chat" && <ChatsScreen />}
            {currentScreen === "institute" && <AnalyticsScreen />}
            {currentScreen === "schedule" && <CalendarScreen />}
            {currentScreen === "profile" && <ProfileScreen />}
          </div>
        </main>
      </div>
      <MobileManagementNav currentScreen={currentScreen} />
    </div>
  );
}

function ManagementSidebar({ currentScreen }: { currentScreen: ManagementScreen }) {
  const navigate = useNavigate();
  const logout = () => {
    try {
      Object.keys(window.localStorage)
        .filter((key) => key.startsWith("classy.management."))
        .forEach((key) => window.localStorage.removeItem(key));
      window.sessionStorage.removeItem("classy.management.session");
    } catch {
      // Storage can be unavailable in private browsing; navigation still logs out of the local console.
    }

    navigate("/", { replace: true });
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[18.25rem] flex-col overflow-hidden border-r border-white/10 bg-[#111b2f] text-white lg:flex">
      <Link
        to={managementBasePath}
        className="flex min-h-[6.5rem] items-center gap-3 border-b border-white/10 px-7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#24d6a2]/50"
        aria-label="Classy admin home"
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#07885f] shadow-[0_14px_28px_rgba(7,136,95,0.28)]">
          <Shield className="h-7 w-7" strokeWidth={2.4} aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-2xl font-extrabold leading-none tracking-normal">CLASSY</p>
          <p className="mt-1 truncate text-xs font-extrabold uppercase tracking-[0.22em] text-[#5ee0b8]">Admin Panel</p>
        </div>
      </Link>
      <nav aria-label="Management screens" className="flex-1 space-y-4 overflow-y-auto px-4 py-7">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = currentScreen === item.id;
          return (
            <Link
              key={item.id}
              to={item.path}
              className={cn(
                "group flex min-h-[3.75rem] items-center gap-4 rounded-lg px-5 text-xl font-extrabold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#24d6a2]/50",
                active
                  ? "bg-[#07885f] text-white shadow-[0_18px_32px_rgba(7,136,95,0.26)]"
                  : "text-[#93aaa5] hover:bg-white/5 hover:text-white",
              )}
              aria-current={active ? "page" : undefined}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center">
                <Icon className="h-6 w-6" strokeWidth={active ? 2.6 : 2.2} aria-hidden="true" />
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-white/10 p-5">
        <div className="mb-4 flex min-w-0 items-center gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-[#b8f4df] bg-[#dffcf2] text-lg font-extrabold text-[#07885f]">
            M
          </span>
          <div className="min-w-0">
            <p className="truncate text-base font-extrabold text-white">Management User</p>
            <p className="truncate text-sm font-bold text-[#5ee0b8]">Director</p>
          </div>
        </div>
        <button
          type="button"
          onClick={logout}
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-rose-300/30 bg-rose-500/15 px-3 text-sm font-extrabold text-rose-200 transition-colors hover:bg-rose-500/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-200/50"
        >
          <LogOut className="h-4 w-4" aria-hidden="true" />
          Logout
        </button>
      </div>
    </aside>
  );
}

function ManagementTopbar({ currentScreen }: { currentScreen: ManagementScreen }) {
  const today = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
  const meta = managementScreenMeta[currentScreen];
  const subtitle = meta.subtitle || today;

  return (
    <header className="sticky top-0 z-30 border-b border-[#dbe3ee] bg-white/95 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold leading-tight text-slate-950">{meta.title}</h1>
          <p className="mt-1 text-base font-semibold text-slate-500">{subtitle}</p>
        </div>
        <div className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-[#b9f1db] bg-[#ecfff8] px-4 text-sm font-extrabold text-[#07885f]">
          <Shield className="h-5 w-5" strokeWidth={2.4} aria-hidden="true" />
          {academyName}
        </div>
      </div>
    </header>
  );
}

function MobileManagementNav({ currentScreen }: { currentScreen: ManagementScreen }) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 shadow-[0_-8px_24px_rgba(15,23,42,0.06)] backdrop-blur lg:hidden" aria-label="Management bottom navigation">
      <div className="mx-auto grid max-w-xl grid-cols-5 px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = currentScreen === item.id;
          return (
            <Link
              key={item.id}
              to={item.path}
              className={cn(
                "flex min-h-14 flex-col items-center justify-center gap-1 rounded-lg text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07885f]/40",
                active ? "text-[#07885f]" : "text-slate-500 hover:text-slate-900",
              )}
              aria-current={active ? "page" : undefined}
            >
              <span className="flex h-7 w-7 items-center justify-center">
                <Icon className="h-6 w-6" strokeWidth={active ? 2.5 : 2} aria-hidden="true" />
              </span>
              <span className="leading-none">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

function ScreenHeader({ title, eyebrow, action }: { title: string; eyebrow?: string; action?: React.ReactNode }) {
  return (
    <header className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="font-body text-3xl font-extrabold tracking-normal text-slate-950 sm:text-4xl">{title}</h1>
        {eyebrow && <p className="mt-2 text-base font-semibold text-slate-500 sm:text-lg">{eyebrow}</p>}
      </div>
      {action}
    </header>
  );
}

function AppCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return <section className={cn("min-w-0 rounded-lg border border-[#dbe3ee] bg-white p-5 shadow-[0_12px_32px_rgba(15,23,42,0.04)] sm:p-6", className)}>{children}</section>;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-5 text-sm font-extrabold uppercase tracking-[0.14em] text-slate-500">{children}</h2>;
}

function ScreenLoading({ title }: { title: string }) {
  return (
    <>
      <ScreenHeader title={title} />
      <div className="grid gap-5">
        {[0, 1, 2].map((item) => (
          <AppCard key={item}>
            <div className="h-4 w-32 animate-pulse rounded-full bg-slate-200" />
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="h-24 animate-pulse rounded-lg bg-slate-100" />
              <div className="h-24 animate-pulse rounded-lg bg-slate-100" />
            </div>
          </AppCard>
        ))}
      </div>
    </>
  );
}

function ScreenError({ title, onRetry }: { title: string; onRetry: () => void }) {
  return (
    <>
      <ScreenHeader title={title} />
      <AppCard>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-slate-950">Unable to load data</h2>
            <p className="mt-1 text-sm font-medium text-slate-500">The management API did not respond. Check the connection and try again.</p>
          </div>
          <Button type="button" onClick={onRetry} className="min-h-11 rounded-lg bg-[#07885f] px-5 hover:bg-[#067552]">
            Retry
          </Button>
        </div>
      </AppCard>
    </>
  );
}

function DashboardScreen() {
  const dashboardQuery = useQuery({
    queryKey: ["management", "dashboard"],
    queryFn: fetchDashboardData,
    ...managementQueryOptions,
  });

  if (dashboardQuery.isLoading) {
    return <ScreenLoading title="Dashboard" />;
  }

  if (dashboardQuery.isError || !dashboardQuery.data) {
    return <ScreenError title="Dashboard" onRetry={() => void dashboardQuery.refetch()} />;
  }

  const dashboard = dashboardQuery.data;
  const studentAttendance = dashboard.attendance.find((card) => card.totalIcon === "students") ?? dashboard.attendance[0];
  const teacherAttendance = dashboard.attendance.find((card) => card.totalIcon === "teachers") ?? dashboard.attendance[0];

  return (
    <div className="space-y-5">
      <DashboardHero adminName={dashboard.adminName} />
      <div className="grid gap-5 xl:grid-cols-2">
        <StudentAttendanceToday card={studentAttendance} />
        <TeacherAttendanceToday card={teacherAttendance} />
      </div>
      <div className="grid gap-5 xl:grid-cols-[1.6fr_0.8fr]">
        <InstitutionalScheduleCard items={dashboard.schedule} />
        <InstituteControlCard />
      </div>
      <div>
        <PendingApprovals approvals={dashboard.approvals} />
      </div>
    </div>
  );
}

function parseDisplayNumber(value: string) {
  const match = value.match(/[\d,]+/);
  return match ? match[0] : value;
}

function DashboardHero({ adminName }: { adminName: string }) {
  const now = new Date();
  const dayStamp = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(now);
  const timeStamp = new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(now);

  return (
    <AppCard className="mb-5">
      <div className="grid gap-5 sm:grid-cols-[auto_1fr] sm:items-center lg:grid-cols-[auto_1fr_auto]">
        <span className="flex h-20 w-20 items-center justify-center rounded-lg bg-[#07885f] text-white shadow-[0_16px_32px_rgba(7,136,95,0.2)]">
          <Building2 className="h-11 w-11" strokeWidth={2.2} aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <h2 className="text-2xl font-extrabold leading-tight text-slate-950 sm:text-3xl">{academyFullName}</h2>
          <p className="mt-2 text-base font-semibold text-slate-500 sm:text-lg">Welcome, {adminName} - Director</p>
        </div>
        <div className="rounded-lg bg-[#f5f8fc] p-4 text-left sm:col-span-2 lg:col-span-1 lg:min-w-56 lg:text-right">
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-slate-400">System Timestamp</p>
          <p className="mt-1 text-3xl font-extrabold text-[#07885f]">{dayStamp}</p>
          <p className="mt-1 text-sm font-semibold text-slate-500">{timeStamp}</p>
        </div>
      </div>
    </AppCard>
  );
}

function AttendanceCard({
  title,
  percent,
  label,
  total,
  present,
  absent,
  leave,
  color,
  totalIcon,
}: AttendanceSummary) {
  const TotalIcon = attendanceIconMap[totalIcon] ?? UsersRound;

  return (
    <AppCard>
      <SectionTitle>{title}</SectionTitle>
      <div className="grid items-center gap-6 sm:grid-cols-[minmax(150px,0.9fr)_1.1fr]">
        <div className="flex flex-col items-center justify-center">
          <div
            className="flex h-36 w-36 items-center justify-center rounded-full"
            style={{ background: `conic-gradient(${color} ${percent * 3.6}deg, #e2e8f0 0deg)` }}
            aria-label={`${percent}% ${label}`}
          >
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white">
              <span className="text-3xl font-extrabold text-slate-950">{percent}%</span>
            </div>
          </div>
          <p className="mt-4 text-lg font-bold text-slate-500">{label}</p>
        </div>
        <dl className="space-y-4 text-xl font-semibold text-slate-950">
          <AttendanceStat icon={TotalIcon} label={total} className="text-slate-500" />
          <AttendanceStat icon={CheckCircle2} label={present} className="text-green-500" />
          <AttendanceStat icon={XCircle} label={absent} className="text-red-500" />
          <AttendanceStat icon={AlertTriangle} label={leave} className="text-amber" />
        </dl>
      </div>
    </AppCard>
  );
}

function AttendanceStat({ icon: Icon, label, className }: { icon: typeof UsersRound; label: string; className?: string }) {
  return (
    <div className="flex items-center gap-3">
      <Icon className={cn("h-6 w-6 shrink-0", className)} aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

function StudentAttendanceToday({ card }: { card: AttendanceSummary }) {
  return (
    <AppCard>
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-xl font-extrabold text-slate-950">
          <UsersRound className="h-6 w-6 text-[#07885f]" aria-hidden="true" />
          Student Attendance Today
        </h2>
        <span className="rounded-full bg-[#d8fff0] px-3 py-1 text-xs font-extrabold text-[#07885f]">Live</span>
      </div>
      <div className="grid gap-6 sm:grid-cols-[10rem_1fr] sm:items-center">
        <div className="flex justify-center">
          <div
            className="flex h-36 w-36 items-center justify-center rounded-full"
            style={{ background: `conic-gradient(#07885f ${card.percent * 3.6}deg, #e5eaf1 0deg)` }}
            aria-label={`${card.percent}% present`}
          >
            <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-white">
              <span className="text-3xl font-extrabold text-[#07885f]">{card.percent}%</span>
              <span className="text-xs font-bold text-slate-400">Present</span>
            </div>
          </div>
        </div>
        <dl className="space-y-4 text-base font-semibold">
          <DashboardMetric label="Total Students" value={parseDisplayNumber(card.total)} />
          <DashboardMetric label="Present Today" value={parseDisplayNumber(card.present)} valueClassName="text-[#07885f]" />
          <DashboardMetric label="Absent" value={parseDisplayNumber(card.absent)} valueClassName="text-red-500" />
        </dl>
      </div>
    </AppCard>
  );
}

function TeacherAttendanceToday({ card }: { card: AttendanceSummary }) {
  return (
    <AppCard>
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-xl font-extrabold text-slate-950">
          <UsersRound className="h-6 w-6 text-[#07885f]" aria-hidden="true" />
          Teacher Attendance Today
        </h2>
        <span className="rounded-full bg-[#d8fff0] px-3 py-1 text-xs font-extrabold text-[#07885f]">Live</span>
      </div>
      <div className="mt-8">
        <p className="text-5xl font-extrabold text-[#0b9f9a]">
          {parseDisplayNumber(card.present)}
          <span className="ml-3 text-2xl text-slate-400">/ {parseDisplayNumber(card.total)}</span>
        </p>
        <div className="mt-6 h-4 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-[#0b9f9a]" style={{ width: `${card.percent}%` }} />
        </div>
        <div className="mt-4 flex flex-wrap gap-5 text-sm font-semibold text-slate-500">
          <span className="inline-flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#0b9f9a]" />
            Checked In
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-slate-300" />
            Yet to Check In
          </span>
        </div>
      </div>
    </AppCard>
  );
}

function DashboardMetric({ label, value, valueClassName }: { label: string; value: string; valueClassName?: string }) {
  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-4">
      <dt className="text-slate-500">{label}</dt>
      <dd className={cn("text-lg font-extrabold text-slate-950", valueClassName)}>{value}</dd>
    </div>
  );
}

function InstitutionalScheduleCard({ items }: { items: ManagementScheduleItem[] }) {
  const rowStyles = [
    "border-blue-200 bg-blue-100 text-blue-800",
    "border-blue-200 bg-blue-100 text-blue-800",
    "border-yellow-300 bg-yellow-100 text-yellow-800",
    "border-yellow-300 bg-yellow-100 text-yellow-800",
  ];

  return (
    <AppCard>
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-xl font-extrabold text-slate-950">
          <CalendarDays className="h-6 w-6 text-[#07885f]" aria-hidden="true" />
          Today's Institutional Schedule
        </h2>
        <span className="text-base font-semibold text-slate-400">{items.length} events</span>
      </div>
      <div className="space-y-3">
        {items.map((item, index) => (
          <article key={item.id} className={cn("grid gap-3 rounded-lg border px-4 py-4 sm:grid-cols-[7rem_1fr_auto]", rowStyles[index % rowStyles.length])}>
            <time className="text-base font-extrabold">{item.time}</time>
            <div className="min-w-0">
              <h3 className="text-lg font-extrabold leading-tight text-slate-950">{item.title}</h3>
              <p className="mt-1 text-base font-semibold text-slate-500">{item.description}</p>
            </div>
            <span className="h-fit rounded-md bg-white px-3 py-1 text-xs font-extrabold uppercase text-blue-700">
              {index < 2 ? "Meeting" : "Event"}
            </span>
          </article>
        ))}
      </div>
    </AppCard>
  );
}

function InstituteControlCard() {
  return (
    <AppCard className="flex flex-col">
      <h2 className="mb-5 flex items-center gap-2 text-xl font-extrabold text-slate-950">
        <Shield className="h-6 w-6 text-[#07885f]" aria-hidden="true" />
        Institute Control
      </h2>
      <div className="flex min-h-56 flex-1 flex-col items-center justify-center rounded-lg bg-slate-100 p-6 text-center">
        <span className="text-6xl font-extrabold text-[#07885f]">24</span>
        <span className="mt-2 text-lg font-semibold text-slate-500">Total Classrooms</span>
      </div>
      <Link
        to={`${managementBasePath}/institute`}
        className="mt-5 inline-flex min-h-14 items-center justify-center gap-2 rounded-lg bg-[#07885f] px-5 text-lg font-extrabold text-white transition-colors hover:bg-[#067552] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07885f]/40"
      >
        <Building2 className="h-5 w-5" aria-hidden="true" />
        Manage Institute
        <ChevronRight className="h-5 w-5" aria-hidden="true" />
      </Link>
    </AppCard>
  );
}

function ScheduleCard({ items }: { items: ManagementScheduleItem[] }) {
  return (
    <AppCard>
      <SectionTitle>Management Schedule</SectionTitle>
      <div className="relative space-y-8 before:absolute before:left-3 before:top-3 before:h-[calc(100%-1.5rem)] before:w-px before:bg-slate-200">
        {items.map((item) => (
          <div key={item.id} className="relative grid grid-cols-[2.25rem_1fr] gap-3">
            <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-white">
              <span className="h-3 w-3 rounded-full bg-[#07885f]" />
            </span>
            <div>
              <p className="flex items-center gap-2 text-sm font-bold text-slate-500">
                <Clock3 className="h-4 w-4" aria-hidden="true" />
                {item.time}
              </p>
              <h3 className="mt-1 text-lg font-extrabold text-slate-950">{item.title}</h3>
              <p className="text-base text-slate-500">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </AppCard>
  );
}

function PendingApprovals({ approvals }: { approvals: ApprovalRequest[] }) {
  const queryClient = useQueryClient();
  const [handled, setHandled] = useState<Record<string, "approved" | "rejected">>({});
  const [actionError, setActionError] = useState("");
  const approvalMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: "approved" | "rejected" }) => updateApprovalStatus(id, status),
    onSuccess: ({ id, status }) => {
      setActionError("");
      setHandled((prev) => ({ ...prev, [id]: status }));
      queryClient.setQueryData(["management", "dashboard"], (current: { approvals?: ApprovalRequest[] } | undefined) => {
        if (!current?.approvals) {
          return current;
        }

        return {
          ...current,
          approvals: current.approvals.map((approval) => (approval.id === id ? { ...approval, status } : approval)),
        };
      });
    },
    onError: () => {
      setActionError("Could not update approval. Please try again.");
    },
  });

  return (
    <AppCard>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-xl font-extrabold text-slate-950">
          <AlertTriangle className="h-6 w-6 text-[#07885f]" aria-hidden="true" />
          Pending Approvals Control Tower
        </h2>
        <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-extrabold text-red-600">
          {approvals.filter((approval) => !(approval.status ?? handled[approval.id])).length} pending
        </span>
      </div>
      {actionError && <p className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-600">{actionError}</p>}
      <div className="space-y-4">
        {approvals.map((approval, index) => {
          const status = approval.status ?? handled[approval.id];
          const updating = approvalMutation.isPending && approvalMutation.variables?.id === approval.id;
          const isJoining = index % 2 === 0;
          return (
            <article key={approval.id} className="grid gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4 sm:grid-cols-[3.75rem_1fr_auto] sm:items-center">
              <span className={cn("flex h-14 w-14 items-center justify-center rounded-lg", isJoining ? "bg-red-100 text-red-500" : "bg-yellow-100 text-yellow-600")}>
                {isJoining ? <UsersRound className="h-7 w-7" aria-hidden="true" /> : <Clock3 className="h-7 w-7" aria-hidden="true" />}
              </span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-extrabold text-slate-950">{approval.name}</h3>
                  <span className={cn("rounded-md px-2 py-1 text-xs font-extrabold uppercase", isJoining ? "bg-red-100 text-red-500" : "bg-yellow-100 text-yellow-700")}>
                    {isJoining ? "Joining" : "Leave"}
                  </span>
                  {!status && isJoining && <AlertTriangle className="h-4 w-4 text-red-500" aria-hidden="true" />}
                </div>
                <p className="mt-1 text-base font-semibold text-slate-500">{approval.meta}</p>
                <p className="mt-1 text-sm font-semibold text-slate-400">{approval.date}</p>
                {status && (
                  <Badge className={cn("mt-3 capitalize", status === "approved" ? "bg-green-500" : "bg-red-500")}>
                    {status}
                  </Badge>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3 sm:min-w-56">
                <Button
                  type="button"
                  className="min-h-11 rounded-lg bg-[#e4fff4] text-base font-extrabold text-[#07885f] hover:bg-[#ccf7e7]"
                  disabled={updating}
                  onClick={() => approvalMutation.mutate({ id: approval.id, status: "approved" })}
                >
                  {updating ? "Saving" : "Accept"}
                </Button>
                <Button
                  type="button"
                  className="min-h-11 rounded-lg bg-red-50 text-base font-extrabold text-red-500 hover:bg-red-100"
                  disabled={updating}
                  onClick={() => approvalMutation.mutate({ id: approval.id, status: "rejected" })}
                >
                  Decline
                </Button>
              </div>
            </article>
          );
        })}
      </div>
    </AppCard>
  );
}

type ChatThreadKind = "broadcast" | "department" | "teacher";

interface ChatThread {
  id: string;
  kind: ChatThreadKind;
  title: string;
  subtitle: string;
  count?: string;
  unread?: number;
}

interface ThreadMessage {
  id: string;
  author: string;
  initials: string;
  body: string;
  time: string;
  mine?: boolean;
}

interface BroadcastCard {
  id: string;
  title: string;
  time: string;
  body: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
}

const chatThreads: ChatThread[] = [
  { id: "broadcast", kind: "broadcast", title: "Broadcast Feed", subtitle: "Announcements", unread: 3 },
  { id: "science", kind: "department", title: "Science Department", subtitle: "Department channel", count: "12" },
  { id: "mathematics", kind: "department", title: "Mathematics Department", subtitle: "Department channel", count: "8" },
  { id: "languages", kind: "department", title: "Languages Department", subtitle: "Department channel", count: "10" },
  { id: "physical-education", kind: "department", title: "Physical Education", subtitle: "Department channel", count: "5" },
  { id: "arts", kind: "department", title: "Arts & Music", subtitle: "Department channel", count: "6" },
  { id: "administration", kind: "department", title: "Administration", subtitle: "Department channel", count: "7" },
  { id: "priya-sharma", kind: "teacher", title: "Ms. Priya Sharma", subtitle: "Mathematics" },
  { id: "arvind-kumar", kind: "teacher", title: "Mr. Arvind Kumar", subtitle: "Physics" },
  { id: "leena-bose", kind: "teacher", title: "Ms. Leena Bose", subtitle: "Chemistry" },
  { id: "rajan-verma", kind: "teacher", title: "Mr. Rajan Verma", subtitle: "Physical Education" },
  { id: "kavita-patel", kind: "teacher", title: "Ms. Kavita Patel", subtitle: "English" },
];

const initialThreadMessages: Record<string, ThreadMessage[]> = {
  mathematics: [
    {
      id: "math-1",
      author: "Ms. Leena Bose",
      initials: "ML",
      body: "Good morning Dr. Raghavan, I wanted to discuss the upcoming lab equipment procurement.",
      time: "09:15 AM",
    },
    {
      id: "math-2",
      author: "Management User",
      initials: "M",
      body: "Good morning, Leena. Please send me the detailed proposal by end of day today. I will review it before the board meeting.",
      time: "09:22 AM",
      mine: true,
    },
    {
      id: "math-3",
      author: "Ms. Leena Bose",
      initials: "ML",
      body: "Thank you, sir. I will prepare the document and share it with the accounts department as well.",
      time: "09:28 AM",
    },
  ],
  science: [
    {
      id: "science-1",
      author: "Mr. Arvind Kumar",
      initials: "AK",
      body: "The physics lab inventory has been updated. Please review the replacement request when possible.",
      time: "08:50 AM",
    },
  ],
  arts: [
    {
      id: "arts-1",
      author: "Ms. Leena Bose",
      initials: "ML",
      body: "The arts showcase schedule is ready for approval.",
      time: "10:05 AM",
    },
  ],
  "priya-sharma": [
    {
      id: "priya-1",
      author: "Ms. Priya Sharma",
      initials: "PS",
      body: "Grade 10-A attendance report is complete for today.",
      time: "08:35 AM",
    },
  ],
  "arvind-kumar": [
    {
      id: "arvind-1",
      author: "Mr. Arvind Kumar",
      initials: "AK",
      body: "I have shared the physics assessment marks for approval.",
      time: "11:10 AM",
    },
  ],
};

const initialBroadcastCards: BroadcastCard[] = [
  {
    id: "broadcast-fire-drill",
    title: "Emergency Fire Drill",
    time: "10:30 AM",
    body: "All staff must participate in the emergency fire drill scheduled for 4:00 PM today. Please guide students to the assembly point.",
    priority: "HIGH",
  },
  {
    id: "broadcast-staff-meeting",
    title: "Staff Meeting Reminder",
    time: "Yesterday",
    body: "Monthly staff meeting will be held tomorrow at 3:00 PM in Conference Hall A. Attendance is mandatory.",
    priority: "MEDIUM",
  },
  {
    id: "broadcast-holiday",
    title: "Holiday Announcement",
    time: "2 days ago",
    body: "School will remain closed on Friday for the regional festival. Classes will resume on Monday.",
    priority: "LOW",
  },
];

function queueManagementWebNotification(title: string, body: string) {
  const payload = {
    id: `management-notification-${Date.now()}`,
    title,
    body,
    createdAt: new Date().toISOString(),
  };

  try {
    const raw = window.localStorage.getItem("classy.management.notifications.v1");
    const current = raw ? (JSON.parse(raw) as unknown) : [];
    const list = Array.isArray(current) ? current : [];
    window.localStorage.setItem("classy.management.notifications.v1", JSON.stringify([payload, ...list].slice(0, 30)));
    window.dispatchEvent(new CustomEvent("classy:management-notification", { detail: payload }));
  } catch {
    // Notifications are a progressive enhancement; failed storage should not block messaging.
  }

  if ("Notification" in window && window.Notification.permission === "granted") {
    new window.Notification(title, { body });
  }
}

function ChatsScreen() {
  const queryClient = useQueryClient();
  const [activeThreadId, setActiveThreadId] = useState("broadcast");
  const [conversationMessages, setConversationMessages] = useState<Record<string, ThreadMessage[]>>(initialThreadMessages);
  const [messageDraft, setMessageDraft] = useState("");
  const [messageError, setMessageError] = useState("");
  const [broadcastTitle, setBroadcastTitle] = useState("");
  const [broadcastBody, setBroadcastBody] = useState("");
  const [audience, setAudience] = useState<BroadcastAudience>("all");
  const [broadcastCards, setBroadcastCards] = useState(initialBroadcastCards);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const chatsQuery = useQuery({
    queryKey: ["management", "chats"],
    queryFn: fetchChatsData,
    ...managementQueryOptions,
  });
  const broadcastHistoryQuery = useQuery({
    queryKey: ["management", "broadcasts"],
    queryFn: fetchBroadcastHistory,
    enabled: activeThreadId === "broadcast",
    ...managementQueryOptions,
  });
  const broadcastMutation = useMutation({
    mutationFn: sendBroadcast,
    onSuccess: (result, variables) => {
      const nextEntry: BroadcastHistoryItem = {
        ...result,
        message: variables.message,
        audience: variables.audience,
        createdAt: new Date().toISOString(),
      };
      queryClient.setQueryData<BroadcastHistoryItem[]>(["management", "broadcasts"], (current = []) => {
        const deduped = current.filter((entry) => entry.id !== nextEntry.id);
        return [nextEntry, ...deduped].slice(0, 5);
      });
      void queryClient.invalidateQueries({ queryKey: ["management", "broadcasts"] });
    },
    onError: () => {
      setMessageError("Could not send broadcast. Please try again.");
    },
  });

  const activeThread = chatThreads.find((thread) => thread.id === activeThreadId) ?? chatThreads[0];
  const savedBroadcastCards = useMemo<BroadcastCard[]>(
    () =>
      (broadcastHistoryQuery.data ?? []).map((item) => ({
        id: item.id,
        title: `${item.audience.charAt(0).toUpperCase()}${item.audience.slice(1)} announcement`,
        time: formatBroadcastTime(item.createdAt),
        body: item.message,
        priority: item.status === "sent" ? "LOW" : "MEDIUM",
      })),
    [broadcastHistoryQuery.data],
  );
  const visibleBroadcasts = [...broadcastCards, ...savedBroadcastCards].filter(
    (item, index, list) => list.findIndex((entry) => entry.id === item.id) === index,
  );
  const threadMessages = conversationMessages[activeThread.id] ?? [];
  const threadMessageCount = threadMessages.length;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ block: "end" });
  }, [activeThreadId, threadMessageCount]);

  const openThread = (thread: ChatThread) => {
    setActiveThreadId(thread.id);
    setMessageDraft("");
    setMessageError("");
  };

  const submitMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = messageDraft.trim();

    if (!trimmed) {
      setMessageError("Enter a message before sending.");
      return;
    }

    const nextMessage: ThreadMessage = {
      id: `message-${Date.now()}`,
      author: "Management User",
      initials: "M",
      body: trimmed.slice(0, 500),
      time: new Intl.DateTimeFormat("en-IN", { hour: "2-digit", minute: "2-digit" }).format(new Date()),
      mine: true,
    };

    setConversationMessages((current) => ({
      ...current,
      [activeThread.id]: [...(current[activeThread.id] ?? []), nextMessage],
    }));
    setMessageDraft("");
    setMessageError("");
    queueManagementWebNotification(`New message in ${activeThread.title}`, trimmed.slice(0, 120));
  };

  const submitBroadcast = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const title = broadcastTitle.trim() || "Broadcast announcement";
    const body = broadcastBody.trim();

    if (!body) {
      setMessageError("Enter an announcement before sending.");
      return;
    }

    const trimmedBody = body.slice(0, 280);
    const nextBroadcast: BroadcastCard = {
      id: `broadcast-${Date.now()}`,
      title: title.slice(0, 90),
      time: "Just now",
      body: trimmedBody,
      priority: "LOW",
    };

    setBroadcastCards((current) => [nextBroadcast, ...current].slice(0, 8));
    setBroadcastTitle("");
    setBroadcastBody("");
    setMessageError("");
    broadcastMutation.mutate({ audience, message: trimmedBody });
    queueManagementWebNotification(`Broadcast for ${audience}`, trimmedBody.slice(0, 120));
  };

  if (chatsQuery.isLoading) {
    return <ScreenLoading title="Broadcast & Direct Hub" />;
  }

  if (chatsQuery.isError || !chatsQuery.data) {
    return <ScreenError title="Broadcast & Direct Hub" onRetry={() => void chatsQuery.refetch()} />;
  }

  return (
    <>
      <div className="grid min-h-[calc(100vh-15rem)] overflow-hidden rounded-lg border border-[#dbe3ee] bg-white shadow-[0_12px_32px_rgba(15,23,42,0.04)] xl:grid-cols-[21rem_1fr_16rem]">
        <aside className="min-h-0 border-b border-[#dbe3ee] p-4 xl:border-b-0 xl:border-r">
          <h2 className="text-2xl font-extrabold text-slate-950">Staff Directory</h2>
          <p className="mt-1 text-base font-semibold text-slate-500">Direct messaging access</p>
          <div className="managementDesignNav mt-5 space-y-3">
            <ChatDirectoryButton thread={chatThreads[0]} active={activeThread.id === "broadcast"} onSelect={() => openThread(chatThreads[0])} />
          </div>
          <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.16em] text-slate-400">Departments</p>
          <div className="managementDesignNav mt-3 space-y-1">
            {chatThreads
              .filter((thread) => thread.kind === "department")
              .map((thread) => (
                <ChatDirectoryButton key={thread.id} thread={thread} active={activeThread.id === thread.id} onSelect={() => openThread(thread)} />
              ))}
          </div>
          <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.16em] text-slate-400">Teachers</p>
          <div className="managementDesignNav mt-3 max-h-64 space-y-1 overflow-y-auto pr-1 xl:max-h-none">
            {chatThreads
              .filter((thread) => thread.kind === "teacher")
              .map((thread) => (
                <ChatDirectoryButton key={thread.id} thread={thread} active={activeThread.id === thread.id} onSelect={() => openThread(thread)} />
              ))}
          </div>
        </aside>

        <section className="flex min-h-[36rem] min-w-0 flex-col bg-[#f8fafc]">
          <header className="flex min-h-20 items-center justify-between gap-3 border-b border-[#dbe3ee] bg-white px-5">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#07885f]/10 text-[#07885f]">
                {activeThread.kind === "broadcast" ? <Megaphone className="h-6 w-6" aria-hidden="true" /> : <Hash className="h-6 w-6" aria-hidden="true" />}
              </span>
              <div className="min-w-0">
                <h2 className="truncate text-2xl font-extrabold text-slate-950">{activeThread.kind === "broadcast" ? "Broadcast Channel" : activeThread.title}</h2>
                <p className="truncate text-base font-semibold text-slate-500">
                  {activeThread.kind === "broadcast" ? "Send announcements to all staff members" : activeThread.count ? `${activeThread.count} members` : activeThread.subtitle}
                </p>
              </div>
            </div>
            <span className="flex h-10 w-10 items-center justify-center rounded-full text-slate-500">
              <Shield className="h-5 w-5" aria-hidden="true" />
            </span>
          </header>

          <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">
            <div className="mb-5 grid grid-cols-[1fr_auto_1fr] items-center gap-4 text-center text-sm font-extrabold text-slate-400">
              <span className="h-px bg-slate-200" />
              Today
              <span className="h-px bg-slate-200" />
            </div>
            {activeThread.kind === "broadcast" ? (
              <div className="space-y-4">
                {visibleBroadcasts.map((item) => (
                  <BroadcastFeedCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <div className="space-y-5">
                {threadMessages.length === 0 && (
                  <p className="rounded-lg bg-white px-4 py-3 text-sm font-semibold text-slate-500">No messages in this thread yet.</p>
                )}
                {threadMessages.map((message) => (
                  <ChatBubble key={message.id} message={message} />
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {activeThread.kind === "broadcast" ? (
            <form className="border-t border-[#dbe3ee] bg-white p-4" onSubmit={submitBroadcast}>
              <div className="grid gap-3">
                <Input
                  value={broadcastTitle}
                  onChange={(event) => {
                    setBroadcastTitle(event.target.value);
                    setMessageError("");
                  }}
                  placeholder="Broadcast title..."
                  aria-label="Broadcast title"
                  maxLength={90}
                  className="h-12 rounded-lg border-slate-200 bg-white text-base"
                />
                <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_11rem_5.5rem]">
                  <Input
                    value={broadcastBody}
                    onChange={(event) => {
                      setBroadcastBody(event.target.value);
                      setMessageError("");
                    }}
                    placeholder="Type your announcement..."
                    aria-label="Broadcast announcement"
                    maxLength={280}
                    className="h-12 rounded-lg border-slate-200 bg-white text-base"
                  />
                  <select
                    className="h-12 rounded-lg border border-slate-200 bg-white px-3 text-sm font-bold text-slate-700 outline-none focus:border-[#07885f] focus:ring-2 focus:ring-[#07885f]/20"
                    value={audience}
                    aria-label="Broadcast audience"
                    onChange={(event) => setAudience(event.target.value as BroadcastAudience)}
                  >
                    {chatsQuery.data.audiences.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                  <Button type="submit" className="min-h-12 rounded-lg bg-[#07885f] px-4 text-base hover:bg-[#067552]" disabled={broadcastMutation.isPending}>
                    <Send className="h-5 w-5" aria-hidden="true" />
                  </Button>
                </div>
              </div>
              {messageError && <p className="mt-2 text-sm font-semibold text-red-600">{messageError}</p>}
            </form>
          ) : (
            <form className="managementMessageComposer border-t border-[#dbe3ee] bg-white p-4" onSubmit={submitMessage}>
              <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_8rem]">
                <Input
                  name="content"
                  value={messageDraft}
                  onChange={(event) => {
                    setMessageDraft(event.target.value);
                    setMessageError("");
                  }}
                  placeholder="Type a message..."
                  aria-label={`Message ${activeThread.title}`}
                  maxLength={500}
                  className="h-12 rounded-lg border-slate-200 bg-white text-base"
                />
                <Button type="submit" className="min-h-12 rounded-lg bg-[#07885f] px-5 text-base hover:bg-[#067552]">
                  <Send className="h-5 w-5" aria-hidden="true" />
                  Send
                </Button>
              </div>
              {messageError && <p className="mt-2 text-sm font-semibold text-red-600">{messageError}</p>}
            </form>
          )}
        </section>

        <aside className="hidden border-l border-[#dbe3ee] bg-white p-5 xl:block">
          <div className="flex flex-col items-center text-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-lg bg-indigo-50 text-indigo-500">
              {activeThread.kind === "broadcast" ? <Megaphone className="h-10 w-10" aria-hidden="true" /> : <UsersRound className="h-10 w-10" aria-hidden="true" />}
            </span>
            <h3 className="mt-5 text-xl font-extrabold text-slate-950">{activeThread.kind === "broadcast" ? "Broadcast Channel" : activeThread.title}</h3>
            <p className="mt-2 text-base font-semibold text-slate-500">
              {activeThread.kind === "broadcast" ? `${visibleBroadcasts.length} announcements` : activeThread.count ? `${activeThread.count} members` : activeThread.subtitle}
            </p>
            <div className="mt-6 w-full rounded-lg bg-slate-50 p-4 text-left">
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-slate-400">Notifications</p>
              <p className="mt-2 text-sm font-semibold text-slate-600">New sent items are stored locally and dispatched as web notifications when browser permissions allow it.</p>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

function ChatDirectoryButton({ thread, active, onSelect }: { thread: ChatThread; active: boolean; onSelect: () => void }) {
  const Icon = thread.kind === "broadcast" ? Megaphone : thread.kind === "department" ? Building2 : UserRound;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "grid min-h-14 w-full grid-cols-[2rem_1fr_auto] items-center gap-3 rounded-lg px-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07885f]/40",
        active ? "bg-[#eaf2ff] text-indigo-600" : "text-slate-500 hover:bg-slate-50 hover:text-slate-950",
        thread.kind === "broadcast" && active && "border border-[#8af2cc] bg-[#e9fff6] text-[#07885f]",
      )}
      aria-pressed={active}
    >
      <span className="flex h-8 w-8 items-center justify-center">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-base font-extrabold">{thread.title}</span>
        {thread.kind === "teacher" && <span className="block truncate text-xs font-bold text-slate-400">{thread.subtitle}</span>}
      </span>
      {thread.unread ? (
        <span className="flex h-8 min-w-8 items-center justify-center rounded-full bg-red-500 px-2 text-sm font-extrabold text-white">{thread.unread}</span>
      ) : (
        thread.count && <span className="text-base font-extrabold text-slate-400">{thread.count}</span>
      )}
    </button>
  );
}

function BroadcastFeedCard({ item }: { item: BroadcastCard }) {
  const priorityClassName =
    item.priority === "HIGH"
      ? "bg-red-100 text-red-600"
      : item.priority === "MEDIUM"
        ? "bg-amber-100 text-amber-600"
        : "bg-emerald-50 text-[#07885f]";

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-[0_10px_24px_rgba(15,23,42,0.03)] sm:p-5">
      <div className="grid gap-3 sm:grid-cols-[3rem_1fr_auto]">
        <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50 text-indigo-500">
          <Megaphone className="h-6 w-6" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <h3 className="break-words text-xl font-extrabold text-slate-950">{item.title}</h3>
          <p className="mt-1 text-sm font-bold text-slate-400">{item.time}</p>
          <p className="mt-3 break-words text-base font-semibold leading-relaxed text-slate-600">{item.body}</p>
        </div>
        <span className={cn("h-fit rounded-lg px-3 py-1 text-xs font-extrabold", priorityClassName)}>{item.priority}</span>
      </div>
    </article>
  );
}

function ChatBubble({ message }: { message: ThreadMessage }) {
  return (
    <div className={cn("managementChatBubbleRow flex gap-3", message.mine ? "justify-end" : "justify-start")}>
      {!message.mine && (
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e4fff4] text-sm font-extrabold text-[#07885f]">
          {message.initials}
        </span>
      )}
      <div className={cn("max-w-[min(46rem,82%)]", message.mine && "text-right")}>
        {!message.mine && <p className="mb-2 text-base font-extrabold text-slate-500">{message.author}</p>}
        <p
          className={cn(
            "break-words rounded-lg px-5 py-4 text-base font-semibold leading-relaxed shadow-[0_12px_24px_rgba(15,23,42,0.04)]",
            message.mine ? "bg-[#07885f] text-white" : "border border-slate-200 bg-white text-slate-950",
          )}
        >
          {message.body}
        </p>
        <time className="mt-2 block text-sm font-semibold text-slate-400">{message.time}</time>
      </div>
    </div>
  );
}

function MessageRow({
  title,
  subtitle,
  meta,
  time,
  unread,
  icon,
}: {
  title: string;
  subtitle: string;
  meta: string;
  time: string;
  unread?: number;
  icon: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className="grid w-full grid-cols-[4rem_1fr_auto] items-center gap-3 rounded-lg p-3 text-left transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07885f]/40"
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#07885f]/10 text-[#07885f]">{icon}</span>
      <span className="min-w-0">
        <span className="block text-lg font-extrabold leading-tight text-slate-950">{title}</span>
        <span className="mt-1 block text-base font-medium leading-snug text-slate-500">{subtitle}</span>
        <span className="mt-2 block text-sm font-medium text-slate-500">{meta}</span>
      </span>
      <span className="self-start text-right text-sm font-semibold text-slate-500">
        {time}
        {Boolean(unread) && <span className="mt-3 flex h-8 min-w-8 items-center justify-center rounded-full bg-[#07885f] px-2 text-sm font-extrabold text-white">{unread}</span>}
      </span>
    </button>
  );
}

function BroadcastHistoryList({ items, loading }: { items: BroadcastHistoryItem[]; loading: boolean }) {
  return (
    <div className="mt-6 border-t border-slate-200 pt-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-base font-extrabold text-slate-950">Recent broadcasts</h3>
        {loading && <span className="text-sm font-semibold text-slate-500">Updating...</span>}
      </div>
      {items.length === 0 ? (
        <p className="rounded-lg bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-500">Sent broadcasts will appear here.</p>
      ) : (
        <div className="space-y-3">
          {items.slice(0, 5).map((item) => (
            <article key={item.id} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <Badge className="bg-[#07885f] text-white capitalize">{item.audience}</Badge>
                <time className="text-xs font-bold uppercase tracking-wide text-slate-400" dateTime={item.createdAt}>
                  {formatBroadcastTime(item.createdAt)}
                </time>
              </div>
              <p className="mt-3 break-words text-base font-semibold leading-relaxed text-slate-700">{item.message}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

function formatBroadcastTime(value: string) {
  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return "Just now";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(parsed);
}

function AnalyticsScreen() {
  const [activeTab, setActiveTab] = useState<AnalyticsTab>("classes");
  const [expandedClass, setExpandedClass] = useState("");
  const [expandedTeacher, setExpandedTeacher] = useState("");
  const [expandedStudent, setExpandedStudent] = useState("");
  const [directorySearch, setDirectorySearch] = useState("");
  const analyticsQuery = useQuery({
    queryKey: ["management", "analytics"],
    queryFn: fetchAnalyticsData,
    ...managementQueryOptions,
  });

  const searchTerm = directorySearch.toLowerCase();
  const filteredClasses = useMemo(
    () => (analyticsQuery.data?.classes ?? []).filter((item) => `${item.name} ${item.teacher}`.toLowerCase().includes(searchTerm)),
    [analyticsQuery.data?.classes, searchTerm],
  );
  const filteredTeachers = useMemo(
    () => (analyticsQuery.data?.teachers ?? []).filter((item) => `${item.name} ${item.subject}`.toLowerCase().includes(searchTerm)),
    [analyticsQuery.data?.teachers, searchTerm],
  );
  const filteredStudents = useMemo(
    () => (analyticsQuery.data?.students ?? []).filter((student) => `${student.name} ${student.className}`.toLowerCase().includes(searchTerm)),
    [analyticsQuery.data?.students, searchTerm],
  );

  if (analyticsQuery.isLoading) {
    return <ScreenLoading title="Institute" />;
  }

  if (analyticsQuery.isError || !analyticsQuery.data) {
    return <ScreenError title="Institute" onRetry={() => void analyticsQuery.refetch()} />;
  }

  const analytics = analyticsQuery.data;
  const classStat = analytics.stats.find((stat) => stat.id === "classes");
  const teacherStat = analytics.stats.find((stat) => stat.id === "teachers");
  const studentStat = analytics.stats.find((stat) => stat.id === "students");
  const statTabs = [
    { id: "classes" as const, label: "Total Classes", value: classStat?.value ?? String(analytics.classes.length), icon: Building2, accent: "text-[#07885f]" },
    { id: "teachers" as const, label: "Total Teachers", value: teacherStat?.value ?? String(analytics.teachers.length), icon: UsersRound, accent: "text-[#07885f]" },
    { id: "students" as const, label: "Total Students", value: studentStat?.value ?? String(analytics.students.length), icon: GraduationCap, accent: "text-indigo-500" },
  ];
  const searchPlaceholder =
    activeTab === "classes"
      ? "Search classes by name or code..."
      : activeTab === "teachers"
        ? "Search teachers by name or subject..."
        : "Search students by name or roll number...";

  return (
    <div className="space-y-5">
      <div className="grid gap-4 lg:grid-cols-3">
        {statTabs.map((stat) => (
          <InstituteStatCard
            key={stat.id}
            active={activeTab === stat.id}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            accent={stat.accent}
            onClick={() => {
              setActiveTab(stat.id);
              setDirectorySearch("");
            }}
          />
        ))}
      </div>

      <SearchField value={directorySearch} onChange={setDirectorySearch} placeholder={searchPlaceholder} className="mt-0" />

      <AppCard>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-extrabold text-slate-950">
            {activeTab === "classes" && "Classroom Directory"}
            {activeTab === "teachers" && "Teacher Staff Directory"}
            {activeTab === "students" && "Student Roster"}
          </h2>
          <span className="text-base font-extrabold text-slate-400">
            {activeTab === "classes" && `${filteredClasses.length} classes`}
            {activeTab === "teachers" && `${filteredTeachers.length} teachers`}
            {activeTab === "students" && `${filteredStudents.length} students shown`}
          </span>
        </div>

        {activeTab === "classes" && (
          <div className="grid gap-4 xl:grid-cols-2">
            {filteredClasses.map((item, index) => {
              const expanded = expandedClass === item.id;
              return (
                <article
                  key={item.id}
                  className={cn("overflow-hidden rounded-lg border border-slate-200 bg-white transition-colors", expanded && "border-[#07885f]/60 bg-[#f4fffb]")}
                >
                  <button
                    type="button"
                    onClick={() => setExpandedClass(expanded ? "" : item.id)}
                    className="grid w-full grid-cols-[3.5rem_1fr_auto] items-center gap-4 p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#07885f]/40"
                    aria-expanded={expanded}
                  >
                    <AvatarInitials label={item.teacher} />
                    <span className="min-w-0">
                      <span className="flex flex-wrap items-center gap-2 text-lg font-extrabold text-slate-950">
                        {item.name}
                        <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-extrabold text-slate-500">GR{10 - (index % 3)}-{String.fromCharCode(65 + index)}</span>
                      </span>
                      <span className="mt-1 block text-base font-semibold text-slate-500">{item.teacher}</span>
                      <span className="mt-2 inline-flex rounded-full bg-[#e4fff4] px-3 py-1 text-sm font-extrabold text-[#07885f]">{item.students} Students</span>
                    </span>
                    <Eye className={cn("h-5 w-5 text-slate-400", expanded && "text-[#07885f]")} aria-hidden="true" />
                  </button>
                  {expanded && (
                    <div className="grid gap-3 border-t border-slate-200 p-4 text-base font-medium text-slate-500 sm:grid-cols-3">
                      <p>
                        Attendance: <strong className="text-[#07885f]">{Math.max(82, 100 - item.absent * 3)}%</strong>
                      </p>
                      <p>
                        Students: <strong className="text-slate-950">{item.students}</strong>
                      </p>
                      <p>
                        Absentees: <strong className="text-red-500">{item.absent}</strong>
                      </p>
                      {item.flaggedStudent && (
                        <div className="sm:col-span-3">
                          <p className="mb-2 flex items-center gap-2 font-extrabold text-red-500">
                            <AlertTriangle className="h-5 w-5" aria-hidden="true" />
                            Attention required
                          </p>
                          <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-red-50 px-4 py-3 text-slate-950">
                            <span className="font-extrabold">{item.flaggedStudent}</span>
                            <span className="text-slate-500">{item.flagReason}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}

        {activeTab === "teachers" && (
          <ResponsiveDirectoryTable
            headers={["Teacher", "Subject", "Classes", "Attendance", "Performance", "Actions"]}
            rows={filteredTeachers.map((teacher, index) => {
              const expanded = expandedTeacher === teacher.id;
              return {
                key: teacher.id,
                cells: [
                  <IdentityCell key="identity" label={teacher.name} meta={index === 0 ? "Jan 2021" : index === 1 ? "Mar 2020" : "Jun 2019"} />,
                  <span key="subject" className="rounded-md bg-indigo-50 px-3 py-1 text-sm font-extrabold text-indigo-500">{teacher.subject}</span>,
                  <span key="classes" className="font-extrabold">{teacher.classes.split(",").length}</span>,
                  <MetricBar key="attendance" value={Math.max(88, 100 - teacher.late)} />,
                  <span key="performance" className="font-extrabold text-[#07885f]">{Math.max(84, 96 - teacher.leaves - teacher.late)}</span>,
                  <button
                    key="action"
                    type="button"
                    onClick={() => setExpandedTeacher(expanded ? "" : teacher.id)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-[#07885f]/10 hover:text-[#07885f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07885f]/40"
                    aria-label={`${expanded ? "Hide" : "View"} details for ${teacher.name}`}
                  >
                    <Eye className="h-5 w-5" aria-hidden="true" />
                  </button>,
                ],
                detail: expanded && (
                  <div className="grid gap-3 rounded-lg bg-slate-50 p-4 text-base font-semibold text-slate-500 sm:grid-cols-3">
                    <span>Timetable: <strong className="text-slate-950">{teacher.timetable}</strong></span>
                    <span>Late: <strong className="text-amber">{teacher.late}</strong></span>
                    <span>Leaves: <strong className="text-slate-950">{teacher.leaves}</strong></span>
                  </div>
                ),
              };
            })}
          />
        )}

        {activeTab === "students" && (
          <ResponsiveDirectoryTable
            headers={["Student", "Class", "Attendance", "Avg Score", "Merits", "Actions"]}
            rows={filteredStudents.map((student, index) => {
              const expanded = expandedStudent === student.id;
              const score = Number.parseInt(student.marks ?? `${87 - index * 3}`, 10);
              return {
                key: student.id,
                cells: [
                  <IdentityCell key="identity" label={student.name} meta={`Roll No. #${42 - index * 7}`} />,
                  <span key="class" className="rounded-md bg-slate-100 px-3 py-1 text-sm font-extrabold text-slate-500">{student.className.replace("Class ", "Grade ")}</span>,
                  <span key="attendance" className="font-extrabold text-[#07885f]">{98 - index * 2}%</span>,
                  <span key="score" className="font-extrabold text-slate-950">{score}%</span>,
                  <span key="merits" className="font-extrabold text-amber">{12 + index * 2}</span>,
                  <button
                    key="action"
                    type="button"
                    onClick={() => setExpandedStudent(expanded ? "" : student.id)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-[#07885f]/10 hover:text-[#07885f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07885f]/40"
                    aria-label={`${expanded ? "Hide" : "View"} details for ${student.name}`}
                  >
                    <Eye className="h-5 w-5" aria-hidden="true" />
                  </button>,
                ],
                detail: expanded && (
                  <div className="grid gap-4 rounded-lg bg-slate-50 p-4 text-base text-slate-500 sm:grid-cols-2">
                    <ProfileSubsection label="Parent Details">
                      <p><strong className="text-slate-950">{student.parent ?? "Parent details pending"}</strong></p>
                      {student.contact && <p>{student.contact}</p>}
                    </ProfileSubsection>
                    <ProfileSubsection label="Awards">
                      <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm font-extrabold text-slate-950">
                        <Award className="h-4 w-4" aria-hidden="true" />
                        {student.award ?? "Merit record available"}
                      </span>
                    </ProfileSubsection>
                  </div>
                ),
              };
            })}
          />
        )}
      </AppCard>
    </div>
  );
}

function InstituteStatCard({
  active,
  accent,
  icon: Icon,
  label,
  onClick,
  value,
}: {
  active: boolean;
  accent: string;
  icon: typeof Building2;
  label: string;
  onClick: () => void;
  value: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group min-h-44 rounded-lg border bg-white p-6 text-left shadow-[0_12px_32px_rgba(15,23,42,0.04)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07885f]/40",
        active ? "border-[#07885f] bg-[#eaf5f5] shadow-[0_16px_28px_rgba(7,136,95,0.12)]" : "border-[#dbe3ee] hover:border-[#07885f]/40",
      )}
      aria-pressed={active}
    >
      <div className="mb-5 flex items-start justify-between gap-3">
        <span className={cn("flex h-14 w-14 items-center justify-center rounded-lg bg-[#07885f]/10", accent)}>
          <Icon className="h-7 w-7" aria-hidden="true" />
        </span>
        <ChevronRight className={cn("h-6 w-6", active ? "text-[#07885f]" : "text-slate-300 group-hover:text-[#07885f]")} aria-hidden="true" />
      </div>
      <span className="block text-4xl font-extrabold text-slate-950">{value}</span>
      <span className="mt-2 block text-base font-extrabold text-slate-500">{label}</span>
    </button>
  );
}

function AvatarInitials({ label }: { label: string }) {
  const initials = label
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e4fff4] text-sm font-extrabold text-[#07885f]">
      {initials}
    </span>
  );
}

function IdentityCell({ label, meta }: { label: string; meta: string }) {
  return (
    <span className="flex min-w-56 items-center gap-3">
      <AvatarInitials label={label} />
      <span className="min-w-0">
        <span className="block truncate text-base font-extrabold text-slate-950">{label}</span>
        <span className="block truncate text-sm font-bold text-slate-400">{meta}</span>
      </span>
    </span>
  );
}

function MetricBar({ value }: { value: number }) {
  return (
    <span className="flex min-w-32 items-center gap-3">
      <span className="h-2 w-20 rounded-full bg-slate-100">
        <span className="block h-2 rounded-full bg-[#07885f]" style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
      </span>
      <span className="font-extrabold text-[#07885f]">{value}%</span>
    </span>
  );
}

function ResponsiveDirectoryTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: Array<{ key: string; cells: React.ReactNode[]; detail?: React.ReactNode }>;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-[920px] w-full text-left">
        <thead className="bg-slate-50 text-sm font-extrabold uppercase tracking-[0.12em] text-slate-500">
          <tr>
            {headers.map((header) => (
              <th key={header} className="px-4 py-4">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((row) => (
            <tr key={row.key} className="align-top">
              <td colSpan={headers.length} className="p-0">
                <div className="grid" style={{ gridTemplateColumns: `repeat(${headers.length}, minmax(0, 1fr))` }}>
                  {row.cells.map((cell, index) => (
                    <div key={index} className="flex min-h-20 items-center px-4 py-3 text-base text-slate-950">
                      {cell}
                    </div>
                  ))}
                </div>
                {row.detail && <div className="px-4 pb-4">{row.detail}</div>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ExpandablePanel({
  expanded,
  onToggle,
  title,
  subtitle,
  badge,
  badgeClassName,
  children,
}: {
  expanded: boolean;
  onToggle: () => void;
  title: string;
  subtitle: string;
  badge?: string | false;
  badgeClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <article className="overflow-hidden rounded-lg border border-slate-200">
      <button
        type="button"
        onClick={onToggle}
        className="grid w-full grid-cols-[2rem_1fr] items-center gap-3 p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#07885f]/40 sm:grid-cols-[2rem_1fr_auto]"
      >
        <span className={cn("flex h-8 w-8 items-center justify-center self-center", badge && "row-span-2 sm:row-span-1")}>
          {expanded ? <ChevronDown className="h-5 w-5 text-slate-500" aria-hidden="true" /> : <ChevronRight className="h-5 w-5 text-slate-500" aria-hidden="true" />}
        </span>
        <span className="min-w-0">
          <span className="block text-lg font-extrabold leading-tight text-slate-950">{title}</span>
          <span className="mt-1 block text-base font-medium leading-snug text-slate-500">{subtitle}</span>
        </span>
        <span className="col-start-2 mt-1 flex items-center gap-3 justify-self-start sm:col-auto sm:mt-0 sm:justify-self-end">
          {badge && <span className={cn("rounded-full px-3 py-1 text-sm font-extrabold", badgeClassName)}>{badge}</span>}
          <span className={cn("flex h-9 w-9 items-center justify-center rounded-lg text-slate-500", expanded && "bg-[#07885f]/10 text-[#07885f]")} aria-hidden="true">
            <Eye className="h-5 w-5" />
          </span>
          <span className="sr-only">{expanded ? "Hide details" : "View details"}</span>
        </span>
      </button>
      {expanded && children}
    </article>
  );
}

function CalendarScreen() {
  const [classFilter, setClassFilter] = useState("");
  const [teacherFilter, setTeacherFilter] = useState("");
  const [openFilter, setOpenFilter] = useState<"class" | "teacher" | "">("");
  const [showCreateBlock, setShowCreateBlock] = useState(false);
  const [newBlockTitle, setNewBlockTitle] = useState("Leadership Review");
  const [newBlockDay, setNewBlockDay] = useState("FRI");
  const [newBlockStart, setNewBlockStart] = useState("13:00");
  const [newBlockEnd, setNewBlockEnd] = useState("14:00");
  const [newBlockClass, setNewBlockClass] = useState("Grade 10 - Section A");
  const [scheduleBlocks, setScheduleBlocks] = useState<MasterScheduleBlock[]>(initialScheduleBlocks);
  const calendarQuery = useQuery({
    queryKey: ["management", "calendar"],
    queryFn: fetchCalendarData,
    ...managementQueryOptions,
  });

  const teacherOptions = useMemo(
    () => (calendarQuery.data?.teacherSchedule ?? []).map((teacher) => teacher.teacher),
    [calendarQuery.data?.teacherSchedule],
  );
  const classOptions = useMemo(
    () => Array.from(new Set(scheduleBlocks.map((block) => block.className))).sort(),
    [scheduleBlocks],
  );
  const visibleBlocks = useMemo(
    () =>
      scheduleBlocks.filter((block) => {
        const classMatches = !classFilter || block.className === classFilter;
        const teacherMatches = !teacherFilter || block.teacher === teacherFilter;
        return classMatches && teacherMatches;
      }),
    [classFilter, scheduleBlocks, teacherFilter],
  );

  if (calendarQuery.isLoading) {
    return <ScreenLoading title="Schedule" />;
  }

  if (calendarQuery.isError || !calendarQuery.data) {
    return <ScreenError title="Schedule" onRetry={() => void calendarQuery.refetch()} />;
  }

  const addBlock = () => {
    const title = newBlockTitle.trim();

    if (!title) {
      return;
    }

    setScheduleBlocks((current) => [
      ...current,
      {
        id: `custom-${Date.now()}`,
        className: classFilter || newBlockClass,
        day: newBlockDay,
        end: newBlockEnd,
        room: "Admin Room",
        start: newBlockStart,
        subject: title,
        teacher: teacherFilter || teacherOptions[0] || "Dr. S. Raghavan",
      },
    ]);
    setShowCreateBlock(false);
  };

  return (
    <div className="space-y-5">
      <AppCard>
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row">
            <ScheduleFilterDropdown
              icon={CalendarDays}
              label={classFilter || "Select Class Schedule"}
              open={openFilter === "class"}
              onToggle={() => setOpenFilter(openFilter === "class" ? "" : "class")}
              options={classOptions}
              onSelect={(value) => {
                setClassFilter(value);
                setOpenFilter("");
              }}
              onClear={() => {
                setClassFilter("");
                setOpenFilter("");
              }}
            />
            <ScheduleFilterDropdown
              icon={Clock3}
              label={teacherFilter || "Select Teacher Schedule"}
              open={openFilter === "teacher"}
              onToggle={() => setOpenFilter(openFilter === "teacher" ? "" : "teacher")}
              options={teacherOptions}
              onSelect={(value) => {
                setTeacherFilter(value);
                setOpenFilter("");
              }}
              onClear={() => {
                setTeacherFilter("");
                setOpenFilter("");
              }}
            />
          </div>
          <Button
            type="button"
            onClick={() => setShowCreateBlock((value) => !value)}
            className="min-h-12 rounded-lg bg-[#07885f] px-6 text-base hover:bg-[#067552]"
          >
            <Plus className="h-5 w-5" aria-hidden="true" />
            Create New Block
          </Button>
        </div>

        {showCreateBlock && (
          <div className="mt-5 grid gap-3 rounded-lg border border-[#b9f1db] bg-[#f5fffb] p-4 lg:grid-cols-[1.4fr_0.7fr_0.7fr_0.7fr_1fr_auto]">
            <Input value={newBlockTitle} onChange={(event) => setNewBlockTitle(event.target.value)} aria-label="Block title" className="h-11 bg-white" />
            <select value={newBlockDay} onChange={(event) => setNewBlockDay(event.target.value)} className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm font-bold">
              {scheduleDays.map((day) => <option key={day}>{day}</option>)}
            </select>
            <Input value={newBlockStart} onChange={(event) => setNewBlockStart(event.target.value)} aria-label="Start time" className="h-11 bg-white" />
            <Input value={newBlockEnd} onChange={(event) => setNewBlockEnd(event.target.value)} aria-label="End time" className="h-11 bg-white" />
            <select value={newBlockClass} onChange={(event) => setNewBlockClass(event.target.value)} className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm font-bold">
              {classOptions.map((item) => <option key={item}>{item}</option>)}
            </select>
            <Button type="button" onClick={addBlock} className="min-h-11 rounded-lg bg-[#07885f] px-5 hover:bg-[#067552]">Add</Button>
          </div>
        )}
      </AppCard>

      <div className="flex flex-wrap gap-4 text-base font-semibold text-slate-600">
        {scheduleSubjects.map((subject) => (
          <span key={subject.label} className="inline-flex items-center gap-2">
            <span className={cn("h-4 w-4 rounded border", subject.swatch)} />
            {subject.label}
          </span>
        ))}
      </div>

      <AppCard className="p-0 sm:p-0">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-5 py-4">
          <h2 className="flex items-center gap-2 text-xl font-extrabold text-slate-950">
            <Clock3 className="h-6 w-6 text-[#07885f]" aria-hidden="true" />
            Master Schedule Grid
          </h2>
          <span className="text-base font-semibold text-slate-400">Management View - Full Edit Access</span>
        </div>
        <MasterScheduleGrid blocks={visibleBlocks} />
      </AppCard>
    </div>
  );
}

type MasterScheduleBlock = {
  id: string;
  className: string;
  day: string;
  end: string;
  room: string;
  start: string;
  subject: string;
  teacher: string;
};

const scheduleDays = ["MON", "TUE", "WED", "THU", "FRI"];
const scheduleHours = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00"];
const scheduleSubjects = [
  { label: "Mathematics", swatch: "border-blue-300 bg-blue-100" },
  { label: "Physics", swatch: "border-violet-300 bg-violet-100" },
  { label: "Chemistry", swatch: "border-emerald-300 bg-emerald-100" },
  { label: "English", swatch: "border-yellow-300 bg-yellow-100" },
  { label: "Physical Education", swatch: "border-rose-300 bg-rose-100" },
];

const initialScheduleBlocks: MasterScheduleBlock[] = [
  { id: "math-mon", className: "Grade 10 - Section A", day: "MON", end: "09:30", room: "Room 204", start: "08:30", subject: "Mathematics", teacher: "Ms. Priya Sharma" },
  { id: "physics-mon", className: "Grade 10 - Section B", day: "MON", end: "10:30", room: "Room 101", start: "09:30", subject: "Physics", teacher: "Mr. Arvind Kumar" },
  { id: "english-mon", className: "Grade 9 - Section A", day: "MON", end: "12:00", room: "Room 307", start: "11:00", subject: "English", teacher: "Ms. Kavita Patel" },
  { id: "chemistry-tue", className: "Grade 9 - Section B", day: "TUE", end: "12:00", room: "Lab 02", start: "10:00", subject: "Chemistry", teacher: "Ms. Leena Bose" },
  { id: "math-wed", className: "Grade 10 - Section A", day: "WED", end: "12:00", room: "Room 204", start: "11:00", subject: "Mathematics", teacher: "Ms. Priya Sharma" },
  { id: "pe-wed", className: "Grade 9 - Section B", day: "WED", end: "15:00", room: "Main Ground", start: "14:30", subject: "Physical Education", teacher: "Mr. Rajan Verma" },
];

function ScheduleFilterDropdown({
  icon: Icon,
  label,
  onClear,
  onSelect,
  onToggle,
  open,
  options,
}: {
  icon: typeof CalendarDays;
  label: string;
  onClear: () => void;
  onSelect: (value: string) => void;
  onToggle: () => void;
  open: boolean;
  options: string[];
}) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        className="flex min-h-14 w-full min-w-72 items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-4 text-left text-base font-extrabold text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07885f]/40 sm:w-80"
        aria-expanded={open}
      >
        <span className="flex min-w-0 items-center gap-3">
          <Icon className="h-5 w-5 shrink-0 text-[#07885f]" aria-hidden="true" />
          <span className="truncate">{label}</span>
        </span>
        <ChevronDown className="h-5 w-5 shrink-0" aria-hidden="true" />
      </button>
      {open && (
        <div className="absolute left-0 top-[calc(100%+0.5rem)] z-20 w-full overflow-hidden rounded-lg border border-slate-200 bg-white py-2 shadow-[0_20px_42px_rgba(15,23,42,0.14)]">
          <button type="button" onClick={onClear} className="block w-full px-4 py-3 text-left text-base font-semibold text-slate-500 hover:bg-slate-50">
            Clear Filter
          </button>
          {options.map((option) => (
            <button key={option} type="button" onClick={() => onSelect(option)} className="block w-full px-4 py-3 text-left text-base font-extrabold text-slate-700 hover:bg-[#e4fff4] hover:text-[#07885f]">
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function MasterScheduleGrid({ blocks }: { blocks: MasterScheduleBlock[] }) {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[980px]">
        <div className="grid grid-cols-[5rem_repeat(5,minmax(11rem,1fr))] border-b border-slate-100">
          <span />
          {scheduleDays.map((day) => (
            <span key={day} className="px-4 py-4 text-center text-base font-extrabold text-slate-500">{day}</span>
          ))}
        </div>
        <div className="grid grid-cols-[5rem_repeat(5,minmax(11rem,1fr))]">
          <div className="border-r border-slate-100">
            {scheduleHours.map((hour) => (
              <div key={hour} className="h-24 border-b border-slate-100 px-3 py-2 text-sm font-semibold text-slate-400">{hour}</div>
            ))}
          </div>
          {scheduleDays.map((day) => (
            <div key={day} className="relative h-[42rem] border-r border-slate-100 bg-white">
              {scheduleHours.map((hour) => <span key={hour} className="block h-24 border-b border-slate-100" />)}
              {blocks.filter((block) => block.day === day).map((block) => (
                <ScheduleBlockCard key={block.id} block={block} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ScheduleBlockCard({ block }: { block: MasterScheduleBlock }) {
  const top = Math.max(0, (parseTime(block.start) - 8) * 96);
  const height = Math.max(56, (parseTime(block.end) - parseTime(block.start)) * 96);
  const colorClass =
    block.subject === "Mathematics"
      ? "border-blue-300 bg-blue-100 text-blue-700"
      : block.subject === "Physics"
        ? "border-violet-300 bg-violet-100 text-violet-700"
        : block.subject === "Chemistry"
          ? "border-emerald-300 bg-emerald-100 text-emerald-700"
          : block.subject === "English"
            ? "border-yellow-300 bg-yellow-100 text-yellow-700"
            : "border-rose-300 bg-rose-100 text-rose-700";

  return (
    <button
      type="button"
      className={cn("absolute left-2 right-2 rounded-lg border p-3 text-left shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07885f]/40", colorClass)}
      style={{ top, height }}
      title={`${block.subject} ${block.start}-${block.end}`}
    >
      <span className="block text-sm font-extrabold">{block.subject}</span>
      <span className="mt-1 block text-sm font-semibold">{block.start}-{block.end}</span>
      <span className="mt-1 block text-xs font-bold opacity-75">{block.room}</span>
    </button>
  );
}

function parseTime(value: string) {
  const [hour, minute = "0"] = value.split(":");
  return Number(hour) + Number(minute) / 60;
}

function getOffsetMonthLabel(monthLabel: string, offset: number) {
  const parsed = new Date(`${monthLabel} 1`);

  if (Number.isNaN(parsed.getTime())) {
    return monthLabel;
  }

  parsed.setMonth(parsed.getMonth() + offset);
  return new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric" }).format(parsed);
}

function CalendarGrid({
  calendar,
  monthLabel,
  selectedDay,
  onPreviousMonth,
  onNextMonth,
  onSelectDay,
}: {
  calendar: CalendarData;
  monthLabel: string;
  selectedDay: number;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onSelectDay: (day: number) => void;
}) {
  return (
    <AppCard>
      <div className="mb-6 flex items-center justify-between">
        <button
          type="button"
          onClick={onPreviousMonth}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07885f]/40"
          aria-label="Previous month"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <h2 className="text-xl font-extrabold text-slate-950">{monthLabel}</h2>
        <button
          type="button"
          onClick={onNextMonth}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07885f]/40"
          aria-label="Next month"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <div className="overflow-x-auto">
        <div className="grid min-w-[280px] grid-cols-7 gap-0 text-center sm:gap-2">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
            <span key={day} className="py-2 text-base font-medium text-slate-500">
              {day}
            </span>
          ))}
          {calendar.days.map((day) => (
            <button
              key={day}
              type="button"
              onClick={() => onSelectDay(day)}
              className={cn(
                "mx-auto flex h-10 w-10 items-center justify-center rounded-lg text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07885f]/40 sm:h-11 sm:w-11 sm:text-lg",
                day === selectedDay ? "bg-[#07885f] text-white shadow-sm shadow-[#07885f]/30" : "text-slate-950 hover:bg-slate-100",
              )}
              aria-pressed={day === selectedDay}
            >
              {day}
            </button>
          ))}
        </div>
      </div>
    </AppCard>
  );
}

function EventsCard({ events, emptyLabel }: { events: CalendarEvent[]; emptyLabel?: string }) {
  return (
    <AppCard>
      <SectionTitle>Upcoming Events</SectionTitle>
      {events.length === 0 ? (
        <p className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 py-10 text-center text-base font-semibold text-slate-500">
          {emptyLabel ?? "No events for this day."}
        </p>
      ) : (
        <div className="space-y-4">
          {events.map((event) => (
            <article key={event.title} className="grid grid-cols-[3.25rem_1fr] items-start gap-3 rounded-lg bg-slate-50 p-4 sm:grid-cols-[3.75rem_1fr_auto]">
              <span className={cn("flex h-12 w-12 items-center justify-center rounded-lg", calendarEventStyleMap[event.category] ?? "bg-slate-100 text-slate-600")}>
                <CalendarDays className="h-6 w-6" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <h3 className="text-lg font-extrabold leading-tight text-slate-950">{event.title}</h3>
                <p className="mt-1 flex flex-wrap items-center gap-2 text-base font-medium text-slate-500">
                  <Clock3 className="h-4 w-4" aria-hidden="true" />
                  {event.time} - {event.date}
                </p>
              </div>
              <Badge variant="secondary" className="col-start-2 w-fit whitespace-nowrap bg-slate-100 text-slate-950 sm:col-auto">
                {event.category}
              </Badge>
            </article>
          ))}
        </div>
      )}
    </AppCard>
  );
}

function ProfileScreen() {
  const navigate = useNavigate();
  const [copiedCode, setCopiedCode] = useState(false);
  const profileQuery = useQuery({
    queryKey: ["management", "profile"],
    queryFn: fetchSchoolProfileData,
    ...managementQueryOptions,
  });

  if (profileQuery.isLoading) {
    return <ScreenLoading title="School Profile" />;
  }

  if (profileQuery.isError || !profileQuery.data) {
    return <ScreenError title="School Profile" onRetry={() => void profileQuery.refetch()} />;
  }

  const profile = profileQuery.data;
  const email = profile.details.find((detail) => detail.icon === "email")?.value ?? "admin@silverlynxacademy.edu";
  const phone = profile.details.find((detail) => detail.icon === "phone")?.value ?? "+91 120 456 7890";
  const copyRegistrationCode = async () => {
    try {
      await navigator.clipboard.writeText(profile.code);
    } catch {
      // Some browsers block clipboard writes without a secure user gesture; the code remains visible for manual copying.
    }

    setCopiedCode(true);
    window.setTimeout(() => setCopiedCode(false), 1800);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-5">
      <section className="overflow-hidden rounded-lg border border-[#dbe3ee] bg-white shadow-[0_12px_32px_rgba(15,23,42,0.04)]">
        <div className="h-44 bg-[radial-gradient(circle_at_80%_20%,rgba(7,136,95,0.95),transparent_35%),linear-gradient(135deg,#142033,#111827)]" />
        <div className="px-5 pb-6 sm:px-8">
          <div className="-mt-16 flex flex-col gap-5 sm:flex-row sm:items-end">
            <span className="flex h-32 w-32 shrink-0 items-center justify-center rounded-lg border-4 border-white bg-[#07885f] text-white shadow-[0_18px_32px_rgba(15,23,42,0.18)]">
              <School className="h-16 w-16" aria-hidden="true" />
            </span>
            <div className="min-w-0 pb-1">
              <h2 className="break-words text-3xl font-extrabold text-slate-950">{academyFullName}</h2>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-base font-extrabold">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#e4fff4] px-3 py-1 text-[#07885f]">
                  <Building2 className="h-4 w-4" aria-hidden="true" />
                  Institution
                </span>
                <span className="text-slate-500">Est. 2008</span>
              </div>
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-base font-semibold text-[#07885f]">
                <span className="inline-flex items-center gap-2">
                  <Globe2 className="h-4 w-4" aria-hidden="true" />
                  www.silverlynxacademy.edu
                </span>
                <span className="inline-flex items-center gap-2">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  {email}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-[#8af2cc] bg-white p-6 shadow-[0_12px_32px_rgba(15,23,42,0.04)]">
        <div className="grid gap-5 sm:grid-cols-[1fr_auto] sm:items-center">
          <div className="min-w-0">
            <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-slate-500">Institute Registration Code</p>
            <p className="mt-2 text-base font-semibold text-slate-500">Unique global identifier for your institution</p>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <span className="break-all font-mono text-3xl font-extrabold tracking-[0.22em] text-[#07885f] sm:text-4xl">{profile.code}</span>
              <Button type="button" onClick={copyRegistrationCode} className="min-h-10 rounded-lg bg-[#e4fff4] px-4 text-[#07885f] hover:bg-[#ccf7e7]">
                {copiedCode ? "Copied" : "Copy"}
              </Button>
            </div>
          </div>
          <span className="flex h-24 w-24 items-center justify-center rounded-lg bg-[#07885f] text-5xl font-extrabold text-white">
            #
          </span>
        </div>
      </section>

      <div className="grid gap-5 xl:grid-cols-2">
        <ProfileInfoCard
          icon={MapPin}
          title="Location Details"
          rows={[
            ["Address", "42, Knowledge Park, Sector 18"],
            ["City", "Noida"],
            ["State", "Uttar Pradesh"],
            ["Country", "India"],
            ["PIN Code", "201301"],
          ]}
        />
        <ProfileInfoCard
          icon={Phone}
          title="Contact Details"
          rows={[
            ["Primary Phone", phone],
            ["Secondary Phone", "+91 120 456 7891"],
            ["Primary Email", email],
            ["Secondary Email", "admissions@silverlynxacademy.edu"],
            ["Website", "Visit Site"],
          ]}
        />
      </div>

      <AppCard>
        <h2 className="mb-8 flex items-center gap-2 text-xl font-extrabold text-slate-950">
          <Clock3 className="h-6 w-6 text-[#07885f]" aria-hidden="true" />
          Institute Timings
        </h2>
        <div className="grid gap-6 text-center sm:grid-cols-[1fr_auto_1fr] sm:items-center">
          <div>
            <p className="text-base font-semibold text-slate-400">Opening Time</p>
            <p className="text-3xl font-extrabold text-[#07885f]">08:30 AM</p>
          </div>
          <span className="hidden h-px w-24 bg-slate-200 sm:block" />
          <div>
            <p className="text-base font-semibold text-slate-400">Closing Time</p>
            <p className="text-3xl font-extrabold text-slate-950">04:30 PM</p>
          </div>
        </div>
        <p className="mt-8 text-center text-base font-semibold text-slate-500">
          <span className="mr-2 inline-block h-3 w-3 rounded-full bg-emerald-400" />
          Currently Open - Monday - Friday
        </p>
      </AppCard>

      <AppCard>
        <h2 className="mb-5 text-xl font-extrabold text-slate-950">Affiliations &amp; Accreditations</h2>
        <div className="flex flex-wrap gap-3">
          {["CBSE", "International Baccalaureate (IB)", "Cambridge International"].map((item) => (
            <span key={item} className="rounded-full border border-[#8af2cc] bg-[#e4fff4] px-4 py-2 text-base font-extrabold text-[#07885f]">
              {item}
            </span>
          ))}
        </div>
      </AppCard>

      <AppCard>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="flex h-16 w-16 items-center justify-center rounded-lg bg-slate-900 text-white">
              <Building2 className="h-8 w-8" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-xl font-extrabold text-slate-950">Dr. S. Raghavan</h2>
              <p className="text-base font-semibold text-slate-500">Director - {academyFullName}</p>
            </div>
          </div>
          <Button type="button" variant="outline" onClick={() => navigate("/", { replace: true })} className="min-h-12 rounded-lg border-rose-200 bg-rose-50 px-6 text-base font-extrabold text-rose-500 hover:bg-rose-100">
            <LogOut className="h-5 w-5" aria-hidden="true" />
            Logout
          </Button>
        </div>
      </AppCard>
    </div>
  );
}

function ProfileInfoCard({
  icon: Icon,
  rows,
  title,
}: {
  icon: typeof MapPin;
  rows: Array<[string, string]>;
  title: string;
}) {
  return (
    <AppCard>
      <h2 className="mb-6 flex items-center gap-2 text-xl font-extrabold text-slate-950">
        <Icon className="h-6 w-6 text-[#07885f]" aria-hidden="true" />
        {title}
      </h2>
      <dl className="divide-y divide-slate-100">
        {rows.map(([label, value]) => (
          <div key={label} className="grid grid-cols-1 gap-1 py-4 text-base sm:grid-cols-[1fr_auto] sm:gap-4">
            <dt className="font-semibold text-slate-400">{label}</dt>
            <dd className={cn("min-w-0 break-all text-left font-extrabold sm:text-right", label.includes("Email") || label.includes("Phone") || label === "Website" ? "text-[#07885f]" : "text-slate-950")}>{value}</dd>
          </div>
        ))}
      </dl>
    </AppCard>
  );
}

function SegmentedControl({
  value,
  onChange,
  items,
}: {
  value: string;
  onChange: (value: string) => void;
  items: Array<{ value: string; label: string }>;
}) {
  return (
    <div className="grid rounded-lg bg-slate-100 p-1" style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }} role="tablist">
      {items.map((item) => {
        const selected = value === item.value;
        return (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={selected}
            className={cn(
              "min-h-12 rounded-lg px-2 text-center text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07885f]/40 sm:text-base",
              selected ? "bg-white text-slate-950 shadow-sm" : "text-slate-500 hover:text-slate-900",
            )}
            onClick={() => onChange(item.value)}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

function SearchField({
  value,
  onChange,
  placeholder,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  className?: string;
}) {
  return (
    <div className={cn("relative mt-5", className)}>
      <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" aria-hidden="true" />
      <Input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="h-12 rounded-lg border-0 bg-slate-100 pl-12 text-base font-medium placeholder:text-slate-500 focus-visible:ring-[#07885f]/30"
        type="search"
      />
    </div>
  );
}

function ProfileSubsection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="mb-2 text-base font-extrabold text-slate-500">{label}</h4>
      <div className="space-y-1">{children}</div>
    </div>
  );
}
