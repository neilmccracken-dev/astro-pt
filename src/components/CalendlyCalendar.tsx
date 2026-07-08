import React from 'react';
import { InlineWidget } from 'react-calendly';

export default function CalendlyCalendar() {
  return (
    <div className="w-full h-screen  overflow-hidden shadow-sm">
      <InlineWidget
        url="https://calendly.com/neil-mccracken-dev/"
        styles={{ height: '100%' }}
        // pageSettings={{
        //   hideLandingPageDetails: true, // Hides the side profile card, keeping just the scheduler matrix
        //   //   hideEventTypeDetails: true, // Hides the event duration details if already noted on your landing page
        // }}
      />
    </div>
  );
}
