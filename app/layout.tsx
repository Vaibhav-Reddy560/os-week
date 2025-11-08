import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DotGrid from "@/components/DotGrid"; // <-- IMPORTED

const inter = Inter({ subsets: ["latin"] });

// --- IMPORTANT DATA FOR SEO ---
const EVENT_START_ISO = "2025-11-20T09:00:00";
const EVENT_START_DATE = new Date(EVENT_START_ISO);
const EVENT_END_DATE = new Date("2025-11-25T17:00:00"); // Assuming a 5-day event

export const metadata: Metadata = {
  title: "Open Source Week | BMSCE IEEE Computer Society",
  description: "Join BMSCE IEEE CS for a week of workshops, an industry visit, a contribution sprint, and the RepoGenesis 24-hour hackathon.",
  openGraph: {
    title: "Open Source Week | BMSCE IEEE Computer Society",
    description: "Workshops, Industry Visit, Contribution Sprint, and RepoGenesis Hackathon.",
    url: "https://your-website-url.com", // <-- REPLACE WITH YOUR DOMAIN
    siteName: "BMSCE IEEE CS Open Source Week",
    images: [
      {
        url: "https://your-website-url.com/og-image.png", // <-- REPLACE WITH YOUR OG IMAGE URL
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

function EventSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "Open Source Week by BMSCE IEEE CS",
    "startDate": EVENT_START_DATE.toISOString(),
    "endDate": EVENT_END_DATE.toISOString(),
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/MixedEventAttendanceMode", // In-person and virtual
    "location": [
      {
        "@type": "Place",
        "name": "BMS College of Engineering",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Bull Temple Rd, Basavanagudi",
          "addressLocality": "Bengaluru",
          "postalCode": "560019",
          "addressRegion": "KA",
          "addressCountry": "IN"
        }
      },
      {
        "@type": "VirtualLocation",
        "url": "https://your-website-url.com/schedule" // <-- REPLACE WITH YOUR DOMAIN
      }
    ],
    "image": [
      "https://your-website-url.com/og-image.png" // <-- REPLACE
    ],
    "description": "A week-long event by BMSCE IEEE CS featuring workshops (GitHub 101, Agentic AI), an industry visit to Red Hat, a contribution sprint, and the RepoGenesis 24-hour hackathon.",
    "organizer": {
      "@type": "Organization",
      "name": "BMSCE IEEE Computer Society",
      "url": "httpsBMSCE.ieee.org" // <-- REPLACE with actual club URL
    },
    // Sub-event for the Hackathon
    "subEvent": {
      "@type": "Event",
      "name": "RepoGenesis - 24-Hour Hackathon",
      "startDate": "2025-11-23T10:00:00", // Based on your timeline
      "endDate": "2025-11-24T12:00:00", // Assuming 24h + judging
      "description": "A 24-hour open-source hackathon with checkpoints, mentorship, and judging.",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "location": {
        "@type": "Place",
        "name": "BMS College of Engineering",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Bull Temple Rd, Basavanagudi",
          "addressLocality": "Bengaluru",
          "postalCode": "560019",
          "addressRegion": "KA",
          "addressCountry": "IN"
        }
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ scrollBehavior: 'smooth' }}>
      <head>
        <EventSchema />
      </head>
      {/* Add 'relative' to the body tag */}
      <body className={`${inter.className} relative`}>
        
        {/* --- THIS IS THE NEW BACKGROUND --- */}
        <div className="fixed inset-0 -z-10 w-full h-screen">
          <DotGrid
            dotSize={2}
            gap={20}
            baseColor="#064e3b"     // Dark Green (Tailwind green-900)
            activeColor="#34d399" // Neon Green (Tailwind green-400)
            proximity={100}
            shockRadius={200}
            shockStrength={0.5}
            resistance={250}
            returnDuration={0.5}
          />
        </div>
        {/* --- END OF NEW BACKGROUND --- */}


        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        
        {/* Your page content renders here, on top of the background */}
        {children}
      </body>
    </html>
  );
}
