export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const cron = await import("node-cron");
    const { processDueReminders } = await import("@/lib/reminderJob");

    // Runs every minute, checking for reminders whose scheduledAt has passed.
    cron.schedule("* * * * *", async () => {
      const count = await processDueReminders();
      if (count > 0) {
        console.log(`Processed ${count} due reminder(s).`);
      }
    });

    console.log("Reminder job scheduler started.");
  }
}