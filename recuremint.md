{
  "project": {
    "name": "EstatePro",
    "type": "Full-Stack Real Estate Marketplace & Property Management SaaS",
    "version": "1.0.0",
    "description": "A production-ready real estate marketplace similar to Zillow, Property Finder, Realtor and Redfin, supporting property owners, agents, agencies, buyers, renters, developers, mortgage workflows, appointments, messaging, analytics, subscriptions, payments, reports and platform administration.",
    "target": "Web + Responsive Mobile Web + API-first architecture",
    "quality_level": "Production / Enterprise",
    "development_standard": "Senior Full-Stack Engineering",
    "architecture": "Modular Monolith prepared for Microservices",
    "multi_tenant": true,
    "multi_company": true,
    "multi_language": true,
    "multi_currency": true,
    "multi_country": true,
    "audit_everything": true
  },

  "recommended_stack": {
    "frontend": {
      "framework": "React",
      "language": "TypeScript",
      "build_tool": "Vite",
      "routing": "React Router",
      "state_management": "Redux Toolkit",
      "server_state": "TanStack Query",
      "forms": "React Hook Form",
      "validation": "Zod",
      "styling": "Tailwind CSS",
      "components": "Shadcn UI",
      "charts": "Recharts",
      "maps": "Google Maps or Mapbox",
      "realtime": "WebSocket"
    },
    "backend": {
      "framework": "Django",
      "api": "Django REST Framework",
      "language": "Python",
      "authentication": "JWT + Refresh Tokens",
      "realtime": "Django Channels",
      "background_jobs": "Celery",
      "task_queue": "Redis",
      "documentation": "OpenAPI / Swagger"
    },
    "database": {
      "primary": "PostgreSQL",
      "geospatial": "PostGIS",
      "cache": "Redis",
      "search": "OpenSearch or Elasticsearch",
      "analytics": "PostgreSQL + materialized views"
    },
    "storage": {
      "images": "Cloudinary or S3-compatible storage",
      "documents": "S3-compatible private bucket",
      "videos": "Cloudinary Video or S3",
      "cdn": true
    },
    "payments": {
      "provider_abstraction": true,
      "providers": [
        "Stripe",
        "PayPal",
        "regional_payment_gateway"
      ]
    },
    "deployment": {
      "containerization": "Docker",
      "reverse_proxy": "Nginx",
      "ci_cd": "GitHub Actions",
      "production": "Cloud VPS / AWS / Azure / DigitalOcean",
      "monitoring": "Sentry + structured logging"
    }
  },

  "core_roles": {
    "guest": {
      "description": "Unauthenticated website visitor",
      "can": [
        "Browse public properties",
        "Search properties",
        "Use map search",
        "View property details",
        "View public agent profiles",
        "Use mortgage calculator",
        "Compare properties",
        "Read articles",
        "View projects"
      ],
      "cannot": [
        "Send private messages",
        "Book restricted appointments",
        "Create listings",
        "Save private data"
      ]
    },

    "buyer": {
      "description": "User looking to purchase property",
      "can": [
        "Create profile",
        "Search properties",
        "Save properties",
        "Create saved searches",
        "Receive property alerts",
        "Compare properties",
        "Request viewing",
        "Book appointments",
        "Message agents",
        "Submit inquiries",
        "Apply for mortgage prequalification",
        "Track inquiries",
        "Write reviews after eligible interactions"
      ]
    },

    "tenant": {
      "description": "User looking to rent a property",
      "can": [
        "Search rental properties",
        "Save properties",
        "Request viewing",
        "Book appointments",
        "Message agents",
        "Submit rental applications",
        "Upload required documents",
        "Track application status",
        "Manage lease information"
      ]
    },

    "seller": {
      "description": "Property owner listing property for sale",
      "can": [
        "Create properties",
        "Upload images",
        "Upload floor plans",
        "Upload videos",
        "Upload documents",
        "Manage listings",
        "Review inquiries",
        "Approve appointments",
        "Message agents",
        "View listing analytics"
      ]
    },

    "landlord": {
      "description": "Property owner managing rental properties",
      "can": [
        "Create rental listings",
        "Manage tenants",
        "Manage leases",
        "Track rent",
        "Manage maintenance requests",
        "Manage property documents",
        "View property performance"
      ]
    },

    "agent": {
      "description": "Licensed real estate agent",
      "can": [
        "Create agent profile",
        "Manage listings",
        "Manage leads",
        "Manage clients",
        "Book appointments",
        "Communicate with clients",
        "Upload media",
        "Generate reports",
        "Track commissions",
        "Manage tasks",
        "Manage pipeline",
        "View analytics"
      ]
    },

    "agency_admin": {
      "description": "Agency owner or manager",
      "can": [
        "Manage agency",
        "Create agents",
        "Approve team listings",
        "Assign leads",
        "Manage subscriptions",
        "View agency analytics",
        "View commissions",
        "Manage agency branding",
        "Manage team permissions"
      ]
    },

    "developer": {
      "description": "Real estate developer",
      "can": [
        "Create developments",
        "Create buildings",
        "Create units",
        "Upload brochures",
        "Upload plans",
        "Manage inventory",
        "Manage installment plans",
        "Manage sales agents",
        "Track project analytics"
      ]
    },

    "property_manager": {
      "description": "Professional rental/property management user",
      "can": [
        "Manage multiple properties",
        "Manage tenants",
        "Manage leases",
        "Manage rent",
        "Manage maintenance",
        "Manage contractors",
        "Generate financial reports"
      ]
    },

    "mortgage_partner": {
      "description": "Mortgage provider or financial partner",
      "can": [
        "Receive qualified leads",
        "Review applications",
        "Update mortgage application status",
        "Communicate with applicants",
        "Manage mortgage products",
        "View mortgage analytics"
      ]
    },

    "moderator": {
      "description": "Content moderation staff",
      "can": [
        "Review listings",
        "Review reports",
        "Review users",
        "Review media",
        "Approve or reject content",
        "Suspend listings",
        "Flag suspicious activity"
      ]
    },

    "support_agent": {
      "description": "Customer support staff",
      "can": [
        "Manage support tickets",
        "View customer profiles",
        "View conversations",
        "Resolve disputes",
        "Escalate cases"
      ]
    },

    "finance_admin": {
      "description": "Financial administration staff",
      "can": [
        "View payments",
        "Manage invoices",
        "View payouts",
        "Refund transactions",
        "View commissions",
        "Financial reporting"
      ]
    },

    "super_admin": {
      "description": "Platform owner",
      "can": [
        "Full system access",
        "Manage users",
        "Manage roles",
        "Manage permissions",
        "Manage properties",
        "Manage agencies",
        "Manage payments",
        "Manage subscriptions",
        "Manage CMS",
        "Manage media",
        "Manage reports",
        "Manage system settings",
        "Manage integrations",
        "View platform analytics",
        "View audit logs"
      ]
    }
  },

  "authentication": {
    "methods": [
      "Email + Password",
      "Phone + OTP",
      "Google OAuth",
      "Apple OAuth"
    ],
    "security": {
      "password_hashing": "Argon2 or PBKDF2",
      "jwt_access_token": true,
      "jwt_refresh_token": true,
      "refresh_rotation": true,
      "email_verification": true,
      "phone_verification": true,
      "2fa": true,
      "rate_limiting": true,
      "login_attempt_protection": true,
      "device_sessions": true,
      "logout_all_devices": true
    }
  },

  "frontend_pages": {

    "public_pages": {
      "home": {
        "route": "/",
        "features": [
          "Hero property search",
          "Buy / Rent / Commercial switch",
          "Location search",
          "Property type filters",
          "Price range",
          "Featured listings",
          "Featured developers",
          "Featured agents",
          "Popular locations",
          "New developments",
          "Market statistics",
          "Mortgage calculator preview",
          "Articles",
          "Testimonials",
          "CTA sections"
        ]
      },

      "search": {
        "route": "/properties",
        "features": [
          "Advanced search",
          "List view",
          "Map view",
          "Split list/map view",
          "Sorting",
          "Filters",
          "Save search",
          "Property comparison",
          "Pagination/infinite scrolling",
          "URL persisted filters"
        ]
      },

      "property_details": {
        "route": "/property/:slug",
        "sections": [
          "Image gallery",
          "Video gallery",
          "Virtual tour",
          "Property title",
          "Price",
          "Address",
          "Map",
          "Property facts",
          "Bedrooms",
          "Bathrooms",
          "Area",
          "Amenities",
          "Description",
          "Floor plans",
          "Documents",
          "Mortgage calculator",
          "Agent card",
          "Agency card",
          "Contact agent",
          "Schedule viewing",
          "Similar properties",
          "Nearby properties",
          "Nearby schools",
          "Nearby hospitals",
          "Nearby transportation",
          "Market information",
          "Share",
          "Save",
          "Compare",
          "Report listing"
        ]
      },

      "map_search": {
        "route": "/map",
        "features": [
          "Interactive map",
          "Property pins",
          "Price clusters",
          "Draw area search",
          "Radius search",
          "Satellite mode",
          "Street view integration",
          "Map/list synchronization"
        ]
      },

      "agents": {
        "route": "/agents",
        "features": [
          "Agent search",
          "Location filter",
          "Specialization filter",
          "Rating",
          "Experience",
          "Verified badge"
        ]
      },

      "agent_profile": {
        "route": "/agent/:slug",
        "features": [
          "Profile photo",
          "Cover image",
          "Biography",
          "License information",
          "Verified status",
          "Specializations",
          "Office",
          "Listings",
          "Reviews",
          "Contact",
          "Book appointment"
        ]
      },

      "agencies": {
        "route": "/agencies"
      },

      "agency_profile": {
        "route": "/agency/:slug",
        "features": [
          "Agency branding",
          "Logo",
          "Cover image",
          "About",
          "Agents",
          "Listings",
          "Projects",
          "Reviews",
          "Contact"
        ]
      },

      "developments": {
        "route": "/developments",
        "features": [
          "Project listing",
          "Developer filter",
          "Location filter",
          "Price filter",
          "Completion status"
        ]
      },

      "development_details": {
        "route": "/development/:slug",
        "features": [
          "Project gallery",
          "Master plan",
          "Buildings",
          "Units",
          "Amenities",
          "Developer",
          "Payment plans",
          "Installment plans",
          "Construction status",
          "Location map",
          "Brochure download",
          "Request information"
        ]
      },

      "mortgage_calculator": {
        "route": "/mortgage-calculator",
        "features": [
          "Property price",
          "Down payment",
          "Loan duration",
          "Interest rate",
          "Monthly installment",
          "Total interest",
          "Total repayment",
          "Amortization schedule",
          "Compare mortgage options"
        ]
      },

      "compare": {
        "route": "/compare",
        "features": [
          "Compare up to configurable number of properties",
          "Price comparison",
          "Area comparison",
          "Bedrooms comparison",
          "Amenities comparison",
          "Location comparison",
          "Mortgage estimate comparison"
        ]
      },

      "blog": {
        "route": "/blog"
      },

      "article": {
        "route": "/blog/:slug"
      },

      "about": {
        "route": "/about"
      },

      "contact": {
        "route": "/contact"
      },

      "faq": {
        "route": "/faq"
      },

      "pricing": {
        "route": "/pricing"
      },

      "terms": {
        "route": "/terms"
      },

      "privacy": {
        "route": "/privacy"
      }
    },

    "buyer_dashboard": {
      "dashboard": {
        "route": "/dashboard",
        "widgets": [
          "Saved properties",
          "Recent searches",
          "Upcoming appointments",
          "Unread messages",
          "Recommended properties",
          "Mortgage applications",
          "Saved searches"
        ]
      },

      "saved_properties": {
        "route": "/dashboard/saved"
      },

      "saved_searches": {
        "route": "/dashboard/searches"
      },

      "appointments": {
        "route": "/dashboard/appointments"
      },

      "messages": {
        "route": "/dashboard/messages"
      },

      "inquiries": {
        "route": "/dashboard/inquiries"
      },

      "applications": {
        "route": "/dashboard/applications"
      },

      "notifications": {
        "route": "/dashboard/notifications"
      },

      "profile": {
        "route": "/dashboard/profile"
      }
    },

    "agent_dashboard": {
      "overview": {
        "route": "/agent/dashboard",
        "widgets": [
          "Total listings",
          "Active listings",
          "Views",
          "Leads",
          "Appointments",
          "Conversion rate",
          "Revenue",
          "Commission",
          "Unread messages",
          "Tasks",
          "Pipeline"
        ]
      },

      "my_properties": {
        "route": "/agent/properties"
      },

      "create_property": {
        "route": "/agent/properties/create",
        "steps": [
          "Basic information",
          "Location",
          "Pricing",
          "Property details",
          "Amenities",
          "Media",
          "Floor plans",
          "Documents",
          "SEO",
          "Preview",
          "Submit for approval"
        ]
      },

      "edit_property": {
        "route": "/agent/properties/:id/edit"
      },

      "leads": {
        "route": "/agent/leads",
        "features": [
          "Lead inbox",
          "Lead source",
          "Lead scoring",
          "Lead status",
          "Assign lead",
          "Notes",
          "Tasks",
          "Follow-up reminders"
        ]
      },

      "clients": {
        "route": "/agent/clients"
      },

      "appointments": {
        "route": "/agent/appointments"
      },

      "calendar": {
        "route": "/agent/calendar"
      },

      "messages": {
        "route": "/agent/messages"
      },

      "commissions": {
        "route": "/agent/commissions"
      },

      "analytics": {
        "route": "/agent/analytics"
      },

      "tasks": {
        "route": "/agent/tasks"
      },

      "profile": {
        "route": "/agent/profile"
      }
    },

    "agency_dashboard": {
      "overview": "/agency/dashboard",
      "agents": "/agency/agents",
      "properties": "/agency/properties",
      "leads": "/agency/leads",
      "appointments": "/agency/appointments",
      "commissions": "/agency/commissions",
      "analytics": "/agency/analytics",
      "subscription": "/agency/subscription",
      "billing": "/agency/billing",
      "settings": "/agency/settings"
    },

    "developer_dashboard": {
      "overview": "/developer/dashboard",
      "projects": "/developer/projects",
      "buildings": "/developer/buildings",
      "units": "/developer/units",
      "inventory": "/developer/inventory",
      "payment_plans": "/developer/payment-plans",
      "leads": "/developer/leads",
      "sales": "/developer/sales",
      "analytics": "/developer/analytics",
      "documents": "/developer/documents"
    },

    "property_manager_dashboard": {
      "overview": "/manager/dashboard",
      "properties": "/manager/properties",
      "tenants": "/manager/tenants",
      "leases": "/manager/leases",
      "rent": "/manager/rent",
      "maintenance": "/manager/maintenance",
      "contractors": "/manager/contractors",
      "expenses": "/manager/expenses",
      "reports": "/manager/reports"
    },

    "admin_dashboard": {
      "overview": "/admin",
      "users": "/admin/users",
      "agents": "/admin/agents",
      "agencies": "/admin/agencies",
      "developers": "/admin/developers",
      "properties": "/admin/properties",
      "property_approvals": "/admin/properties/approvals",
      "media": "/admin/media",
      "reports": "/admin/reports",
      "appointments": "/admin/appointments",
      "messages": "/admin/messages",
      "payments": "/admin/payments",
      "subscriptions": "/admin/subscriptions",
      "coupons": "/admin/coupons",
      "commissions": "/admin/commissions",
      "reviews": "/admin/reviews",
      "support": "/admin/support",
      "cms": "/admin/cms",
      "locations": "/admin/locations",
      "amenities": "/admin/amenities",
      "property_types": "/admin/property-types",
      "notifications": "/admin/notifications",
      "analytics": "/admin/analytics",
      "audit_logs": "/admin/audit-logs",
      "security": "/admin/security",
      "settings": "/admin/settings"
    }
  },

  "property_module": {
    "property_types": [
      "Apartment",
      "Villa",
      "Townhouse",
      "Penthouse",
      "Duplex",
      "Studio",
      "Chalet",
      "Office",
      "Retail",
      "Warehouse",
      "Factory",
      "Land",
      "Farm",
      "Building",
      "Hotel",
      "Compound Unit",
      "Commercial Building"
    ],

    "listing_types": [
      "For Sale",
      "For Rent",
      "Daily Rental",
      "Commercial Sale",
      "Commercial Rent"
    ],

    "property_fields": {
      "identity": [
        "title",
        "slug",
        "reference_number",
        "property_type",
        "listing_type",
        "status"
      ],
      "pricing": [
        "price",
        "currency",
        "price_per_square_meter",
        "negotiable",
        "service_charge",
        "maintenance_fee"
      ],
      "details": [
        "bedrooms",
        "bathrooms",
        "living_rooms",
        "kitchen_count",
        "floor",
        "total_floors",
        "building_year",
        "area",
        "land_area",
        "built_up_area",
        "parking_spaces"
      ],
      "location": [
        "country",
        "state",
        "city",
        "district",
        "community",
        "street",
        "address",
        "latitude",
        "longitude",
        "postal_code"
      ],
      "features": [
        "furnished",
        "balcony",
        "garden",
        "pool",
        "gym",
        "security",
        "elevator",
        "parking",
        "central_ac",
        "sea_view",
        "city_view",
        "pets_allowed"
      ]
    },

    "statuses": [
      "draft",
      "pending_review",
      "approved",
      "published",
      "rejected",
      "archived",
      "sold",
      "rented",
      "expired",
      "suspended"
    ]
  },

  "advanced_search": {
    "filters": [
      "keyword",
      "location",
      "nearby_location",
      "property_type",
      "listing_type",
      "min_price",
      "max_price",
      "min_area",
      "max_area",
      "bedrooms",
      "bathrooms",
      "floor",
      "furnished",
      "amenities",
      "developer",
      "agency",
      "agent",
      "year_built",
      "parking",
      "verified_only",
      "new_only",
      "featured_only"
    ],
    "search_features": [
      "Saved searches",
      "Search alerts",
      "Email alerts",
      "Push notifications",
      "SMS alerts",
      "Geo-radius search",
      "Polygon search",
      "Map bounds search",
      "Fuzzy keyword search",
      "Autocomplete",
      "Recent searches",
      "Popular searches"
    ]
  },

  "media_system": {
    "description": "Centralized enterprise media management system",

    "supported_media": [
      "JPG",
      "JPEG",
      "PNG",
      "WEBP",
      "GIF",
      "MP4",
      "MOV",
      "PDF",
      "DOC",
      "DOCX"
    ],

    "property_media": [
      "Main photo",
      "Gallery photos",
      "Floor plans",
      "Site plans",
      "Brochures",
      "Documents",
      "Videos",
      "Virtual tour URL"
    ],

    "admin_features": [
      "Upload media",
      "Drag and drop",
      "Bulk upload",
      "Bulk delete",
      "Bulk replace",
      "Image crop",
      "Image resize",
      "Image compression",
      "Image orientation",
      "Watermark",
      "Thumbnail generation",
      "Alt text",
      "SEO filename",
      "Media tagging",
      "Media search",
      "Media folders",
      "Media usage tracking",
      "Duplicate detection",
      "Storage usage dashboard"
    ],

    "security": [
      "File type validation",
      "File size validation",
      "Malware scanning",
      "Private document URLs",
      "Signed URLs",
      "Permission checking"
    ],

    "image_processing": {
      "auto_optimize": true,
      "responsive_sizes": true,
      "lazy_loading": true,
      "webp_conversion": true,
      "thumbnail_generation": true
    }
  },

  "appointment_system": {
    "appointment_types": [
      "Property viewing",
      "Video tour",
      "Phone consultation",
      "Office meeting",
      "Developer showroom visit"
    ],

    "features": [
      "Agent availability",
      "Calendar",
      "Time slots",
      "Booking request",
      "Instant booking",
      "Agent approval",
      "Rescheduling",
      "Cancellation",
      "Reminder notifications",
      "Google Calendar integration",
      "Microsoft Calendar integration",
      "Video meeting integration"
    ],

    "statuses": [
      "requested",
      "confirmed",
      "completed",
      "cancelled",
      "rescheduled",
      "no_show"
    ]
  },

  "messaging_system": {
    "type": "Real-time",
    "features": [
      "One-to-one chat",
      "Group chat",
      "Property-linked conversation",
      "Agent-client messaging",
      "Buyer-agent messaging",
      "Typing indicator",
      "Read receipts",
      "Online status",
      "Message attachments",
      "Image attachments",
      "Document attachments",
      "Voice message optional",
      "Message search",
      "Block user",
      "Report user",
      "Chat notifications"
    ],
    "technology": [
      "WebSocket",
      "Redis",
      "Django Channels"
    ]
  },

  "notification_system": {
    "channels": [
      "In-app",
      "Email",
      "SMS",
      "Push"
    ],

    "events": [
      "New message",
      "New lead",
      "Appointment request",
      "Appointment confirmed",
      "Appointment reminder",
      "Property approved",
      "Property rejected",
      "Property sold",
      "Property rented",
      "Saved search match",
      "Price reduction",
      "New property",
      "Subscription renewal",
      "Payment successful",
      "Payment failed",
      "Mortgage update"
    ]
  },

  "lead_crm": {
    "features": [
      "Lead capture",
      "Lead source tracking",
      "Lead scoring",
      "Lead assignment",
      "Lead pipeline",
      "Lead status",
      "Contact history",
      "Call logs",
      "Email logs",
      "Tasks",
      "Follow-up reminders",
      "Notes",
      "Tags",
      "Duplicate detection",
      "Conversion tracking"
    ],

    "pipeline": [
      "New",
      "Contacted",
      "Qualified",
      "Viewing Scheduled",
      "Viewing Completed",
      "Negotiation",
      "Offer Submitted",
      "Won",
      "Lost"
    ]
  },

  "analytics": {
    "platform": [
      "Total users",
      "Active users",
      "New registrations",
      "Properties published",
      "Properties sold",
      "Properties rented",
      "Total revenue",
      "Subscription revenue",
      "Lead volume",
      "Conversion rate",
      "Appointment volume",
      "Top locations",
      "Top agents",
      "Top agencies",
      "Top developers",
      "Traffic sources"
    ],

    "property": [
      "Views",
      "Unique viewers",
      "Favorites",
      "Shares",
      "Inquiries",
      "Appointments",
      "View-to-lead rate",
      "Lead-to-appointment rate",
      "Days on market",
      "Price history",
      "Search impressions"
    ],

    "agent": [
      "Leads",
      "Response rate",
      "Response time",
      "Appointments",
      "Conversions",
      "Revenue",
      "Commission"
    ],

    "reports": [
      "Daily",
      "Weekly",
      "Monthly",
      "Quarterly",
      "Annual"
    ],

    "export": [
      "CSV",
      "Excel",
      "PDF"
    ]
  },

  "payment_system": {
    "features": [
      "Property listing packages",
      "Featured property payments",
      "Subscription plans",
      "Agent subscriptions",
      "Agency subscriptions",
      "Developer subscriptions",
      "Ad packages",
      "Promoted listings",
      "Invoices",
      "Refunds",
      "Payment history",
      "Receipts",
      "Payouts"
    ],

    "subscription_plans": [
      "Free",
      "Starter",
      "Professional",
      "Business",
      "Enterprise"
    ]
  },

  "monetization": {
    "revenue_streams": [
      "Property listing fees",
      "Featured listings",
      "Premium placement",
      "Agent subscriptions",
      "Agency subscriptions",
      "Developer subscriptions",
      "Advertising",
      "Banner advertising",
      "Lead generation fees",
      "Mortgage referral fees",
      "Transaction commissions"
    ]
  },

  "reviews": {
    "features": [
      "Agent reviews",
      "Agency reviews",
      "Property reviews",
      "Star rating",
      "Written review",
      "Moderation",
      "Report review",
      "Verified interaction badge"
    ]
  },

  "reporting_system": {
    "report_targets": [
      "Property",
      "User",
      "Agent",
      "Agency",
      "Message",
      "Review",
      "Payment",
      "Advertisement"
    ],

    "report_reasons": [
      "Fraud",
      "Fake property",
      "Incorrect information",
      "Duplicate listing",
      "Wrong price",
      "Copyright violation",
      "Offensive content",
      "Scam",
      "Impersonation",
      "Other"
    ],

    "workflow": [
      "Submitted",
      "Under review",
      "Investigating",
      "Resolved",
      "Rejected",
      "Escalated"
    ]
  },

  "admin_media_management": {
    "admin_can": [
      "Upload platform banners",
      "Upload homepage sliders",
      "Upload logos",
      "Upload agent photos",
      "Upload property photos",
      "Upload development images",
      "Upload blog images",
      "Upload advertisements",
      "Upload documents",
      "Manage image libraries",
      "Assign media to entities",
      "Replace images",
      "Delete images",
      "Restore deleted media",
      "View media ownership",
      "View media audit history"
    ]
  },

  "cms": {
    "editable_content": [
      "Homepage",
      "About page",
      "FAQ",
      "Terms",
      "Privacy",
      "Contact",
      "Blog",
      "Landing pages",
      "SEO pages",
      "Footer",
      "Navigation menus",
      "Hero banners",
      "Promotional banners"
    ]
  },

  "location_system": {
    "hierarchy": [
      "Country",
      "State/Province",
      "City",
      "District",
      "Community",
      "Street"
    ],

    "features": [
      "Location CRUD",
      "Map coordinates",
      "Geo boundaries",
      "Popular locations",
      "Location SEO pages",
      "Property count per location",
      "Average property price",
      "Market statistics"
    ]
  },

  "property_development_module": {
    "entities": [
      "Developer",
      "Development Project",
      "Building",
      "Floor",
      "Unit",
      "Unit Type",
      "Payment Plan",
      "Construction Milestone"
    ],

    "features": [
      "Master project page",
      "Unit inventory",
      "Available/sold/reserved units",
      "Unit filtering",
      "Floor plans",
      "Payment plans",
      "Installments",
      "Construction progress",
      "Project gallery",
      "Project brochure"
    ]
  },

  "rental_management": {
    "features": [
      "Tenant management",
      "Lease management",
      "Rent tracking",
      "Deposit tracking",
      "Late payment tracking",
      "Maintenance requests",
      "Expense management",
      "Contractor management",
      "Lease documents",
      "Rent reminders",
      "Tenant communication"
    ]
  },

  "maintenance_system": {
    "workflow": [
      "Requested",
      "Assigned",
      "In progress",
      "Waiting",
      "Completed",
      "Cancelled"
    ],

    "features": [
      "Maintenance ticket",
      "Priority",
      "Photos",
      "Documents",
      "Contractor assignment",
      "Cost",
      "Notes",
      "Status tracking"
    ]
  },

  "mortgage_module": {
    "features": [
      "Mortgage calculator",
      "Interest rate calculator",
      "Down payment calculator",
      "Monthly installment",
      "Loan duration",
      "Amortization schedule",
      "Mortgage provider comparison",
      "Mortgage lead submission",
      "Application tracking",
      "Document upload"
    ]
  },

  "advertising_module": {
    "ad_types": [
      "Homepage banner",
      "Search sponsored listing",
      "Property promoted listing",
      "Agent promotion",
      "Agency promotion",
      "Developer promotion",
      "Native advertisement"
    ],

    "features": [
      "Campaign creation",
      "Targeting",
      "Budget",
      "Start date",
      "End date",
      "Impressions",
      "Clicks",
      "CTR",
      "Conversions",
      "Billing"
    ]
  },

  "seo": {
    "features": [
      "Dynamic metadata",
      "Open Graph",
      "Twitter cards",
      "Canonical URLs",
      "XML sitemap",
      "Robots.txt",
      "Structured data",
      "Property schema",
      "Agent schema",
      "Agency schema",
      "Location landing pages",
      "Blog SEO",
      "Image alt text"
    ]
  },

  "security": {
    "requirements": [
      "RBAC",
      "Permission-based authorization",
      "JWT security",
      "CSRF protection",
      "CORS configuration",
      "Rate limiting",
      "Brute-force protection",
      "Input validation",
      "SQL injection prevention",
      "XSS protection",
      "Secure file upload",
      "Private documents",
      "Audit logs",
      "IP logging",
      "Session management",
      "2FA",
      "Admin security logs"
    ]
  },

  "database_models": {
    "authentication": [
      "User",
      "Role",
      "Permission",
      "UserRole",
      "UserSession",
      "LoginAttempt",
      "OTP",
      "TwoFactorAuth"
    ],

    "profiles": [
      "UserProfile",
      "AgentProfile",
      "Agency",
      "AgencyMember",
      "DeveloperProfile",
      "MortgageProvider"
    ],

    "properties": [
      "Property",
      "PropertyImage",
      "PropertyVideo",
      "PropertyDocument",
      "FloorPlan",
      "Amenity",
      "PropertyAmenity",
      "PropertyFeature",
      "PropertyPriceHistory",
      "PropertyStatusHistory"
    ],

    "locations": [
      "Country",
      "State",
      "City",
      "District",
      "Community",
      "Street"
    ],

    "crm": [
      "Lead",
      "LeadActivity",
      "LeadAssignment",
      "Client",
      "Task",
      "Note",
      "FollowUp"
    ],

    "communication": [
      "Conversation",
      "ConversationParticipant",
      "Message",
      "MessageAttachment",
      "Notification"
    ],

    "appointments": [
      "Appointment",
      "Availability",
      "TimeSlot"
    ],

    "transactions": [
      "Payment",
      "Invoice",
      "Refund",
      "Payout",
      "Commission"
    ],

    "subscriptions": [
      "Plan",
      "Subscription",
      "SubscriptionFeature",
      "Coupon"
    ],

    "content": [
      "Article",
      "Category",
      "Tag",
      "Page",
      "Banner",
      "FAQ"
    ],

    "moderation": [
      "Report",
      "ModerationAction",
      "Review"
    ],

    "media": [
      "MediaFile",
      "MediaFolder",
      "MediaTag"
    ],

    "audit": [
      "AuditLog"
    ]
  },

  "api_structure": {
    "versioning": "/api/v1",

    "authentication": [
      "POST /auth/register",
      "POST /auth/login",
      "POST /auth/logout",
      "POST /auth/refresh",
      "POST /auth/verify-email",
      "POST /auth/send-otp",
      "POST /auth/verify-otp",
      "POST /auth/forgot-password",
      "POST /auth/reset-password"
    ],

    "properties": [
      "GET /properties",
      "POST /properties",
      "GET /properties/{id}",
      "PATCH /properties/{id}",
      "DELETE /properties/{id}",
      "POST /properties/{id}/publish",
      "POST /properties/{id}/favorite",
      "POST /properties/{id}/report"
    ],

    "search": [
      "GET /search/properties",
      "GET /search/suggestions",
      "POST /search/saved",
      "GET /search/saved",
      "DELETE /search/saved/{id}"
    ],

    "appointments": [
      "GET /appointments",
      "POST /appointments",
      "PATCH /appointments/{id}",
      "DELETE /appointments/{id}"
    ],

    "messages": [
      "GET /conversations",
      "POST /conversations",
      "GET /conversations/{id}/messages",
      "POST /conversations/{id}/messages"
    ],

    "analytics": [
      "GET /analytics/platform",
      "GET /analytics/property/{id}",
      "GET /analytics/agent/{id}",
      "GET /analytics/agency/{id}"
    ]
  },

  "file_structure": {
    "root": [
      "frontend",
      "backend",
      "infrastructure",
      "docs",
      ".github",
      "docker-compose.yml",
      "README.md",
      ".env.example"
    ],

    "frontend": {
      "src": [
        "app",
        "assets",
        "components",
        "features",
        "hooks",
        "layouts",
        "pages",
        "routes",
        "services",
        "store",
        "types",
        "utils",
        "validators",
        "constants"
      ],
      "features": [
        "auth",
        "properties",
        "search",
        "map",
        "favorites",
        "appointments",
        "messaging",
        "agents",
        "agencies",
        "developers",
        "mortgage",
        "crm",
        "notifications",
        "analytics",
        "subscriptions",
        "payments",
        "admin",
        "cms"
      ]
    },

    "backend": {
      "apps": [
        "accounts",
        "properties",
        "locations",
        "search",
        "media",
        "agents",
        "agencies",
        "developers",
        "crm",
        "appointments",
        "messaging",
        "notifications",
        "mortgages",
        "payments",
        "subscriptions",
        "reviews",
        "reports",
        "analytics",
        "advertising",
        "cms",
        "support",
        "audit"
      ]
    }
  },

  "admin_workflows": {
    "property_approval": [
      "Agent creates listing",
      "Listing becomes pending",
      "Moderator reviews",
      "Validate required fields",
      "Validate images",
      "Validate documents",
      "Approve or reject",
      "Publish listing",
      "Notify agent"
    ],

    "fraud_review": [
      "User submits report",
      "System creates moderation case",
      "Moderator reviews",
      "Check account history",
      "Check listing history",
      "Check duplicate content",
      "Take action",
      "Notify affected user",
      "Log action"
    ]
  },

  "automation": {
    "scheduled_jobs": [
      "Expire old listings",
      "Send saved-search alerts",
      "Send appointment reminders",
      "Send payment reminders",
      "Calculate analytics",
      "Generate reports",
      "Clean expired sessions",
      "Resize uploaded images",
      "Index properties in search engine"
    ]
  },

  "smart_features": {
    "ai_ready": true,
    "features": [
      "AI property description generation",
      "AI listing quality score",
      "AI duplicate listing detection",
      "AI lead scoring",
      "AI property recommendations",
      "AI semantic search",
      "AI chatbot",
      "AI document classification",
      "AI image quality detection",
      "AI estimated price",
      "AI fraud risk scoring"
    ]
  },

  "property_recommendation_engine": {
    "inputs": [
      "Search history",
      "Saved properties",
      "Viewed properties",
      "Location preference",
      "Price preference",
      "Property type",
      "Bedrooms",
      "Amenities"
    ],

    "outputs": [
      "Recommended properties",
      "Similar properties",
      "Trending properties",
      "Recently viewed",
      "Price reduced properties",
      "New matching listings"
    ]
  },

  "future_features": {
    "phase_2": [
      "Virtual 3D tours",
      "AR property visualization",
      "AI valuation",
      "Mortgage marketplace",
      "Rental applications",
      "Digital contracts",
      "Electronic signatures",
      "Property transaction workflow"
    ],

    "phase_3": [
      "Mobile applications",
      "Native push notifications",
      "Advanced AI assistant",
      "Predictive market analytics",
      "Smart investment recommendations",
      "Property investment portfolio",
      "Fractional property investment integration"
    ]
  },

  "ui_ux": {
    "design": {
      "style": "Modern premium real-estate SaaS",
      "responsive": true,
      "accessibility": "WCAG-minded",
      "mobile_first": true
    },

    "requirements": [
      "Clean navigation",
      "Sticky search",
      "Professional property cards",
      "Large high-quality imagery",
      "Responsive map layouts",
      "Dashboard sidebars",
      "Data tables",
      "Charts",
      "Skeleton loaders",
      "Empty states",
      "Error states",
      "Confirmation dialogs",
      "Toast notifications",
      "Accessible forms",
      "Dark mode"
    ]
  },

  "permissions": {
    "principle": "Least privilege",
    "rules": [
      "Users can only access their own private data",
      "Agents can only modify assigned/owned listings",
      "Agency admins can only manage their agency",
      "Developers can only manage their projects",
      "Property managers can only manage assigned properties",
      "Moderators cannot change financial settings",
      "Finance admins cannot change platform security",
      "Super admin has full access"
    ]
  },

  "testing": {
    "frontend": [
      "Unit tests",
      "Component tests",
      "Integration tests",
      "E2E tests"
    ],
    "backend": [
      "Unit tests",
      "API tests",
      "Permission tests",
      "Authentication tests",
      "Database tests"
    ],
    "quality": [
      "Linting",
      "Formatting",
      "Type checking",
      "Security scanning",
      "Dependency scanning"
    ]
  },

  "deployment": {
    "environments": [
      "development",
      "staging",
      "production"
    ],

    "docker_services": [
      "frontend",
      "backend",
      "postgres",
      "redis",
      "celery_worker",
      "celery_beat",
      "nginx",
      "search_engine"
    ],

    "ci_cd": [
      "Install dependencies",
      "Run lint",
      "Run type checks",
      "Run tests",
      "Build frontend",
      "Build Docker images",
      "Security checks",
      "Deploy staging",
      "Deploy production"
    ]
  },

  "important_business_rules": [
    "A property cannot be published until required information is complete.",
    "Only authorized users can create or edit listings.",
    "Properties requiring moderation must be approved before publication.",
    "Users cannot book unavailable appointment slots.",
    "A user cannot review an agent unless eligibility criteria are satisfied.",
    "Payments must be verified using the payment provider webhook.",
    "Refunds must be logged.",
    "All sensitive admin actions must create audit logs.",
    "Private documents must never be publicly accessible.",
    "Deleted records that require legal/audit retention should use soft deletion.",
    "Every property must have a unique public slug and internal reference number.",
    "Search indexing must update after relevant property changes.",
    "Notifications must respect user preferences.",
    "All role permissions must be enforced server-side, not only in the frontend."
  ],

  "deliverables": {
    "must_include": [
      "Complete source code",
      "Frontend",
      "Backend",
      "Database models",
      "Database migrations",
      "REST API",
      "Authentication",
      "RBAC",
      "Admin dashboard",
      "Agent dashboard",
      "Buyer dashboard",
      "Agency dashboard",
      "Developer dashboard",
      "Property manager dashboard",
      "Media management",
      "Search system",
      "Map integration",
      "Messaging system",
      "Appointment system",
      "Payment system",
      "Subscription system",
      "Analytics",
      "Reports",
      "CMS",
      "SEO",
      "Notifications",
      "Audit logs",
      "Testing",
      "Docker",
      "CI/CD",
      "Environment configuration",
      "API documentation",
      "Seed data",
      "Production deployment documentation"
    ]
  },

  "ai_coding_agent_instructions": {
    "role": "Act as a senior software architect, senior React engineer, senior Django engineer, database architect, DevOps engineer, security engineer and UI/UX engineer.",
    "instructions": [
      "Do not build a fake prototype.",
      "Build real working CRUD operations.",
      "Use PostgreSQL properly.",
      "Use normalized relational database design.",
      "Use PostGIS for geographical queries.",
      "Use JWT authentication.",
      "Implement real role-based permissions.",
      "Never trust frontend permissions.",
      "Validate all API input.",
      "Use serializers and service layers where appropriate.",
      "Use reusable React components.",
      "Use TypeScript strictly.",
      "Avoid duplicated logic.",
      "Use reusable API clients.",
      "Use proper loading, error and empty states.",
      "Implement pagination for large datasets.",
      "Implement filtering and sorting server-side.",
      "Implement search indexing.",
      "Implement image optimization.",
      "Implement secure document storage.",
      "Implement audit logs for important actions.",
      "Write tests for business-critical functions.",
      "Do not hardcode secrets.",
      "Create .env.example.",
      "Provide Docker configuration.",
      "Provide database seed scripts.",
      "Provide API documentation.",
      "Handle production error logging.",
      "Optimize database queries.",
      "Use indexes on high-volume fields.",
      "Prevent N+1 query problems.",
      "Use background jobs for expensive operations.",
      "Use transactions for financial operations.",
      "Use idempotent payment webhooks.",
      "Make the architecture scalable.",
      "Use clean naming conventions.",
      "Write production-quality code.",
      "Do not omit pages listed in this specification.",
      "Do not replace working functionality with placeholders.",
      "When an external provider is unavailable, create a clean provider abstraction and mock implementation for development.",
      "Every dashboard must display real data from the database.",
      "Every form must have validation.",
      "Every destructive operation requires confirmation.",
      "Every upload must validate file type and size.",
      "Every admin page must enforce permissions.",
      "Every important workflow must create audit records."
    ]
  },

  "implementation_order": [
    "Project setup",
    "Database architecture",
    "Authentication",
    "RBAC",
    "User profiles",
    "Locations",
    "Property module",
    "Media module",
    "Search",
    "Maps",
    "Favorites",
    "Appointments",
    "Messaging",
    "CRM",
    "Agent dashboard",
    "Agency dashboard",
    "Developer dashboard",
    "Property management",
    "Mortgage",
    "Payments",
    "Subscriptions",
    "Notifications",
    "Reviews",
    "Reports",
    "Analytics",
    "Advertising",
    "CMS",
    "Admin dashboard",
    "SEO",
    "Testing",
    "Docker",
    "CI/CD",
    "Production hardening"
  ]
}
make full project in next and mysql port:3305 password:1234