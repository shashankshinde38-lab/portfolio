"use client";

import { useSyncExternalStore } from "react";
import {
  analyticsPreference,
  setAnalyticsPreference,
  subscribeAnalyticsPreference,
} from "@/web/utils/analytics";

const serverPreference = () => null;

export default function AnalyticsPreferences() {
  const preference = useSyncExternalStore(subscribeAnalyticsPreference, analyticsPreference, serverPreference);

  return (
    <fieldset className="analytics-preferences">
      <legend>Optional audience analytics</legend>
      <label>
        <input
          type="radio"
          name="portfolio-analytics"
          checked={preference !== "allow"}
          onChange={() => setAnalyticsPreference("deny")}
        />
        Keep analytics off
      </label>
      <label>
        <input
          type="radio"
          name="portfolio-analytics"
          checked={preference === "allow"}
          onChange={() => setAnalyticsPreference("allow")}
        />
        Allow analytics
      </label>
    </fieldset>
  );
}
