import Cal, { getCalApi } from '@calcom/embed-react';
import { useEffect } from 'react';

interface CalEmbedProps {
  calLink: string;
  //   namespace: string;
}

export default function CalBooking({ calLink }: CalEmbedProps) {
  const uniqueNamespace = calLink.replace(/[^a-zA-Z0-9]/g, '');
  useEffect(() => {
    (async function () {
      // Initialize the API specifically for this button's namespace
      const cal = await getCalApi({ namespace: uniqueNamespace });

      // Configure the popup UI properties
      cal('ui', {
        theme: 'light', // or "dark"
        hideEventTypeDetails: false,
      });
    })();
  }, [uniqueNamespace]);

  return (
    <button
      data-cal-namespace={uniqueNamespace}
      data-cal-link={calLink}
      data-cal-config='{"layout":"month_view"}'
      className="btn btn-primary" // Uses your DaisyUI button classes
    >
      Book Now
    </button>
  );
}
