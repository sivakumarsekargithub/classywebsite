import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fetchBroadcastHistory, fetchDashboardData, sendBroadcast, updateApprovalStatus } from "@/lib/managementApi";

beforeEach(() => {
  window.localStorage.clear();
});

afterEach(() => {
  window.localStorage.clear();
  vi.unstubAllGlobals();
});

describe("managementApi fallback data", () => {
  it("requests same-origin static API data by default", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          adminName: "Loaded Admin",
          attendance: [],
          schedule: [],
          approvals: [],
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      ),
    );
    vi.stubGlobal("fetch", fetchMock);

    const dashboard = await fetchDashboardData();

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/management/dashboard.json",
      expect.objectContaining({
        credentials: "omit",
      }),
    );
    expect(dashboard.adminName).toBe("Loaded Admin");
  });

  it("loads dashboard data when no backend URL is configured", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("offline")));

    const dashboard = await fetchDashboardData();

    expect(dashboard.adminName).toBe("Public - ID");
    expect(dashboard.attendance).toHaveLength(2);
    expect(dashboard.schedule[0].title).toBe("Staff Meeting");
    expect(dashboard.approvals[0].id).toBe("leave-priya");
  });

  it("returns optimistic mutation results for approval and broadcast actions", async () => {
    await expect(updateApprovalStatus("leave-priya", "approved")).resolves.toEqual({
      id: "leave-priya",
      status: "approved",
    });

    await expect(sendBroadcast({ audience: "teachers", message: "Team meeting at 9 AM" })).resolves.toMatchObject({
      status: "queued",
    });
  });

  it("keeps locally handled approvals across fallback dashboard reloads", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("offline")));

    await updateApprovalStatus("leave-priya", "approved");
    const dashboard = await fetchDashboardData();

    expect(dashboard.approvals.find((approval) => approval.id === "leave-priya")?.status).toBe("approved");
  });

  it("validates broadcast payloads before using the fallback queue", async () => {
    await expect(sendBroadcast({ audience: "teachers", message: "   " })).rejects.toThrow("Broadcast message is required");
    await expect(sendBroadcast({ audience: "teachers", message: "x".repeat(281) })).rejects.toThrow("280 characters or fewer");
  });

  it("validates approval mutation inputs before making a request", () => {
    expect(() => updateApprovalStatus("bad id", "approved")).toThrow("Invalid approval id");
    expect(() => updateApprovalStatus("leave-priya", "pending" as never)).toThrow("Invalid approval status");
  });

  it("lists locally queued broadcasts after sending", async () => {
    await sendBroadcast({ audience: "parents", message: "Parent meeting at 2 PM" });

    const history = await fetchBroadcastHistory();

    expect(history[0]).toMatchObject({
      audience: "parents",
      message: "Parent meeting at 2 PM",
      status: "queued",
    });
    expect(history[0].createdAt).toEqual(expect.any(String));
  });
});
