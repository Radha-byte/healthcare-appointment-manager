import { google } from "googleapis";

const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "urn:ietf:wg:oauth:2.0:oob"
);
oAuth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

export async function createCalendarEvent({
  summary,
  description,
  start,
  end,
  attendeeEmails,
}: {
  summary: string;
  description: string;
  start: Date;
  end: Date;
  attendeeEmails: string[];
}) {
  try {
    const res = await calendar.events.insert({
      calendarId: "primary",
      sendUpdates: "all",
      requestBody: {
        summary,
        description,
        start: { dateTime: start.toISOString() },
        end: { dateTime: end.toISOString() },
        attendees: attendeeEmails.map((email) => ({ email })),
      },
    });
    return res.data.id || null;
  } catch (error) {
    console.error("Calendar event creation failed:", error);
    return null;
  }
}

export async function updateCalendarEvent(eventId: string, start: Date, end: Date) {
  try {
    await calendar.events.patch({
      calendarId: "primary",
      eventId,
      sendUpdates: "all",
      requestBody: {
        start: { dateTime: start.toISOString() },
        end: { dateTime: end.toISOString() },
      },
    });
  } catch (error) {
    console.error("Calendar event update failed:", error);
  }
}

export async function deleteCalendarEvent(eventId: string) {
  try {
    await calendar.events.delete({ calendarId: "primary", eventId, sendUpdates: "all" });
  } catch (error) {
    console.error("Calendar event deletion failed:", error);
  }
}