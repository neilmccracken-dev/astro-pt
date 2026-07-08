import React, { useEffect, useState } from 'react';
import { PopupButton } from 'react-calendly';

export default function CalendlyText() {
  // Explicitly type the state to allow HTMLElement or null
  const [rootElement, setRootElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // This safely runs only in the browser
    setRootElement(document.getElementById('root-layout'));
  }, []);

  if (!rootElement) return null;

  return (
    <PopupButton
      url="https://calendly.com/neil-mccracken-dev/"
      rootElement={rootElement}
      text="Click here to schedule!"
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
    />
  );
}
